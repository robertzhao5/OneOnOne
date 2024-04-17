import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from "axios";

function CalendarCreateModal({ show, handleClose }) {
    const [calendarName, setCalendarName] = useState('');

    const handleCreateCalendar = async () => {
        console.log("Creating calendar:", calendarName);
        try {
            const response = await axios.post('scheduling/create/', {
                name: calendarName,
            }, { headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` } }
            );
            console.log('Calendar created successfully', response.data);
            handleClose();
        } catch (error) {
            console.error('Failed to create calendar:', error.response ? error.response.data.message : error);
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Create New Calendar</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Calendar Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter calendar name"
                            value={calendarName}
                            onChange={(e) => setCalendarName(e.target.value)}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleCreateCalendar}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default CalendarCreateModal;
