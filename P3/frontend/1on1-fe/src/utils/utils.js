import axios from 'axios';
import {Navigate} from "react-router-dom";
import {useState, useEffect} from "react";

let isRefreshing = false;
let refreshSubscribers = [];

axios.interceptors.request.use(
  config => {
    // Exclude specific routes from automatic token addition
    const noAuthNeeded = ['/api/register/', '/api/token/'];
    if (!noAuthNeeded.some(url => config.url.includes(url))) {
      const token = localStorage.getItem('accessToken');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);


function subscribeToRefresh(cb) {
    refreshSubscribers.push(cb);
}

function onTokenRefreshed(accessToken) {
    refreshSubscribers.forEach(callback => callback(accessToken));
    refreshSubscribers = [];
}

axios.interceptors.response.use(async (response) => {
    return response;
}, async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
        if (!isRefreshing) {
            isRefreshing = true;
            originalRequest._retry = true;
            try {
                const data = await refreshToken();
                localStorage.setItem('accessToken', data.access);
                axios.defaults.headers.common['Authorization'] = `Bearer ${data.access}`;
                isRefreshing = false;
                onTokenRefreshed(data.access);
                return axios(originalRequest);
            } catch (refreshError) {
                isRefreshing = false;
                return Promise.reject(refreshError);
            }
        } else {
            return new Promise((resolve, reject) => {
                subscribeToRefresh((accessToken) => {
                    originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
                    resolve(axios(originalRequest));
                });
            });
        }
    }
    return Promise.reject(error);
});


async function refreshToken() {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
        console.error("Refresh token is missing or invalid.");
        return Promise.reject("No refresh token available");
    }
    const response = await axios.post('api/token/refresh/', { refresh: refreshToken });
    return response.data;
}


export const verifyToken = async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
        return false; // no token found
    }
    try {
        await axios.post('api/token/verify/', {
            token: token
        });
        return true; // valid token
    } catch (error) {
        console.error("Token verification failed:", error);
        return false; // invalid token
    }
};

export const ProtectedRoute =  ({ isAuthenticated, children }) => {
    const [authenticated, setAuthenticated] = useState(null);

    useEffect(() => {
        const checkAuthentication = async () => {
            const isAuthenticated = await verifyToken();
            setAuthenticated(isAuthenticated);
        };

        checkAuthentication();
    }, []);

    if (authenticated === null) {
        // If the authentication status is still being checked, you might want to render a loading indicator
        return <div>Loading...</div>;
    }

    if (!authenticated && window.location.pathname !== '/login') {
        // Redirect to the login page or landing page if not authenticated
        console.log('navigated back');
        return <Navigate to="/login" />;
    }

    return children;
};

export async function fetchUserId(username) {
    try {
        await console.log(verifyToken());
        const response = await axios.get(`accounts/api/user/${username}/`);
        if (response.data && response.data.id) {
            return response.data.id;
        }
        return null; // Return null if no ID found
    } catch (error) {
        console.error("Failed to fetch user ID:", error);
        return null; // Return null on error
    }
}

export function convertToTimeSlots(availabilities) {
    // 0 for Monday, 1 for Tuesday, ..., 6 for Sunday
    const weekdayToNumber = {
        "Monday": 0,
        "Tuesday": 1,
        "Wednesday": 2,
        "Thursday": 3,
        "Friday": 4,
        "Saturday": 5,
        "Sunday": 6,
    };
    const weekdayToDate = {
        "Monday": "20231231",
        "Tuesday": "20240101",
        "Wednesday": "20240102",
        "Thursday": "20240103",
        "Friday": "20240104",
    };

    return availabilities.map(availability => ({
        date: weekdayToDate[availability.day],
        day: weekdayToNumber[availability.day], // Use the adjusted weekday to number mapping
        minTime: availability.start_time.substring(0, 5),
        maxTime: availability.end_time.substring(0, 5),
    }));
}

export function convertToAvailability(timeSlot) {
    // 0 for Monday, 1 for Tuesday, ..., 6 for Sunday
    const numToWeekday = {
        0: "Monday",
        1: "Tuesday",
        2: "Wednesday",
        3: "Thursday",
        4: "Friday",
        5: "Saturday",
        6: "Sunday",
    };
    const day = numToWeekday[timeSlot.day]
    return {day: day, start: timeSlot.minTime, end: timeSlot.maxTime, rank: 1};
}


// Create an axios instance
const api = axios.create();

// Add a response interceptor
api.interceptors.response.use(
  response => {
    // If the request succeeds, we don't have to do anything and just return the response
    return response;
  },
  error => {
    const originalRequest = error.config;

    // If the server responds with a 401 status (Unauthorized), try to refresh the token
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      return axios.post('/refresh', { refreshToken: localStorage.getItem('refreshToken') })
        .then(res => {
          if (res.status === 200) {
            // Put the new token into the localStorage
            localStorage.setItem('accessToken', res.data.accessToken);

            // Change the authorization header
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.accessToken;

            // And finally re-send the original request
            originalRequest.headers['Authorization'] = 'Bearer ' + res.data.accessToken;
            return api(originalRequest);
          }
        });
    }

    // If the request fails, we throw the error to the catch block
    return Promise.reject(error);
  }
);
