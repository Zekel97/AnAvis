import React, { Component } from "react";
import { Grid, Row, Col, Table } from "react-bootstrap";

import Card from "components/Card/Card.jsx";
import { DocArray } from "variables/Variables.jsx";
import axios from "axios";
import AuthService from "../../services/auth.service";

class DoctorsList extends Component {
  state = {
    docs: []
}
componentDidMount() {

  const url = 'http://localhost:3000/api/v1/doctors/';
  axios.get(url,{
    headers: {
      "x-access-token": AuthService.getCurrentToken()
    }})
  .then(response => response.data)
  .then((data) => {
      this.setState({ docs: data.data.doctors })
      })

}
  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="Doctors"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <Table striped hover>
                    <thead>
                      <tr>
                        {
                          DocArray.map((prop, key) => {
                            return <th key={key}>{prop}</th>;
                          })
                        }
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.docs.map((prop, key) => {
                        console.log(prop);
                        console.log(key);
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
                                prop.start_hour
                              }
                            </td>
                            <td>
                              {
                                prop.end_hour
                              }
                            </td>
                            <td>
                              {
                                prop.working_days
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
        </Grid>
      </div>
    );
  }
}

export default DoctorsList;
