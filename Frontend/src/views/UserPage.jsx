import React, { Component } from "react";
import authService from "services/auth.service";


class UserPage extends Component {
  state = {
    id: authService.getCurrentId(),
    role: authService.getCurrentRole()
  }
  componentDidMount()
  {
    authService.getRoleId();
  }

  render() {
    const { id, role } = this.state;

    return (
      <div className="content">

        <h3> Welcome, <strong>{role}</strong> </h3>

        
        <p> Il tuo token supersegreto è <strong>{id}</strong> </p>

        
      </div>
    );
  }
}

export default UserPage;
