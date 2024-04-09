import React, {useEffect, useState} from "react";
import Header from "../header/Header";
import {DraggableSelector} from "react-draggable-selector";
import "../../styles/font.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import {convertToAvailability, convertToTimeSlots, fetchUserId} from "../../utils/utils";
import axios from "axios";
import {Button} from "reactstrap";


function Availabilities() {

    // enable working days
    const startDay = new Date('2024-01-01');
    const [dates, setDates] = useState(Array.from({length: 5}, (_, i) => {
        const date = new Date(startDay);
        date.setDate(startDay.getDate() + i);
        return date;
    }));

    const [timeSlots, setTimeSlots] = useState([]);


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
                />
                <Button onClick={handleSave} className="mt-3">Save Availabilities</Button>
            </div>
        </div>
    );
}

export default Availabilities;

