import React, { Component } from "react";
import { Grid, Row, Col, Table } from "react-bootstrap";
import Button from "components/CustomButton/CustomButton.jsx";

import Card from "components/Card/Card.jsx";
import { DonArray } from "variables/Variables.jsx";
import axios from "axios";
import AuthService from "../../services/auth.service";

class DonorList extends Component {
  state = {
    donors: [],
    selected_donor: ""
}

componentDidMount() {

  const url = 'http://localhost:3000/api/v1/donors/';
  axios.get(url,{
    headers: {
      "x-access-token":AuthService.getCurrentToken()
    }})
  .then(response => response.data)
  .then((data) => {
      this.setState({ donors: data.data.donors })
      })

}
setStatusId = event => {
  console.log(event);
  this.setState({selected_donor: event});
}

getSelectedDonor(){
  return this.state.selected_donor;
}

  render() {
    return (
      <div className="content">
        { !this.state.selected_donor && <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="Donor List"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <Table striped hover>
                    <thead>
                      <tr>
                        {
                          DonArray.map((prop, key) => {
                            return <th key={key}>{prop}</th>;
                          })
                        }
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.donors.map((prop, key) => {
                        return (
                          <tr key={key}>
                            <td>
                              {
                                prop._id
                              }
                            </td>
                            <td>
                              {
                                prop.name
                              }
                            </td>
                            <td>
                              {
                                prop.blood_group
                                
                              }
                            </td>
                            <td>
                              {
                                prop.last_donation_date
                              }
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>


                }
              />
            </Col>
          </Row>
                  
        </Grid>}

      </div>
    );
  }
}

export default DonorList;
