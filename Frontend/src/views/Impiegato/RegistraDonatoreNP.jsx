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

moment.locale("it");



class RegistraDonatoreNP extends Component {
  
  state = {
    user_code: '',
    module: null,
    donors: []
  }

  componentDidMount() {

    const url = 'http://localhost:3000/api/v1/donors/';
    axios.get(url)
    .then(response => response.data)
    .then((data) => {
        this.setState({ donors: data.data.donors })
        console.log(this.state.donors)
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
    console.log(event.target.files[0]);
    }

  handleSubmit = event => {
    event.preventDefault();
    console.log(this.state.selectedSlot);
    console.log(DonorList.getSelectedDonor());
    const data = new FormData();

    data.append('user_code', this.state.user_code);
    data.append('module', this.state.module);

    const url = 'http://localhost:3000/api/v1/reservations/';

        
    axios.post(url, data)
      .then(res => {
        console.log(res);
        console.log(res.data);
      })   

      window.location.reload(false);

  }

  render() {

    return (
      <div className="content">
        
        { !this.state.user_code && <Grid fluid>
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
