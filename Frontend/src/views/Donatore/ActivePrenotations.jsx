import React, { Component } from "react";
import authService from "services/auth.service";
import axios from "axios";
import { Grid, Row, Col, Table } from "react-bootstrap";



class UserPage extends Component {
  state = {
    datiReservation: []
  }
  componentDidMount()
  {
    authService.getRoleId();
    this.getReservations();
  }


  getReservations()
  {
    const url = "http://localhost:3000/api/v1/donors/"+authService.getCurrentRoleId()+"/reservations";
    axios.get(url, {
      headers: {
        "x-access-token":authService.getCurrentToken()
      }}).then(res=>{
        console.log(res.data.data.reservation);
        this.setState({datiReservation: res.data.data.reservation});
      })
  }



  showReservations()
  {
    if(this.state.datiReservation.length === 0)
    {
      return(
        <div>
          <h3>Nessuna prenotazione effettuata ancora!</h3>
        </div>
      )
    }
    return(
      <div>
        <h2>Prenotazioni:</h2>
      <Table striped hover>
                    <thead>
                      <tr>
                        <th>
                          Data Prenotazione
                        </th>
                        <th>
                          Orario Prenotazione
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.datiReservation.map((prop, key) => {
                        return (
                          <tr key={key}>
                            <td>
                                {
                                prop.date
                                }
                            </td>
                            <td>
                              {
                                prop.slot
                              }
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </div>
    )
  }

  render() {

    return (
      <div className="content">

        <h3> Welcome, <strong>{authService.getCurrentRole()}</strong> </h3>


        {this.showReservations()}
        
      </div>
    );
  }
}

export default UserPage;
