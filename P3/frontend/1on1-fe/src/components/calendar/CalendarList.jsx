import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import CalendarCard from './CalendarCard';

function CalendarList({ onCalendarsFetched }) {
    const [calendars, setCalendars] = useState([]);

    const fetchCalendars = useCallback(async () => {
        try {
            const response = await axios.get('scheduling/list/', {
                headers: {Authorization: `Bearer ${localStorage.getItem('accessToken')}`},
            });
            setCalendars(response.data);
            if (onCalendarsFetched) {
                onCalendarsFetched(response.data);
            }
        } catch (error) {
            console.error('Failed to fetch calendars:', error);
        }
    }, [onCalendarsFetched]);

    useEffect(() => {
        fetchCalendars().then(r => console.log(r));
    }, [fetchCalendars]);

    return (
        <>
            <h2 className="text-center my-4 fs-1">Your Calendars</h2>
            <div className="row justify-content-center">
                {calendars.map(calendar => (
                    <CalendarCard key={calendar.id} {...calendar} />
                ))}
            </div>
        </>
    );
}

export default CalendarList;
