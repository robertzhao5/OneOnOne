import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Table, Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import Header from '../header/Header';

function ListContacts() {
    const [contacts, setContacts] = useState([]);    // State to store contacts data
    // State for modal toggling
    const [addModalOpen, setAddModalOpen] = React.useState(false);
    const [editModalOpen, setEditModalOpen] = React.useState(false);
    // State for form fields
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');

    useEffect(() => {
        // Add Bootstrap styling to the body element
        document.body.classList.add("d-flex", "h-100", "text-center", "text-bg-dark");
        // Remove the added Bootstrap styling when the component unmounts
        return () => {
            document.body.classList.remove("d-flex", "h-100", "text-center", "text-bg-dark");
        };
    }, []);

    useEffect(() => {
        // Fetch contacts data from backend API
        fetchContacts();
      }, []);
    
    const fetchContacts = async () => {
        try {
          const response = await axios.get('contacts/list-contacts');
          setContacts(response.data);
        } catch (error) {
          console.error('Error fetching contacts:', error);
        }
    };

    // Function to handle adding a contact
    const handleAddContact = () => {
        // Implement logic to add contact
        // Reset form fields
        setName('');
        setEmail('');
        // Close modal
        setAddModalOpen(false);
    };

    // Function to handle deleting a contact
    const handleDeleteContact = async (email) => {
        try {
            await axios.delete(`/contacts/${email}`);
            fetchContacts();
        } catch (error) {
            console.error('Error deleting contact:', error);
        }
    };

    // Function to handle editing a contact
    const handleEditContact = () => {
        // Implement logic to edit contact
        // Close modal
        setEditModalOpen(false);
    };

    return (
        <div className="container py-5">
        <Header />
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
                <tr key={contact.email}>
                <td>{contact.name}</td>
                <td>{contact.email}</td>
                <td>
                    <div className="form-check">
                    <Input type="checkbox" className="form-check-input" id={`${contact.email.replace('@', '').replace('.', '')}Checkbox`} />
                    <Label className="form-check-label" for={`${contact.email.replace('@', '').replace('.', '')}Checkbox`}></Label>
                    </div>
                </td>
                <td>
                    <Button color="secondary" size="sm">Edit</Button>{' '}
                    <Button color="danger" size="sm" onClick={() => handleDeleteContact(contact.email)}>Delete</Button>
                </td>
                </tr>
            ))}
            </tbody>
            </Table>
    
            {/* Add Contact Modal */}
            <Modal isOpen={addModalOpen} toggle={() => setAddModalOpen(!addModalOpen)}>
            <ModalHeader toggle={() => setAddModalOpen(!addModalOpen)}>Add Contact</ModalHeader>
            <ModalBody>
                <Form>
                <FormGroup>
                    <Label for="name">Name:</Label>
                    <Input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                </FormGroup>
                <FormGroup>
                    <Label for="email">Email:</Label>
                    <Input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={() => setAddModalOpen(!addModalOpen)}>Close</Button>
                <Button color="primary" onClick={handleAddContact}>Add Contact</Button>
            </ModalFooter>
            </Modal>
    
            {/* Edit Contact Modal */}
            <Modal isOpen={editModalOpen} toggle={() => setEditModalOpen(!editModalOpen)}>
            <ModalHeader toggle={() => setEditModalOpen(!editModalOpen)}>Edit Contact</ModalHeader>
            <ModalBody>
                <Form>
                <FormGroup>
                    <Label for="editName">Name:</Label>
                    <Input type="text" id="editName" value={name} onChange={(e) => setName(e.target.value)} required />
                </FormGroup>
                <FormGroup>
                    <Label for="editEmail">Email:</Label>
                    <Input type="email" id="editEmail" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={() => setEditModalOpen(!editModalOpen)}>Close</Button>
                <Button color="primary" onClick={handleEditContact}>Save Changes</Button>
            </ModalFooter>
            </Modal>
    
            {/* Add, Delete Contact Buttons */}
            <div className="mt-3">
            <Button color="primary" className="float-right" onClick={() => setAddModalOpen(!addModalOpen)}>Add Contact</Button>
            <Button color="primary" className="float-right" onClick={() => console.log('Send invitations')}>Invite Contacts</Button>
            <Button color="primary" className="float-right">Contact Scheduling</Button>
            </div>
        </div>
      </div>
    );
}

export default ListContacts;