import React, { Component } from "react";
import authService from "services/auth.service";


class Dashboard extends Component {
  render() {
    return (
      <div className="content">
        <h1>AnAvis</h1>
        <h3>Donare il sangue non è mai stato così smart!</h3>
      </div>
    );
  }
}

export default Dashboard;
