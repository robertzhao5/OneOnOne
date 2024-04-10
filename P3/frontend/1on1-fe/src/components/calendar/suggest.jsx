import React, {useEffect, useState} from 'react';
import { ButtonGroup, Modal, ModalHeader, ModalBody, ModalFooter, Button, InputGroup, InputGroupText, Input, Label, FormGroup, CustomInput }from 'reactstrap';
import axios from 'axios';
import {convertToAvailability, convertToTimeSlots, fetchUserId} from "../../utils/utils";
import Header from '../header/Header';
import {DraggableSelector} from "react-draggable-selector";
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
        <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Event detail</ModalHeader>
      <ModalBody>
        <h4>Meeting time</h4>
        <FormGroup>
          <Label>Starts:</Label>
          <Input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label>Ends:</Label>
          <Input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
        </FormGroup>
        <h4>Show As</h4>
        <ButtonGroup aria-label="Avail-non avail selector">
      <Button color="danger" onClick={() => handleOptionChange('busy')} active={selectedOption === 'busy'}>Busy</Button>
      <Button color="success" onClick={() => handleOptionChange('free')} active={selectedOption === 'free'}>Free</Button>
    </ButtonGroup>
        <h4>Participant</h4>
        <InputGroup>
          <InputGroupText>@</InputGroupText>
          <Input value={participant} onChange={(e) => setParticipant(e.target.value)} placeholder="Username" />
          <Button color="primary" onClick={handleAddParticipant}>Add</Button>
        </InputGroup>
        <ul className="list-group list-group-vertical">
          {participants.map((participant, index) => (
            <li key={index} className="list-group-item">
              {participant}
              <Button close onClick={() => handleRemoveParticipant(index)} />
            </li>
          ))}
        </ul>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>Close</Button>
        <Button color="primary" onClick={toggle}>Save</Button>
      </ModalFooter>
    </Modal>
        </div>
            );
};

export default Suggest;