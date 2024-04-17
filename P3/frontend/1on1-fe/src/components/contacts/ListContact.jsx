import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import axios from 'axios';
import {
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import Header from '../header/Header';

function ListContacts() {
  const [contacts, setContacts] = useState([]);    // State to store contacts data
  // State for modal toggling
  const [addModalOpen, setAddModalOpen] = React.useState(false);

  const [selectedContact, setSelectedContact] = useState(null);
  const [editModalOpen, setEditModalOpen] = React.useState(false);
  // State for add contact form fields
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  // State for inviting contact
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [inviteEmailText, setInviteEmailText] = useState('');

  useEffect(() => {
    // Add Bootstrap styling to the body element
    document.body.classList.add("d-flex", "h-100", "text-center", "text-bg-dark");
    // Remove the added Bootstrap styling when the component unmounts
    return () => {
      document.body.classList.remove("d-flex", "h-100", "text-center", "text-bg-dark");
    };
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await axios.get('contacts/list-contacts/');
      setContacts(response.data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  useEffect(() => {
    // Fetch contacts data from backend API
    fetchContacts();
  }, []);

  const handleAddContact = async () => {
    try {
      // Make API call to add contact
      const response = await axios.post('contacts/add-contact/', {name, email});
      // Handle success or display message to user
      console.log('Contact added successfully:', response.data);
      // Reset form fields
      setContacts(prevContacts => [...prevContacts, response.data]);
      setName('');
      setEmail('');
      setAddModalOpen(false); // Close modal
    } catch (error) {
      console.error('Error adding contact:', error);
      // Handle error or display message to user
    }
  };

  // Function to handle deleting a contact
  const handleDeleteContact = async (contactId) => {
    try {
      await axios.delete(`/contacts/remove-contact/${contactId}`);
      fetchContacts();
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  const openEditModal = (contact) => {
    setSelectedContact(contact);
    setName(contact.name);
    setEmail(contact.email);
    setEditModalOpen(true);
  };

  // Function to handle editing a contact
  const handleEditContact = async () => {
    try {
      const response = await axios.put(`/contacts/update-contact/${selectedContact.id}`, {
        name,
        email
      });
      // Handle success or display message to user
      console.log('Contact edited successfully:', response.data);
      // Update the contacts list
      const updatedContacts = contacts.map(contact =>
        contact.id === selectedContact.id ? {...contact, name, email} : contact
      );
      setContacts(updatedContacts);
      setEditModalOpen(false); // Close modal
    } catch (error) {
      console.error('Error editing contact:', error);
      // Handle error or display message to user
    }
  };

  const handleInvite = () => {
    // Generate preformatted email text for inviting contacts
    // You can customize the email template as needed
    const emailText = `Hello [Invitee's Name],

        I would like to invite you to join our meeting, on [YYYY-DD-MM] at [00:00:00 AM/PM] - [00:00:00 AM/PM]. Please confirm your availability.

        Best regards,
        [Your Name]`;

    setInviteEmailText(emailText);
    setInviteModalOpen(true);
  };

  return (
    <div className="container py-5">
      <Header/>
      <div className="container py-5">
        <h2 className="mb-3 text-start">Contact List</h2>
        <Table hover>
          <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Invite to Meeting</th>
            <th>Manage</th>
          </tr>
          </thead>
          <tbody>
          {/* Map contacts data here */}
          {contacts.map(contact => (
            <tr key={contact.contact.id}>
              <td>{contact.contact.username}</td>
              <td>{contact.contact.email}</td>
              <td className="text-center">
                <div className="form-check d-flex justify-content-center">
                  <Input type="checkbox" className="form-check-input"
                         id={`${contact.email}Checkbox`}/>
                  <Label className="form-check-label"
                         for={`${contact.email}Checkbox`}></Label>
                </div>
              </td>
              <td>
                <Button color="secondary" size="sm"
                        onClick={() => openEditModal(contact)}>Edit</Button>{' '}
                <Button color="danger" size="sm"
                        onClick={() => handleDeleteContact(contact.id)}>Delete</Button>
              </td>
            </tr>
          ))}
          </tbody>
        </Table>

        {/* Add Contact Modal */}
        <Modal isOpen={addModalOpen} toggle={() => setAddModalOpen(!addModalOpen)}>
          <ModalHeader toggle={() => setAddModalOpen(!addModalOpen)}>Add
            Contact</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="name">Name:</Label>
                <Input type="text" id="name" value={name}
                       onChange={(e) => setName(e.target.value)} required/>
              </FormGroup>
              <FormGroup>
                <Label for="email">Email:</Label>
                <Input type="email" id="email" value={email}
                       onChange={(e) => setEmail(e.target.value)} required/>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary"
                    onClick={() => setAddModalOpen(!addModalOpen)}>Close</Button>
            <Button color="primary" onClick={handleAddContact}>Add Contact</Button>
          </ModalFooter>
        </Modal>

        {/* Edit Contact Modal */}
        <Modal isOpen={editModalOpen} toggle={() => setEditModalOpen(!editModalOpen)}>
          <ModalHeader toggle={() => setEditModalOpen(!editModalOpen)}>Edit
            Contact</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="editName">Name:</Label>
                <Input type="text" id="editName" value={name}
                       onChange={(e) => setName(e.target.value)} required/>
              </FormGroup>
              <FormGroup>
                <Label for="editEmail">Email:</Label>
                <Input type="email" id="editEmail" value={email}
                       onChange={(e) => setEmail(e.target.value)} required/>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary"
                    onClick={() => setEditModalOpen(!editModalOpen)}>Close</Button>
            <Button color="primary" onClick={handleEditContact}>Save Changes</Button>
          </ModalFooter>
        </Modal>

        {/* Invite Contact Modal */}
        <Modal isOpen={inviteModalOpen}
               toggle={() => setInviteModalOpen(!inviteModalOpen)}>
          <ModalHeader toggle={() => setInviteModalOpen(!inviteModalOpen)}>Invite
            Contacts</ModalHeader>
          <ModalBody>
            <textarea className="form-control" value={inviteEmailText} readOnly
                      rows="8"></textarea>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary"
                    onClick={() => setInviteModalOpen(!inviteModalOpen)}>Close</Button>
          </ModalFooter>
        </Modal>

        {/* Add, Invite, Contact Buttons */}
        <div className="mt-3 d-flex">
          <Button color="primary" className="float-right me-2"
                  onClick={() => setAddModalOpen(!addModalOpen)}>Add Contact</Button>
          <Button color="primary" className="float-right" onClick={handleInvite}>Invite
            Contacts</Button>
        </div>
      </div>
    </div>
  );
}

export default ListContacts;
