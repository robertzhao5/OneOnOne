import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GenerateSchedule = ({ calendarId }) => {
  const [suggestedSchedule, setSuggestedSchedule] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSuggestedSchedule = async () => {
      try {
        const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };
        const response = await axios.get(`/generate-suggested-schedules/${calendarId}/`, config);
        setSuggestedSchedule(response.data);
      } catch (err) {
        setError(err.response ? err.response.data : 'An error occurred');
      }
    };

    if (calendarId) {
      fetchSuggestedSchedule().then(r => console.log(r));
    }
  }, [calendarId]);

  return (
    <div>
      {error && <p>{error}</p>}
      {suggestedSchedule ? (
        <div>
          <p>Suggested Schedule Generated Successfully</p>
        </div>
      ) : (
        <p>Loading suggested schedule...</p>
      )}
    </div>
  );
};

export default GenerateSchedule;
