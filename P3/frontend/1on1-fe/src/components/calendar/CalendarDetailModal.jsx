import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import AddContactToCalendarModal from "./AddContactToCalendarModal";

function CalendarDetailModal({ show, onHide, calendar }) {
  const [showAddContactModal, setShowAddContactModal] = useState(false);

  return (
    <>
      <Modal show={show} onHide={onHide} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{calendar.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Owner: {calendar.owner}</h5>
          <h6>Participants:</h6>
          <ul>
            {calendar.participants.map((participant, index) => (
              <li key={index}>
                {participant.name}
                <Button variant="warning" size="sm"
                        onClick={() => alert(`Remind ${participant.name}`)}>Remind</Button>
              </li>
            ))}
          </ul>
          <h6>Meetings Count: {calendar.meetings.length}</h6>
          <Button variant="primary" onClick={() => setShowAddContactModal(true)}>
            Add Contact to Calendar
          </Button>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>Close</Button>
        </Modal.Footer>
      </Modal>

      {/* Add Contact to Calendar Modal */}
      <AddContactToCalendarModal
        show={showAddContactModal}
        onHide={() => setShowAddContactModal(false)}
        calendarId={calendar.id}
      />
    </>
  );
}

export default CalendarDetailModal;
