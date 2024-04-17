import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function CalendarDetailModal({ show, onHide, calendar }) {
  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{calendar.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>Owner: {calendar.owner}</h5>
        <h6>Participants:</h6>
        <ul>
          {calendar.participants.map((participant, index) => (
            <li key={index}>{participant} <Button variant="warning" size="sm" onClick={() => alert(`Remind ${participant}`)}>Remind</Button></li>
          ))}
        </ul>
        <h6>Meetings Count: {calendar.meetings.length}</h6>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CalendarDetailModal;
