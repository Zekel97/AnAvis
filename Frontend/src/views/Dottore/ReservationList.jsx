import React, { Component } from "react";
import { Grid, Row, Col, Table } from "react-bootstrap";

import Card from "components/Card/Card.jsx";
import { ResArray } from "variables/Variables.jsx";
import axios from "axios";
import AuthService from "../../services/auth.service";

class ReservationList extends Component {
  state = {
    reservations: [],
    date: 0
}
componentDidMount() {

  const url = 'http://localhost:3000/api/v1/reservations/';
  axios.get(url,{
    headers: {
      "x-access-token":AuthService.getCurrentToken()
    }})
  .then(response => response.data)
  .then((data) => {
      if(data.data.reservations.length === 0)
      {
        this.setState({ date: "none"});
      }
      else{
        this.setState({ reservations: data.data.reservations })
        this.setState({ date: data.data.reservations[0].date})
      }
      })
  .catch(function (error) {
    console.log(error);
  })

}

urlify(url_part)
{
  let url = "http://localhost:3000/";
  url = url + url_part;
  return url;
}

  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title={"Prenotazioni - "+this.state.date}
                ctTableFullWidth
                ctTableResponsive
                content={
                  <Table striped hover>
                    <thead>
                      <tr>
                        {
                          ResArray.map((prop, key) => {
                            return <th key={key}>{prop}</th>;
                          })
                        }
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.reservations.map((prop, key) => {
                        return (
                          <tr key={key}>
                            <td>
                              {
                                prop._id
                              }
                            </td>
                            <td>
                              {
                                prop.user_code
                              }
                            </td>
                            <td>
                              {
                                prop.slot
                              }
                            </td>
                            <td>
                              <a href={this.urlify(prop.module_path)}></a>
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

export default ReservationList;
