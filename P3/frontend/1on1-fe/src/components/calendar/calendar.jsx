import React, { useState, useRef } from 'react';
import { DayPilot, DayPilotCalendar, DayPilotNavigator } from "@daypilot/daypilot-lite-react";
import { ButtonGroup, Modal, ModalHeader, ModalBody, ModalFooter, Button, InputGroup, InputGroupText, Input, Label, FormGroup } from 'reactstrap';

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

const Calendar = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [event, setEvent] = useState(null);
  const [startTime, setStartTime] = useState('10:00');
  const [endTime, setEndTime] = useState('11:00');

  const calendarRef = useRef();

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleEventClick = (args) => {
    setEvent(args.e);
    setStartTime(args.e.data.start.toString("HH:mm"));
    setEndTime(args.e.data.end.toString("HH:mm"));
    setModalOpen(true);
  };

  const handleSaveModal = () => {
    // Here you can implement saving logic
    handleCloseModal();
  };

  const editEvent = async (e) => {
    const dp = calendarRef.current.control;
    
    
    dp.events.update(e);
  };
  const [calendarConfig, setCalendarConfig] = useState({
    viewType: "Week",
    durationBarVisible: false,
    timeRangeSelectedHandling: "Enabled",
    onTimeRangeSelected: async args => {
      const dp = calendarRef.current.control;
      const modal = await DayPilot.Modal.prompt("Create a new event:", "Event 1");
      dp.clearSelection();
      if (!modal.result) { return; }
      dp.events.add({
        start: args.start,
        end: args.end,
        id: DayPilot.guid(),
        text: modal.result
      });
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
          startDate={"2024-01-01"}
          selectionDay={"2024-01-01"}
          onTimeRangeSelected={ args => {
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
        <ModalHeader toggle={handleCloseModal}>Event Detail</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label>Start Time:</Label>
            <Input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
          </FormGroup>
          <FormGroup>
            <Label>End Time:</Label>
            <Input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
          </FormGroup>
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