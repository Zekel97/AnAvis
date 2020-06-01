import React, { Component } from "react";
import authService from "services/auth.service";


class Logout extends Component {

  render() {

    return (
        <div>
            { authService.logout() }
            { this.props.history.push("/notauth/login") }
            { window.location.reload() }
        </div>
    );
  }
}

export default Logout;