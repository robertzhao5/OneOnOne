import axios from 'axios';
import {Navigate} from "react-router-dom";


axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);


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

export const ProtectedRoute = ({ isAuthenticated, children }) => {
    if (!isAuthenticated && window.location.pathname !== '/login') {
        // Redirect to the login page or landing page if not authenticated
        console.log('navigated back');
        // return <Navigate to="/login" />;
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
        minTime: availability.start_time,
        maxTime: availability.end_time,
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


