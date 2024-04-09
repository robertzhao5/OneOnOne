import React from 'react';
import CalendarList from "./CalendarList";
import Header from "../header/Header";

function Calendars() {
    return (
        <div className="container py-5">
            <Header/>
            <div className="d-flex flex-column align-items-center w-100 mt-5">
                <CalendarList/>
            </div>
        </div>
    )
}

export default Calendars;
