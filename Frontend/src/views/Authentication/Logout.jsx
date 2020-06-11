import React, { Component } from "react";
import authService from "services/auth.service";


class Logout extends Component {

  checkLogout()
  {
    var r = window.confirm("Sicuro di voler effettuare il logout?"); 
      if(r === true)
      {
        authService.logout();
        this.props.history.push("/notauth/login");
        window.location.reload();
      }
      else
      {
        this.props.history.goBack();
      }

  }


  render() {

    return (
        <div>
            { this.checkLogout() }
        </div>
    );
  }
}

export default Logout;