import React, { useState, useRef, useEffect } from 'react';
import { DayPilot, DayPilotCalendar, DayPilotNavigator } from "@daypilot/daypilot-lite-react";
import { ButtonGroup, Modal, ModalHeader, ModalBody, ModalFooter, Button, InputGroup, InputGroupText, Input, Label, FormGroup, CustomInput }from 'reactstrap';
import axios from 'axios';
import { BsArrowRight,BsCalendar2CheckFill, BsCalendar2XFill } from 'react-icons/bs';

// import "./CalendarStyles.css";

const styles = {
  wrap: {
    display: "flex"
  },
  left: {
    marginRight: "10px"
  },
  main: {
    flexGrow: "1"
  }
};

const Calendar = (calendar_id) => {
  const [modalOpen, setModalOpen] = useState(false);
  const startDay = new Date('2024-01-01');
    const [dates, setDates] = useState(Array.from({length: 5}, (_, i) => {
        const date = new Date(startDay);
        date.setDate(startDay.getDate() + i);
        return date;
    }));
    const [timeSlots, setTimeSlots] = useState(
        []);
    const [meeting, setMeeting] = useState(null);
    
    const [startTime, setStartTime] = useState('10:05 AM');
    const [endTime, setEndTime] = useState('10:05 AM');
    const [showAs, setShowAs] = useState('busy');
    const [participant, setParticipant] = useState('');
    const [participants, setParticipants] = useState([]);
    const handleRemoveParticipant = (index) => {//TODO: refactor event details modals to calendar
      const updatedParticipants = participants.filter((_, i) => i !== index);
      setParticipants(updatedParticipants);
    };
    const [selectedOption, setSelectedOption] = useState('busy'); // Assuming 'busy' is the default selected option
  
  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };
  const handleAddParticipant = () => {
    if (participant.trim() !== '') {
      setParticipants([...participants, participant]);
      setParticipant('');
    }
  };

  const calendarRef = useRef()
  const handleCloseModal = (e) => {
    setModalOpen(false);
  };
  const handleSaveModal = () => {
    // Handle saving event
    console.log('Saving event:',startTime, endTime);
    
    handleCloseModal();
  };

  const handleEventClick = (args) => {
  const { start, end} = args.e.data;
  
  const startTime = start.toString("HH:mm");
  const endTime = end.toString("HH:mm");

  setStartTime(startTime);
  setEndTime(endTime);
  // setParticipants(args.e.data.participants);
    setModalOpen(true);
  };

  useEffect(() => {
    const fetchMeeting = async () => {
      const meetingID = 1; //TODO change to actual meeting id
      try {
        const response = await axios.get(`scheduling/meeting-details/${meetingID}/`);
        //check if response is valid
        if (response.data) {
          setMeeting(response.data);
          console.log(response.data);
        }
      } catch (error) {
        console.error("meeting not found:", error);
      }
    };
    fetchMeeting();
  }, []);

const handleSave = async () => {
    try {
      const meetingID = 1; //TODO change to actual meeting id
      // Assuming you have updated all necessary states (startTime, endTime, etc.)
      const updatedMeeting = {
        ...meeting,
        start: startTime,
        end: endTime,
        // Add other properties as needed
      };
      await axios.put(`meeting-details/${meetingID}/edit`, updatedMeeting);
      handleSaveModal(); // Close modal or do any other action upon successful save
    } catch (error) {
      console.error("Error updating meeting:", error);
    }
  };
  
  const [calendarConfig, setCalendarConfig] = useState({
    viewType: "Week",
    durationBarVisible: false,
    timeRangeSelectedHandling: "Enabled",
        
    contextMenu: new DayPilot.Menu({
      items: [
        {
          text: "Delete",
          onClick: async args => {
            const dp = calendarRef.current.control;
            dp.events.remove(args.source);
          },
        },
        {
          text: "-"
        },
        
      ]
    }),
    onBeforeEventRender: args => {
      args.data.areas = [
        {
          top: 3,
          right: 3,
          width: 20,
          height: 20,
          symbol: "icons/daypilot.svg#minichevron-down-2",
          fontColor: "#fff",
          toolTip: "Show context menu",
          action: "ContextMenu",
        },
        {
          top: 3,
          right: 25,
          width: 20,
          height: 20,
          symbol: "icons/daypilot.svg#x-circle",
          fontColor: "#fff",
          action: "None",
          toolTip: "Delete event",
          onClick: async args => {
            const dp = calendarRef.current.control;
            dp.events.remove(args.source);
          }
        }
      ];


      const participants = args.data.participants;
      
    }
  });

  useEffect(() => {
    const events = [ //TODO: use backend data to populate events
      {
        id: 1,
        text: "Event 1",
        start: "2023-10-02T10:30:00",
        end: "2023-10-02T13:00:00",
        participants: 2,
      },
      {
        id: 2,
        text: "Event 2",
        start: "2023-10-03T09:30:00",
        end: "2023-10-03T11:30:00",
        backColor: "#6aa84f",
        participants: 1,
      },
      {
        id: 3,
        text: "Event 3",
        start: "2023-10-03T12:00:00",
        end: "2023-10-03T15:00:00",
        backColor: "#f1c232",
        participants: 3,
      },
      {
        id: 4,
        text: "Event 4",
        start: "2023-10-01T11:30:00",
        end: "2023-10-01T14:30:00",
        backColor: "#cc4125",
        participants: 4,
      },
    ];
    
    const startDate = "2023-10-02";

    calendarRef.current.control.update({startDate, events});
  }, []);

  return (
    <div style={styles.wrap}>
      <div style={styles.left}>
        <DayPilotNavigator
          selectMode={"Week"}
          showMonths={3}
          skipMonths={3}
          startDate={"2023-10-02"}
          selectionDay={"2023-10-02"}
          onTimeRangeSelected={ args => {
            calendarRef.current.control.update({
              startDate: args.day
            });
          }}
        />
      </div>
      <div style={styles.main}>
        <DayPilotCalendar
          {...calendarConfig}
          onTimeRangeSelected={(args) => handleEventClick(args)}
          onEventClick={(args) => handleEventClick(args)}
          ref={calendarRef}
        />
      </div>
      <Modal isOpen={modalOpen} toggle={handleCloseModal}>
      <ModalHeader toggle={handleCloseModal}>Event detail</ModalHeader>
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
      <Button color="warning" onClick={() => handleOptionChange('Occupied')} active={selectedOption === 'Occupied'}>Occupied</Button>
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
        <Button color="secondary" onClick={handleCloseModal}>Close</Button>
        <Button color="primary" onClick={handleSaveModal}>Save</Button>
      </ModalFooter>
    </Modal>
    
    </div>
    
  );
}

export default Calendar;




// import React,{useState} from "react";


// const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// const Calendar = () => {
//   const [selectedDate, setSelectedDate] = useState(new Date());

//   const renderDaysOfWeek = () => {
//     return daysOfWeek.map(day => (
//       <div key={day} className="day-of-week">{day}</div>
//     ));
//   };

//   const renderWeekDates = () => {
//     const weekStart = new Date(selectedDate);
//     weekStart.setDate(selectedDate.getDate() - selectedDate.getDay()); // Get the first day of the week

//     const dates = [];
//     for (let i = 0; i < 7; i++) {
//       const date = new Date(weekStart);
//       date.setDate(weekStart.getDate() + i);
//       dates.push(date);
//     }

//     return dates.map(date => (
//       <div key={date.toISOString()} className="calendar-date">{date.getDate()}</div>
//     ));
//   };

//   const handlePrevWeek = () => {
//     const newDate = new Date(selectedDate);
//     newDate.setDate(selectedDate.getDate() - 7);
//     setSelectedDate(newDate);
//   };

//   const handleNextWeek = () => {
//     const newDate = new Date(selectedDate);
//     newDate.setDate(selectedDate.getDate() + 7);
//     setSelectedDate(newDate);
//   };

//   return (
//     <div className="calendar-container">
//       <div className="calendar-header">
//         <button onClick={handlePrevWeek}>Prev</button>
//         <div className="selected-week">{selectedDate.toDateString()}</div>
//         <button onClick={handleNextWeek}>Next</button>
//       </div>
//       <div className="days-of-week">{renderDaysOfWeek()}</div>
//       <div className="week-dates">{renderWeekDates()}</div>
//       {/* Add more calendar content here */}
//     </div>
//   );
// };

// export default Calendar;
