import React, { Component } from "react";
import {
  Grid,
  Row,
  Col,
  Table,
  FormGroup,
  ControlLabel,
  FormControl
} from "react-bootstrap";
import { NavItem, Nav, NavDropdown, MenuItem } from "react-bootstrap";
import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import { ResArray } from "variables/Variables.jsx";

import Button from "components/CustomButton/CustomButton.jsx";
import axios from 'axios';
import moment from 'moment';
import AuthService from "../../services/auth.service";
import {updated, success, deleted, created} from "variables/Codes.jsx";

moment.locale("it");

function toLocalDate(date){
    let localDate = new Date(date);
    return localDate.toLocaleDateString();
}

class AvviaDonazione extends Component {
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
        if(data.data.reservations.length == 0)
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

  handleSubmit(event) {

      var r = window.confirm("Sicuro di voler confermare la Donazione?"); 
      if(r === true)
      {
          const url = 'http://localhost:3000/api/v1/donations/'+event;
              
          return axios.post(url,{},{
            headers: {
              "x-access-token": AuthService.getCurrentToken()
            }})
            .then(res => {
              if(res.status === created)
            {
              alert("Donazione effettuata con successo!");
            }
            window.location.reload(false);
            }).catch(err => {
              alert(err.response.data.message);
            })

      }


    
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
                                <Button type="button" onClick={() => this.handleSubmit(prop._id)}> Avvia Donazione </Button>
                              }
                            </td>
                            <td>
                              {
                                prop._id
                              }
                            </td>
                            <td>
                              {
                                prop.slot
                              }
                            </td>
                            <td>
                              {
                                prop.date
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

export default AvviaDonazione;
