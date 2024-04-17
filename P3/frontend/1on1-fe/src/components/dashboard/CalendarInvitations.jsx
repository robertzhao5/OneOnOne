import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Button, ListGroup} from 'react-bootstrap';

function CalendarInvitations() {
  const [invitations, setInvitations] = useState([]);

  // Fetch invitations
  useEffect(() => {
    const fetchInvitations = async () => {
      try {
        const response = await axios.get('scheduling/list-invitations/', {
          headers: {Authorization: `Bearer ${localStorage.getItem('accessToken')}`},
        });
        setInvitations(response.data);
      } catch (error) {
        console.error('Failed to fetch invitations:', error);
      }
    };
    fetchInvitations();
  }, []);

  // Function to handle invitation acceptance
  const handleAccept = async (invitationId) => {
    try {
      const response = await axios.post(`scheduling/accept-invite/${invitationId}/`, {}, {
        headers: {Authorization: `Bearer ${localStorage.getItem('accessToken')}`},
      });
      // Optionally refresh the list or modify the state to reflect the change
      setInvitations(prev => prev.filter(inv => inv.id !== invitationId));
      console.log('Invitation accepted:', response.data);
    } catch (error) {
      console.error('Failed to accept invitation:', error);
    }
  };

  const pendingInvitations = invitations.filter(invite => invite.status !== 'accepted');

  return (
    <div className="mt-3 pt-3">
      <h2 className="text-center fs-1 my-4">Your Invitations</h2>
      {pendingInvitations.length > 0 ? (
        <ListGroup>
          {pendingInvitations.map(invite => (
            <ListGroup.Item key={invite.id} className="d-flex justify-content-between align-items-center">
              <div>
                <strong>Calendar:</strong> {invite.calendar} -
                <em> Invited by {invite.inviter}</em>
              </div>
              <Button
                variant="success"
                size="sm"
                onClick={() => handleAccept(invite.id)}
              >
                Accept
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      ) : (
        <div className="alert alert-info text-center" role="alert">
          You have no pending invitations.
        </div>
      )}
    </div>
  );

}

export default CalendarInvitations;
