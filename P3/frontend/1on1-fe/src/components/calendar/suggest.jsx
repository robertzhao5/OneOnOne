import React, {useEffect, useState} from 'react';
import {
  ButtonGroup,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Toast,
  ToastBody,
  ToastHeader,
  Button,
  InputGroup,
  InputGroupText,
  Input,
  Label,
  FormGroup,
  CustomInput
} from 'reactstrap';
import axios from 'axios';
import {convertToAvailability, convertToTimeSlots, fetchUserId} from "../../utils/utils";
import Header from '../header/Header';
import {BsArrowRight, BsCalendar2CheckFill, BsCalendar2XFill} from 'react-icons/bs';
import Calendar from './calendar';
import {useParams} from "react-router-dom";


const Suggest = ({isOpen, toggle}) => {
  const startDay = new Date('2024-01-01');
  const [dates, setDates] = useState(Array.from({length: 5}, (_, i) => {
    const date = new Date(startDay);
    date.setDate(startDay.getDate() + i);
    return date;
  }));
  const [timeSlots, setTimeSlots] = useState(
    []);
  const {calendarId} = useParams();


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
    const fetchSuggestedCalendar = async () => {
      try {
        const response = await axios.get(`/scheduling/generate-suggested-schedules/${calendarId}/`);
        let slots = [];
        response.data.proposed_meetings.forEach((meeting) => {
          slots.push({
            start: meeting.start,
            end: meeting.end,
            day: meeting.day,
            participant: meeting.participant,
          });
        });
        console.log(slots)
        setTimeSlots(slots);
      } catch (error) {
        console.error("Error fetching suggested calendar:", error);
      }
    };

    fetchSuggestedCalendar();
    return () => {
      document.body.classList.remove("d-flex", "h-100", "text-center", "text-bg-dark");
    };
  }, [calendarId]);


  const handleRemoveParticipant = (index) => {
    const updatedParticipants = participants.filter((_, i) => i !== index);
    setParticipants(updatedParticipants);
  };
  const [selectedOption, setSelectedOption] = useState('busy'); // Assuming 'busy' is the default selected option

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const [showToast, setShowToast] = useState(false);

  const toggleToast = () => {
    setShowToast(!showToast);
  };


  return (

    <div className="container py-5">
      <Header/>
      <div className="container py-5">
        <Calendar dates={dates} Timeslot={timeSlots}/>
      </div>
      <Button color="primary" className="d-inline-flex align-items-center" type="button"
              id="liveAlertBtn"
              data-bs-target="#calendarCarousel" onClick={toggleToast}>
        Pick this one&nbsp;
        <BsArrowRight/>
      </Button>
      <div className="toast-container position-fixed bottom-0 end-0 p-3">
        <Toast isOpen={showToast} role="alert" aria-live="assertive" aria-atomic="true">
          <ToastHeader>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                 fill="currentColor"
                 className="bi bi-calendar2-check-fill" viewBox="0 0 16 16">
              <path
                d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5m9.954 3H2.545c-.3 0-.545.224-.545.5v1c0 .276.244.5.545.5h10.91c.3 0 .545-.224.545-.5v-1c0-.276-.244-.5-.546-.5m-2.6 5.854a.5.5 0 0 0-.708-.708L7.5 10.793 6.354 9.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0z"/>
            </svg>
            <strong className="me-auto">Calendar</strong>
          </ToastHeader>
          <ToastBody>
            Works for everyone! Meeting time Changed!
          </ToastBody>
        </Toast>
      </div>
    </div>
  );
};

export default Suggest;
