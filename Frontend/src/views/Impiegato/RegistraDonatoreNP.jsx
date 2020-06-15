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
import DonorList from "views/Impiegato/DonorList.jsx";
import { Card } from "components/Card/Card.jsx";
import { DonArray } from "variables/Variables.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import { UserCard } from "components/UserCard/UserCard.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import axios from 'axios';
import moment from 'moment';
import AuthService from "../../services/auth.service";
import {updated, success, deleted, created} from "variables/Codes.jsx";

moment.locale("it");



class RegistraDonatoreNP extends Component {
  
  state = {
    user_code: '',
    module: null,
    donors: []
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

  handleChangeCode(event){
    this.setState({ user_code: event });
    
  }

  handleBack(){
    this.setState({user_code:null});
  }
  
  onChangeHandler=event=>{
    this.setState({ module: event.target.files[0],loaded: 0});
    }

  handleSubmit = event => {

    var data = new FormData();

    data.append('donor_id', this.state.user_code);
    data.append('module', this.state.module);
    data.append('facility_code', AuthService.getCurrentFacilityCode());

    var r = window.confirm("Sicuro di voler confermare la registrazione?"); 
      if(r === true)
      {
    const url = 'http://localhost:3000/api/v1/reservations/';
        
    return axios.post(url, data,{
      headers: {
        "x-access-token":AuthService.getCurrentToken()
      }})
      .then(res => {
        if(res.status === created)
            {
              alert("Registrazione creata con successo!");
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
        
        { !this.state.user_code && <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="Lista Donatori"
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
                                <Button type="button" onClick={() => this.handleChangeCode(prop._id)}> Registra </Button>
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
       
        {this.state.user_code && <Grid fluid>
          <Row>
          <Button type="button" onClick={() => this.handleBack()}> Indietro </Button>
            <Col md={12}>
              <Card
                title="Registra Donatore Non Prenotato"
                content={
                  <form onSubmit={this.handleSubmit} >

                    <input type="file" name="file" onChange={this.onChangeHandler}/>
                    
                    <a href="http://localhost:3000/uploads/Modulo_Predefinito.pdf" target="_blank">Scarica Modulo Qui</a>

                    <Button bsStyle="info" pullRight fill type="submit">
                      Send
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

export default RegistraDonatoreNP;
