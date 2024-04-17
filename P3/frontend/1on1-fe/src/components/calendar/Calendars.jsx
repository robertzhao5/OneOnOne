import React, {useState} from 'react';
import CalendarList from "./CalendarList";
import Header from "../header/Header";
import CreateCalendarButton from "./CreateCalendarButton";

function Calendars() {
    const [listKey, setListKey] = useState(0);
    const refreshCalendars = () => {
        setListKey(prevKey => prevKey + 1); // increment the key to force re-render
    };

    return (
        <div className="container py-5">
            <Header/>
            <div className="d-flex flex-column align-items-center w-100 mt-5">
                <CreateCalendarButton refreshCalendars={refreshCalendars} />
                <CalendarList key={listKey}/>
            </div>
        </div>
    )
}

export default Calendars;
