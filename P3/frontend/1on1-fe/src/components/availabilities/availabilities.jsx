import React, {useEffect, useState} from "react";
import Header from "../header/Header";
import {DraggableSelector} from "react-draggable-selector";
import "../../styles/font.css"
import 'bootstrap/dist/css/bootstrap.min.css';


function Availabilities() {

    // enable working days
    const startDay = new Date('2024-01-01');
    const [dates, setDates] = useState(Array.from({length: 5}, (_, i) => {
        const date = new Date(startDay);
        date.setDate(startDay.getDate() + i);
        return date;
    }));

    const [times, setTimes] = useState([]);


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
                    timeSlots={times}        // required, required default: []
                    setTimeSlots={setTimes}  // required
                    maxWidth="100%"
                    maxHeight="100%"
                    slotWidth={120}
                    slotHeight={10}
                    timeUnit={15}
                />
            </div>
        </div>
    );
}

export default Availabilities;
