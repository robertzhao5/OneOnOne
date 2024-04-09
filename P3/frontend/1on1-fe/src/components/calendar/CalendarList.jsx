import React, {useEffect, useState} from 'react';
import axios from 'axios';
import CalendarCard from './CalendarCard';

function CalendarList() {
    const [calendars, setCalendars] = useState([]);

    useEffect(() => {
        const fetchCalendars = async () => {
            try {
                const response = await axios.get('scheduling/list/', {
                    headers: {Authorization: `Bearer ${localStorage.getItem('accessToken')}`},
                });
                setCalendars(response.data);
            } catch (error) {
                console.error('Failed to fetch calendars:', error);
            }
        };

        fetchCalendars().then(r => console.log(r));
    }, []);

    return (
        <>
            <h2 className="text-center my-4 fs-1">Your
                Calendars</h2>
            <div
                className="row justify-content-center">
                {calendars.map((calendar) => (
                    <CalendarCard key={calendar.id} {...calendar} />
                ))}
                <CalendarCard id={1} name="Work Calendar" owner="Alice"
                              participants={['Bob', 'Charlie']} meetings={[{}, {}]}/>
                <CalendarCard id={2} name="Home Calendar" owner="Alice"
                              participants={['Dave']} meetings={[{}]}/>
            </div>
        </>

    )
}

export default CalendarList;
