import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Button, ListGroup} from 'react-bootstrap';

function SentInvitations() {
  const [invitations, setInvitations] = useState([]);

  // Fetch invitations
  useEffect(() => {
    const fetchInvitations = async () => {
      try {
        const response = await axios.get('scheduling/list-sent-invitations/', {
          headers: {Authorization: `Bearer ${localStorage.getItem('accessToken')}`},
        });
        setInvitations(response.data);
      } catch (error) {
        console.error('Failed to fetch invitations:', error);
      }
    };
    fetchInvitations();
  }, []);


return (
    <div className="mt-3 pt-3">
        <h2 className="text-center fs-1 my-4">Sent Invitations</h2>
        {invitations.length > 0 ? (
            <div className="d-flex flex-wrap justify-content-center">
                {invitations.map(invite => (
                    <div key={invite.id} className="card m-2" style={{ width: '18rem' }}>
                        <div className="card-body">
                            <h5 className="card-title fw-bold">Calendar: {invite.calendar}</h5>
                            <h6 className="card-subtitle mb-2 text-muted">Invited: {invite.invitee}</h6>
                            <p className="card-text">
                                <small className="text-muted">
                                    Sent at: {new Date(invite.sent_at).toLocaleString()}
                                </small>
                            </p>
                            <p className="badge bg-primary">{invite.status}</p>
                        </div>
                    </div>
                ))}
            </div>
        ) : (
            <div className="alert alert-info" role="alert">
                No invitations have been sent yet.
            </div>
        )}
    </div>
);


}

export default SentInvitations;
