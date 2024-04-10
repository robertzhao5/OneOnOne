import React, { useState, useRef, useEffect } from 'react';
import { DayPilot, DayPilotCalendar, DayPilotNavigator } from "@daypilot/daypilot-lite-react";
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

const Calendar = () => {
  const calendarRef = useRef()

  const editEvent = async (e) => {
    const dp = calendarRef.current.control;
    const modal = await DayPilot.Modal.prompt("Update event text:", e.text());
    if (!modal.result) { return; }
    e.data.text = modal.result;
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
          ref={calendarRef}
        />
      </div>
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
