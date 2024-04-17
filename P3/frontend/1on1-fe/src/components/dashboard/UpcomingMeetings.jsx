import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, ListGroup } from 'react-bootstrap';

function UpcomingMeetings() {
  const [meetings, setMeetings] = useState([]);

  // Fetch user meetings
  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const response = await axios.get('scheduling/user-meetings/', {
          headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
        });
        setMeetings(response.data);
      } catch (error) {
        console.error('Failed to fetch meetings:', error);
      }
    };
    fetchMeetings();
  }, []);

  return (
    <div className="mt-3 pt-3">
      <h2 className="text-center fs-1 my-4">Your Upcoming Meetings</h2>
      {meetings.length > 0 ? (
        <ListGroup>
          {meetings.map((meeting) => (
            <ListGroup.Item key={meeting.id} className="d-flex justify-content-between align-items-center">
              <div>
                <strong>Meeting:</strong> {meeting.name} -
                <em> Scheduled from {meeting.start} to {meeting.end}</em>
              </div>
              <Button
                variant="info"
                size="sm"
                onClick={() => alert('Details about meeting.')}
              >
                View Details
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      ) : (
        <div className="alert alert-info text-center" role="alert">
          You have no upcoming meetings.
        </div>
      )}
    </div>
  );
}

export default UpcomingMeetings;
