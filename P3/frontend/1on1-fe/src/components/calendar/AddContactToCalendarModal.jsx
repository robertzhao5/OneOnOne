import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Modal, Button, ListGroup } from 'react-bootstrap';

// Component to add contacts to calendar
function AddContactToCalendarModal({ show, onHide }) {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get('/api/list-contacts/', {
          headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
        });
        setContacts(response.data);
      } catch (error) {
        console.error('Failed to fetch contacts:', error);
      }
    };

    if (show) {
      fetchContacts().then(r => console.log(r));
    }
  }, [show]);

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
                onClick={() => console.log('Add', contact.contact.username)}>Add</Button>
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
