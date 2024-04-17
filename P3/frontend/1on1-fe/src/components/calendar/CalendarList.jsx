import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import CalendarCard from './CalendarCard';
import CalendarDetailModal from './CalendarDetailModal';

function CalendarList() {
    const [calendars, setCalendars] = useState([]);
    const [selectedCalendar, setSelectedCalendar] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const fetchCalendars = useCallback(async () => {
        try {
            const response = await axios.get('scheduling/list/', {
                headers: {Authorization: `Bearer ${localStorage.getItem('accessToken')}`},
            });
            setCalendars(response.data);
        } catch (error) {
            console.error('Failed to fetch calendars:', error);
        }
    }, []);

    useEffect(() => {
        fetchCalendars();
    }, [fetchCalendars]);

    const handleCardClick = calendar => {
        setSelectedCalendar(calendar);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <>
            <h2 className="text-center my-4 fs-1">Your Calendars</h2>
            <div className="row justify-content-center">
                {calendars.map(calendar => (
                    <CalendarCard key={calendar.id} {...calendar} onClick={handleCardClick} />
                ))}
            </div>
            {selectedCalendar && (
                <CalendarDetailModal
                    show={showModal}
                    onHide={handleCloseModal}
                    calendar={selectedCalendar}
                />
            )}
        </>
    );
}

export default CalendarList;
