import React, { Component } from "react";
import { Grid, Row, Col, Table } from "react-bootstrap";

import Card from "components/Card/Card.jsx";
import { ResArray } from "variables/Variables.jsx";
import axios from "axios";

class ReservationList extends Component {
  state = {
    reservations: [],
    date: 0
}
componentDidMount() {

  const url = 'http://localhost:3000/api/v1/reservations/';
  axios.get(url)
  .then(response => response.data)
  .then((data) => {
    console.log(data.data.reservations);
      if(data.data.reservations.length == 0)
      {
        this.setState({ date: "none"});
      }
      else{
        console.log("e invece");
        this.setState({ reservations: data.data.reservations })
        this.setState({ date: data.data.reservations[0].date})
      }
      })
  .catch(function (error) {
    
   
    console.log(error);
  })

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
                              {
                                prop.module_path
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

export default ReservationList;
