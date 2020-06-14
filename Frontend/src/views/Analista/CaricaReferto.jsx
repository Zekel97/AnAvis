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
import ReservationList from "views/Dottore/ReservationList.jsx";
import { OpenDonArray } from "variables/Variables.jsx";

import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import { UserCard } from "components/UserCard/UserCard.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import axios from 'axios';
import moment from 'moment';
import DonazioniAperte from "./DonazioniAperte.jsx";
import AuthService from "../../services/auth.service";
import {updated, success, deleted, created} from "variables/Codes.jsx";

moment.locale("it");

function toLocalDate(date){
    let localDate = new Date(date);
    return localDate.toLocaleDateString();
}

class CaricaReferto extends Component {
  state = {
    donation_id: null,
    referto: null,
    donations: []
  }
  componentDidMount() {

    const url = 'http://localhost:3000/api/v1/donations/';
    axios.get(url,{
      headers: {
        "x-access-token":AuthService.getCurrentToken()
      }})
    .then(response => response.data)
    .then((data) => {
      console.log(data.data.donations);
        if(data.data.donations.length !== 0)
        {
          this.setState({ donations: data.data.donations })
        }
        })
    .catch(function (error) {
      
     
      console.log(error);
    })
  
  }

  handleChangeCode(event){
    this.setState({ donation_id: event });
    
  }

  onChangeHandler=event=>{
    this.setState({ referto: event.target.files[0],loaded: 0});
    console.log(event.target.files[0]);
    }

    handleBack = event =>{
      this.setState({ donation_id : null });
    }



  handleSubmit = event => {

      var r = window.confirm("Sicuro di voler confermare il caricamento del referto?"); 
      if(r === true)
      {
          
          event.preventDefault();
          
          const data = new FormData();
      
          data.append('report',this.state.referto);
      
          const url = 'http://localhost:3000/api/v1/donations/'+this.state.donation_id;

          return axios.patch(url, data,{
            headers: {
              "x-access-token":AuthService.getCurrentToken()
            }})
            .then(res => {
              if(res.status === success)
            {
              alert("Caricato con successo!");
            }
            window.location.reload(false);
            }).catch(err => {
              alert(err.response.data.message);
            })

      }
      else
      {
          console.log("Ha rifiutato");
      }

      window.location.reload(false);

    
  }

  render() {

    return (
      <div className="content">     

        {!this.state.donation_id && <Grid fluid>
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
                                <Button type="button" onClick={() => this.handleChangeCode(prop._id)}> Carica Referto </Button>
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
        </Grid>} 

        {this.state.donation_id && <Grid fluid>
          <Row>
          <Button type="button" onClick={this.handleBack}> Indietro </Button>
            <Col md={12}>
              <Card
                title="Carica Referto"
                content={
                  <form onSubmit={this.handleSubmit} >

                    <input type="file" name="file" onChange={this.onChangeHandler}/>
                    
                    <Button bsStyle="info" pullRight fill type="submit">
                      Carica Referto
                    </Button>
                    <div className="clearfix" />
                  </form>
                }
              />
            </Col>
          </Row>
        </Grid>}
      </div>
    );
  }
}

export default CaricaReferto;
