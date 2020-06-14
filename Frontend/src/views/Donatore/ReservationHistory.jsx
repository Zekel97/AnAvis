import React, { Component } from "react";
import authService from "services/auth.service";
import axios from "axios";
import { Grid, Row, Col, Table } from "react-bootstrap";



class UserPage extends Component {
  state = {
    datiDonation:[]
  }
  componentDidMount()
  {
    authService.getRoleId();
    this.getDonations();
  }

  urlify(url_part)
  {
    let url = "http://localhost:3000/";
    url = url + url_part;
    console.log(url);
    return url;
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

        <h3> Welcome, <strong>{authService.getCurrentRole()}</strong> </h3>


        {this.showDonations()}
        
      </div>
    );
  }
}

export default UserPage;
