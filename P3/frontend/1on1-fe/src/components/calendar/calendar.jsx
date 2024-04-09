import React from "react";

import './Calendar.css'; // Import your CSS file for styling if needed

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const renderDaysOfWeek = () => {
    return daysOfWeek.map(day => (
      <div key={day} className="day-of-week">{day}</div>
    ));
  };

  const renderWeekDates = () => {
    const weekStart = new Date(selectedDate);
    weekStart.setDate(selectedDate.getDate() - selectedDate.getDay()); // Get the first day of the week

    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(weekStart);
      date.setDate(weekStart.getDate() + i);
      dates.push(date);
    }

    return dates.map(date => (
      <div key={date.toISOString()} className="calendar-date">{date.getDate()}</div>
    ));
  };

  const handlePrevWeek = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() - 7);
    setSelectedDate(newDate);
  };

  const handleNextWeek = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() + 7);
    setSelectedDate(newDate);
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button onClick={handlePrevWeek}>Prev</button>
        <div className="selected-week">{selectedDate.toDateString()}</div>
        <button onClick={handleNextWeek}>Next</button>
      </div>
      <div className="days-of-week">{renderDaysOfWeek()}</div>
      <div className="week-dates">{renderWeekDates()}</div>
      {/* Add more calendar content here */}
    </div>
  );
};

export default Calendar;