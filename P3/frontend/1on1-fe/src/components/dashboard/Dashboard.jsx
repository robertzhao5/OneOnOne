import React from "react";
import Header from "../header/Header";
import CalendarInvitations from "./CalendarInvitations";
import SentInvitations from "./SentInvitations";
import UpcomingMeetings from "./UpcomingMeetings";


function Dashboard() {

    return (
        <div className="container py-5">
            <Header/>
          <CalendarInvitations/>
          <SentInvitations/>
          <UpcomingMeetings/>
        </div>
    )
}

export default Dashboard;
