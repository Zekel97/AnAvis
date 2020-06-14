import React, { Component } from "react";
import authService from "services/auth.service";
import axios from "axios";
import { Grid, Row, Col, Table } from "react-bootstrap";


class StatisticheAvis extends Component {
  state={
    dati: []
  }
  componentDidMount()
  {
    const url = "http://localhost:3000/api/v1/avis/stat";
    axios.get(url,{
      headers: {
        "x-access-token":authService.getCurrentToken()
      }})
      .then(res => {
        this.setState({ dati: res.data.data })        
      }) 
  }

  showStats()
  {
        return (
            <div>
                <Table striped hover>
                    <thead>
                <tr>
                    <td>
                        Sedi
                    </td>
                    <td>
                        Donatori
                    </td>
                    <td>
                        Impiegati
                    </td>
                    <td>
                        Prenotazioni Attive
                    </td>
                    <td>
                        Donazioni Aperte
                    </td>
                    <td>
                        Donazioni Chiuse
                    </td>
                </tr>
                </thead>
                <tbody>
            <tr>
            <td>
                {
                    this.state.dati.facility
                }
            </td>
            <td>
                {
                     this.state.dati.donors
                }
            </td>
            <td>
                {
                     this.state.dati.workers
                }
            </td>
            <td>
                {
                     this.state.dati.active_reservation
                }
            </td>
            <td>
                {
                     this.state.dati.open_donations
                }
            </td>
            <td>
                {
                     this.state.dati.closed_donations
                }
            </td>

          </tr>
          </tbody>
          </Table>

          </div>
        );
      
  }

  render() {

    return (
      <div className="content">
        {this.showStats()}
      </div>
    );
  }
}

export default StatisticheAvis;
