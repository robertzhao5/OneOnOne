import React, {useEffect, useState} from "react";
import Header from "../header/Header";
import {DraggableSelector} from "react-draggable-selector";
import "../../styles/font.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import {convertToAvailability, convertToTimeSlots, fetchUserId} from "../../utils/utils";
import axios from "axios";
import {Button} from "reactstrap";
import AvailabilityList from "./AvailabilityList";
import "../../styles/availability.css"

const api = axios.create();

function Availabilities() {

    // enable working days
    const startDay = new Date('2024-01-01');
    const [dates, setDates] = useState(Array.from({length: 5}, (_, i) => {
        const date = new Date(startDay);
        date.setDate(startDay.getDate() + i);
        return date;
    }));
    const [timeSlots, setTimeSlots] = useState([]);
    const [savedSlots, setSavedSlots] = useState([]);


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
            setSavedSlots(timeSlots);
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
                        // console.log(resTimeSlots);
                        setTimeSlots([...resTimeSlots]);
                        setSavedSlots([...resTimeSlots]);
                        console.log("time slots", timeSlots);
                    }
                } catch (error) {
                    console.error("Error fetching availabilities:", error);
                }
            }
        };
        fetchAvailabilities().then(r => console.log(r));

    }, []);

    useEffect(() => {
        console.log("time slots updated", timeSlots);
    }, [timeSlots]); // This effect runs whenever `timeSlots` changes.


    return (
        <div className="container py-5">
            <Header/>
            <div className="d-flex flex-column align-items-center w-100 mt-5">
                <h1 className="main-head fw-bold fs-1 mb-3">Select Your Availabilities</h1>
                <div className="d-flex justify-content-around align-items-start w-100">
                    <div
                        className="d-flex flex-column justify-content-center align-items-center">
                        <DraggableSelector
                            minTime={8}              // required
                            maxTime={19}             // required
                            dates={dates}            // required, required default: []
                            timeSlots={timeSlots}    // required, required default: []
                            setTimeSlots={setTimeSlots} // required
                            maxWidth="100%"
                            maxHeight="100%"
                            slotWidth={80}
                            slotHeight={10}
                            timeUnit={15}
                            selectedSlotColor={"#90EE90"}
                        />
                        <Button onClick={handleSave} className="mt-3">Save
                            Availabilities</Button>
                    </div>
                    <div className="ms-1 w-100"> {/* Add a margin to the left for spacing */}
                        <AvailabilityList timeslots={savedSlots}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Availabilities;

