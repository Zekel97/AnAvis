import React, { Component } from "react";
import { Grid, Row, Col, Table } from "react-bootstrap";

import Card from "components/Card/Card.jsx";
import { OpenDonArray } from "variables/Variables.jsx";
import axios from "axios";

class DonazioniAperte extends Component {
  state = {
    donations: []
}
componentDidMount() {

  const url = 'http://localhost:3000/api/v1/donations/';
  axios.get(url)
  .then(response => response.data)
  .then((data) => {
    console.log(data.data.donations);
      if(data.data.donations.length == 0)
      {
        console.log("non ci sono donazioni aperte");
      }
      else{
        console.log("e invece ci sono!");
        this.setState({ donations: data.data.donations })
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
                title={"Donazioni Aperte"}
                ctTableFullWidth
                ctTableResponsive
                content={
                  <Table striped hover >
                    <thead>
                      <tr>
                        {
                          OpenDonArray.map((prop, key) => {
                            return <th key={key}>{prop}</th>;
                          })
                        }
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.donations.map((prop, key) => {
                        return (
                          <tr key={key}>
                            <td>
                              {
                                prop._id
                              }
                            </td>
                            <td>
                              {
                                prop.donation_date
                              }
                            </td>
                            <td>
                              {
                                prop.status
                              }
                            </td>
                            <td>
                              {
                                prop.user_code
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

export default DonazioniAperte;
