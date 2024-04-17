function CalendarCard({ id, name, owner, participants, meetings, onClick }) {
  return (
    <div className="card m-2 bg-body-secondary" style={{ width: "18rem" }} onClick={() => onClick({ id, name, owner, participants, meetings })}> {/* bg-light for subtle background differentiation */}
      <div className="card-body">
        <h5 className="card-title fs-4 fw-bold text-primary-emphasis">{name}</h5>
        <p className="card-text mb-2">Participants: {participants.length}</p>
        <p className="card-text mt-2">Meetings Count: {meetings.length}</p>
      </div>
    </div>
  );
}

export default CalendarCard;
