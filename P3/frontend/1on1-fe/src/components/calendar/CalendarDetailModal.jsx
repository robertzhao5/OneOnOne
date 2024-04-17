import React, { useEffect, useState } from 'react';
import { Modal, Button, ListGroup, Card } from 'react-bootstrap';
import AddContactToCalendarModal from "./AddContactToCalendarModal";
import { useNavigate } from 'react-router-dom';  // Import useNavigate

function CalendarDetailModal({ show, onHide, calendar }) {
  const [showAddContactModal, setShowAddContactModal] = useState(false);
  const navigate = useNavigate();  // Initialize useNavigate

  useEffect(() => {
    console.log(calendar);
  }, []);

  const handleGenerateSchedule = () => {
    navigate(`/suggest/${calendar.id}`);  // Navigate to the generate schedule component with the calendar ID
  };

  return (
    <>
      <Modal show={show} onHide={onHide} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Details for {calendar.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Owner: {calendar.owner}</Card.Title>
              <Card.Text>
                <strong>Meetings Count:</strong> {calendar.meetings.length}
              </Card.Text>
            </Card.Body>
          </Card>

          <h5>Participants:</h5>
          <ListGroup variant="flush">
            {calendar.participants.map((participant, index) => (
              <ListGroup.Item key={index}
                              className="d-flex justify-content-between align-items-center">
                <div>{participant.username}</div>
                <Button variant="warning" size="sm"
                        onClick={() => alert(`Remind ${participant.username}`)}>
                  Remind
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>

          <div className="mt-3 d-flex justify-content-between">
            <Button variant="primary" onClick={handleGenerateSchedule}>
              Generate Suggested Schedule
            </Button>
            <Button variant="primary" onClick={() => setShowAddContactModal(true)}>
              Add Contact to Calendar
            </Button>
          </div>
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
