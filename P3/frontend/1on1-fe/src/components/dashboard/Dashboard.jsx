import React from "react";
import Header from "../header/Header";
import CalendarInvitations from "./CalendarInvitations";
import SentInvitations from "./SentInvitations";


function Dashboard() {

    return (
        <div className="container py-5">
            <Header/>
          <CalendarInvitations/>
          <SentInvitations/>
        </div>
    )
}

export default Dashboard;
