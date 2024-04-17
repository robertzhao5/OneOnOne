import React, {useState, useRef, useEffect} from 'react';
import {
  DayPilot,
  DayPilotCalendar,
  DayPilotNavigator
} from "@daypilot/daypilot-lite-react";
import {
  ButtonGroup,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  InputGroup,
  InputGroupText,
  Input,
  Label,
  FormGroup
} from 'reactstrap';

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

let populated = false;

const Calendar = ({Timeslot}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [event, setEvent] = useState(null);
  const [eventText, setEventText] = useState('Event');
  const [startTime, setStartTime] = useState('10:00');
  const [endTime, setEndTime] = useState('11:00');
  const [date, setDate] = useState("2024-01-01");
  const [participant, setParticipant] = useState('');
  const [participants, setParticipants] = useState([]);
  const handleRemoveParticipant = (index) => {//TODO: refactor event details modals to calendar
    const updatedParticipants = participants.filter((_, i) => i !== index);
    setParticipants(updatedParticipants);
  };


  const calendarRef = useRef();

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleEventClick = (args) => {
    setEvent(args.e);
    setStartTime(args.e.data.start.toString("HH:mm"));
    setEndTime(args.e.data.end.toString("HH:mm"));
    setEventText(args.e.data.text);
    setDate(args.e.data.start.toString("yyyy-MM-dd"));
    setModalOpen(true);
  };
  const handleAddParticipant = () => {
    if (participant.trim() !== '') {
      setParticipants([...participants, participant]);
      setParticipant('');
    }
  };

  const handleSaveModal = () => {
    // Here you can implement saving logic
    editEvent(event);
    handleCloseModal();
  };

  const convertDaytoPusdoDate = (day) => {
    const weekdayToDate = {
      "Monday": "2024-04-15",
      "Tuesday": "2024-04-16",
      "Wednesday": "2024-04-17",
      "Thursday": "2024-04-18",
      "Friday": "2024-04-19",
      "Saturday": "2024-04-20",
      "Sunday": "2024-04-14",
    };
    return weekdayToDate[day];
  };

  const populateEvents = () => {
    const dp = calendarRef.current.control;
    dp.clearSelection();
    console.log(Timeslot)
    console.log(populated)
    for (let i = 0; i < Timeslot.length; i++) {
      populated = true;
      let day = Timeslot[i].day;
      let participant = Timeslot[i].participant;
      console.log(convertDaytoPusdoDate(day) + "T" + Timeslot[i].start);
      const dayDate = convertDaytoPusdoDate(day);
      let newStartTime = new DayPilot.Date(dayDate + "T" + Timeslot[i].start);
      let newEndTime = new DayPilot.Date(dayDate + "T" + Timeslot[i].end);
      let newId = DayPilot.guid();
      let newEvent = {
        start: newStartTime,
        end: newEndTime,
        id: newId,
        text: participant.username,
        participants: 0,
      };
      dp.events.add(newEvent);
    }
  };

  useEffect(() => {
    if (!populated) {
      populateEvents();
    }
  }, [Timeslot]);

  const editEvent = async (e) => {
    const dp = calendarRef.current.control;
    let newStartTime = new DayPilot.Date(date + "T" + startTime + ":00");
    let newEndTime = new DayPilot.Date(date + "T" + endTime + ":00");
    e.data.start = newStartTime;
    e.data.end = newEndTime;
    e.data.text = eventText;
    dp.events.update(e);
  };

  const [calendarConfig, setCalendarConfig] = useState({
    viewType: "Week",
    durationBarVisible: false,
    timeRangeSelectedHandling: "Enabled",
    onTimeRangeSelected: async args => {
      const dp = calendarRef.current.control;
      dp.clearSelection();
      const newEvent = {
        start: args.start,
        end: args.end,
        id: DayPilot.guid(),
        text: eventText,
      };
      let newId = newEvent.id;
      dp.events.add(newEvent);
      let e = dp.events.find(newId);
      handleEventClick({e});
    },
    onEventClick: async args => {
      await editEvent(args.e);
    },
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
        {
          text: "Edit...",
          onClick: async args => {
            await editEvent(args.source);
          }
        }
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
      if (participants > 0) {
        // show one icon for each participant
        for (let i = 0; i < participants; i++) {
          args.data.areas.push({
            bottom: 5,
            right: 5 + i * 30,
            width: 24,
            height: 24,
            action: "None",
            image: `https://picsum.photos/24/24?random=${i}`,
            style: "border-radius: 50%; border: 2px solid #fff; overflow: hidden;",
          });
        }
      }
    }
  });


  return (
    <div style={styles.wrap}>
      <div style={styles.left}>
        <DayPilotNavigator
          selectMode={"Week"}
          headerDateFormat="dddd"

          onTimeRangeSelected={args => {
            calendarRef.current.control.update({
              startDate: args.day
            });
          }}
        />
      </div>
      <div style={styles.main}>
        <DayPilotCalendar
          viewType="Week"
          durationBarVisible={false}
          timeRangeSelectedHandling="Enabled"
          {...calendarConfig}
          onEventClick={(args) => handleEventClick(args)}
          ref={calendarRef}

        />
      </div>
      <Modal isOpen={modalOpen} toggle={handleCloseModal}>
        <ModalHeader toggle={handleCloseModal}>Event Detail for {eventText}</ModalHeader>
        <ModalBody>
          <label>Event Title:</label>
          <Input value={eventText} onChange={(e) => setEventText(e.target.value)}/>
          <FormGroup>
            <Label>Start Time:</Label>
            <Input type="time" value={startTime}
                   onChange={(e) => setStartTime(e.target.value)}/>
          </FormGroup>
          <FormGroup>
            <Label>End Time:</Label>
            <Input type="time" value={endTime}
                   onChange={(e) => setEndTime(e.target.value)}/>
          </FormGroup>
          <h4>Participant</h4>
          <InputGroup>
            <InputGroupText>@</InputGroupText>
            <Input value={participant} onChange={(e) => setParticipant(e.target.value)}
                   placeholder="Username"/>
            <Button color="primary" onClick={handleAddParticipant}>Add</Button>
          </InputGroup>
          <ul className="list-group list-group-vertical">
            {participants.map((participant, index) => (
              <li key={index} className="list-group-item">
                {participant}
                <Button close onClick={() => handleRemoveParticipant(index)}/>
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
