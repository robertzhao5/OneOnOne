import React, {useEffect, useState} from "react";
import Header from "../header/Header";
import {DraggableSelector} from "react-draggable-selector";
import "../../styles/font.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import {convertToAvailability, convertToTimeSlots, fetchUserId} from "../../utils/utils";
import axios from "axios";
import {Button} from "reactstrap";

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

      return axios.post('/api/refresh', { refreshToken: localStorage.getItem('refreshToken') })
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

function Availabilities() {

    // enable working days
    const startDay = new Date('2024-01-01');
    const [dates, setDates] = useState(Array.from({length: 5}, (_, i) => {
        const date = new Date(startDay);
        date.setDate(startDay.getDate() + i);
        return date;
    }));

    const [timeSlots, setTimeSlots] = useState(
[]);


    const handleSave = async () => {
        console.log("Saving time slots:", timeSlots);
        // convert to expected format
        const availabilityData = timeSlots.map(slot => convertToAvailability(slot));

        const payload = {
            availability: availabilityData
        };
        console.log(availabilityData);

        try {
            const response = await axios.post('contacts/update-availability/', payload, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                    'Content-Type': 'application/json'
                }
            });
            console.log("Availability updated successfully:", response.data);
        } catch (error) {
            console.error("Error saving availabilities:", error.response ? error.response.data : error);
        }
    };


    useEffect(() => {
        const fetchAvailabilities = async () => {
            const userId = localStorage.getItem("userId");
            if (userId) {
                try {
                    const response = await axios.get(`contacts/api/availabilities/${userId}/`);
                    if (response.data) {
                        let resTimeSlots = convertToTimeSlots(response.data);
                        console.log(resTimeSlots);
                        setTimeSlots(resTimeSlots);
                    }
                } catch (error) {
                    console.error("Error fetching availabilities:", error);
                }
            }
        };
        fetchAvailabilities().then(r => console.log(r));

    }, []);


    return (
        <div className="container py-5">
            <Header/>
            <div
                className="d-flex flex-column justify-content-center align-items-center  w-100 h-100 mt-5">
                <h1 className="fw-bold fs-1 mb-3">Select Your Availabilities below</h1>
                <DraggableSelector
                    minTime={8}              // required
                    maxTime={21}             // required
                    dates={dates}            // required, required default: []
                    timeSlots={timeSlots}        // required, required default: []
                    setTimeSlots={setTimeSlots}  // required
                    maxWidth="100%"
                    maxHeight="100%"
                    slotWidth={120}
                    slotHeight={10}
                    timeUnit={15}
                    selectedSlotColor={"#90EE90"}
                />
                <Button onClick={handleSave} className="mt-3">Save Availabilities</Button>
            </div>
        </div>
    );
}

export default Availabilities;

