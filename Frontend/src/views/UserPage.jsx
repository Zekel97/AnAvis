import React, { Component } from "react";
import authService from "services/auth.service";
import axios from "axios";
import { Grid, Row, Col, Table } from "react-bootstrap";



class UserPage extends Component {
  state = {
    datiDonation:[],
    datiReservation: []
  }
  componentDidMount()
  {
    authService.getRoleId();

    if(authService.getCurrentRole() === "donor")
    {
      this.getDonations();
      this.getReservations();
    }
  }

  urlify(url_part)
  {
    let url = "http://localhost:3000/";
    url = url + url_part;
    console.log(url);
    return url;
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

  getDonations()
  {
    const url = "http://localhost:3000/api/v1/donors/"+authService.getCurrentRoleId()+"/donations";
    axios.get(url, {
      headers: {
        "x-access-token":authService.getCurrentToken()
      }}).then(res=>{
        console.log(res.data.data.donations);
        this.setState({datiDonation: res.data.data.donations});
      })
  }

  showDonations()
  {
    if(this.state.datiDonation.length === 0)
    {
      return(
        <div>
          <h3>Nessuna donazione effettuata ancora!</h3>
        </div>
      )
    }
    return(
      <div>
        <h2>Donazioni effettuate:</h2>
      <Table striped hover>
                    <thead>
                      <tr>
                        <th>
                          Status
                        </th>
                        <th>
                          Data Donazione
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.datiDonation.map((prop, key) => {
                        return (
                          <tr key={key}>
                            <td>
                                {
                                prop.status
                                }
                            </td>
                            <td>
                              {
                                prop.donation_date
                              }
                            </td>
                            {this.reportShower(prop.report_path)}
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </div>
    )
  }

  showReservations()
  {
    if(this.state.datiReservation.length === 0)
    {
      return(
        <div>
          <h3>Nessuna donazione effettuata ancora!</h3>
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

  showWorkingData()
  {
    return(
      <div>
        <h3>Giorni Lavorativi: <strong>{authService.getCurrentWorkingDays()}</strong></h3>
        <h3>Orario Inizio: <strong>{authService.getCurrentStartHour()}</strong></h3>
        <h3>Orario Fine: <strong>{authService.getCurrentEndHour()}</strong></h3>
      </div>
    )
  }

  roleBasedShow()
  {
    if(authService.getCurrentRole()==="donor")
    {
      return(
        <div>
        {this.showReservations()}
        {this.showDonations()}
        </div>
        );
    }
    else if(authService.getCurrentRole() === "facility" || authService.getCurrentRole() === "avis" || authService.getCurrentRole() === "admin")
    {

    }
    else
    {
      return(
        <div>
          {this.showWorkingData()}
        </div>
      )
    }
  }

  nameShower()
  {
    if(authService.getCurrentRole() === "admin")
    {
      return "Admin";
    }
    else
    {
      return authService.getCurrentRole();
    }
  }

  reportShower(path_url)
  {
    if(path_url)
    {
      return(
        <td>
          <a href={this.urlify(path_url)} target="_blank">Referto</a>
        </td>
      )
    }
    else
    {
      return(
        <td>
          <p>Referto non ancora caricato!</p>
        </td>
      )
    }
  }


  render() {

    return (
      <div className="content">

        <h3> Welcome, <strong>{this.nameShower()}</strong> </h3>


        {this.roleBasedShow()}

        
      </div>
    );
  }
}

export default UserPage;
