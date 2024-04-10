import React, {useEffect, useState} from 'react';
import { ButtonGroup, Modal, ModalHeader, ModalBody, ModalFooter, Button, InputGroup, InputGroupText, Input, Label, FormGroup, CustomInput }from 'reactstrap';
import axios from 'axios';
import {convertToAvailability, convertToTimeSlots, fetchUserId} from "../../utils/utils";
import Header from '../header/Header';

import Calendar from './calendar';


const Suggest = ({ isOpen, toggle }) => {
    const startDay = new Date('2024-01-01');
    const [dates, setDates] = useState(Array.from({length: 5}, (_, i) => {
        const date = new Date(startDay);
        date.setDate(startDay.getDate() + i);
        return date;
    }));
    const [timeSlots, setTimeSlots] = useState(
        []);

    const [startTime, setStartTime] = useState('10:05 AM');
    const [endTime, setEndTime] = useState('10:05 AM');
    const [showAs, setShowAs] = useState('busy');
    const [participant, setParticipant] = useState('');
    const [participants, setParticipants] = useState([]);
    
  
    const handleAddParticipant = () => {
      if (participant.trim() !== '') {
        setParticipants([...participants, participant]);
        setParticipant('');
      }
    };
  
    useEffect(() => {
      // Add Bootstrap styling to the body element
      document.body.classList.add("d-flex", "h-100", "text-center", "text-bg-dark");
      // Remove the added Bootstrap styling when the component unmounts
      return () => {
          document.body.classList.remove("d-flex", "h-100", "text-center", "text-bg-dark");
      };
  }, []);
    




  const handleRemoveParticipant = (index) => {//TODO: refactor event details modals to calendar
    const updatedParticipants = participants.filter((_, i) => i !== index);
    setParticipants(updatedParticipants);
  };
  const [selectedOption, setSelectedOption] = useState('busy'); // Assuming 'busy' is the default selected option

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

    useEffect(() => {
        const fetchSuggestedCalendar = async () => {
            const userId = localStorage.getItem("userId");
            if (userId) {
                try {
                    const response = await axios.get(`calendar/generate-suggested-calendar/<int:calendar_id>/`);
                    if (response.data) {
                        let resTimeSlots = convertToTimeSlots(response.data);
                        console.log(resTimeSlots);
                        setTimeSlots(resTimeSlots);
                    }}
                     catch (error) {
                        console.error("Error fetching suggested calendar:", error);
                    }
                }
            
        };
    } , []);


    
    return (
        
        <div className="container py-5">
        <Header />
        <div className="container py-5">
        <Calendar dates={dates} timeSlots={timeSlots} />
        </div>
        
        </div>
            );
};

export default Suggest;