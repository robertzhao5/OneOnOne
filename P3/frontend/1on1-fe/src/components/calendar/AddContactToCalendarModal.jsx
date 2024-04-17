import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Modal, Button, ListGroup } from 'react-bootstrap';

function AddContactToCalendarModal({ show, onHide, calendarId }) {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      if (show) {
        try {
          const response = await axios.get('contacts/list-contacts/', {
            headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
          });
          setContacts(response.data);
        } catch (error) {
          console.error('Failed to fetch contacts:', error);
        }
      }
    };
    fetchContacts();
  }, [show]);

  const handleInvite = async (contactId) => {
    try {
      console.log(contactId);
      console.log(calendarId);
      const response = await axios.post('scheduling/invite/', {
        calendar_id: calendarId,
        invitee_id: contactId,
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
      });
      console.log('Invitation sent successfully:', response.data);
    } catch (error) {
      console.error('Error sending invitation:', error);
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Select Contacts to Add</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ListGroup>
          {contacts.map(contact => (
            <ListGroup.Item key={contact.id}>
              {contact.contact.username}
              <Button
                variant="primary"
                size="sm"
                className="float-right"
                onClick={() => handleInvite(contact.contact.id)}>Add</Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddContactToCalendarModal;
