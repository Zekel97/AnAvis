import React, { Component } from "react";
import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl
} from "react-bootstrap";
import { NavItem, Nav, NavDropdown, MenuItem } from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import { UserCard } from "components/UserCard/UserCard.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import axios from 'axios';
import moment from 'moment';
import authHeader from "../../services/auth-header";
import AuthService from "../../services/auth.service";
import {updated, success, deleted, created} from "variables/Codes.jsx";

moment.locale("it");

function toLocalDate(date){
    let localDate = new Date(date);
    return localDate.toLocaleDateString();
}


class PrenotaDonazione extends Component {
  state = {
    module: null,
    date: '',
    slot: '',
    giorno: '',
    selectedSlot: ''
  }
   

  moduleShow()
  {
    if (this.state.slot==undefined || this.state.slot.length === 0){
      return <div></div>
    }
    else
    {
      return <div>
        <br />
        <a href="http://localhost:3000/uploads/Modulo_Predefinito.pdf" target="_blank">Scarica Modulo Qui</a>
        <br />
        <p>Upload Modulo:</p>
        <input type="file" name="file" onChange={this.onChangeHandler}/>
      </div>
    }
  }

  timeSlotShow()
  {
    if (this.state.slot==undefined || this.state.slot.length === 0)
    {
      return <div></div>
    }
    else
    {
      return <div>
        <p>Scegli slot orario:</p>
        {this.dropdown()}
      </div>
    }
  }


   dropdown() 
   {
      if (this.state.slot==undefined || this.state.slot.length === 0){
        return <div></div>
      }
      else
      {
        const options = [];
        this.state.slot.map( (element, key) => {options.push(<option key={key} value={element}>{element}</option>)});
        return(
            <select  onChange={this.handleChangeSelectedSlot}> 
            {options}
          </select>
        )

      }

   }

  handleChangeSelectedSlot = event => {
    this.setState({selectedSlot : event.target.value});
  }

  handleChangeDate = event => {

    this.setState({ date:  event.target.value });

    let trueDate = moment(event.target.value,"YYYY-MM-DD").format('DD/MM/YYYY');
        
    if(this.state.date !== "Invalid date")
    {
        if(moment(trueDate,"DD/MM/YYYY").isAfter(moment()))
        {
            const url = 'http://localhost:3000/api/v1/reservations/daily_slots?date=';
            axios.get(url+moment(trueDate,"DD/MM/YYYY").format("YYYY-MM-DD"), {
                headers: {
                  "x-access-token":AuthService.getCurrentToken()
                }
              }).then(response => response.data)
              .then((data) => {
                  let slot = new Array();
                  Object.keys(data.data).map((prop, key) => {
                    if(prop !== 'date' && prop!== 'giorno' && prop !== 'medici_non_disponibili'){
                      slot.push(prop);
                    }
                })

                this.setState({slot : slot});
                this.setState({giorno : data.data.giorno});
                  
            })
              .catch(function (error) {

                  console.log(error);
              })
        }
        else
        {
          this.setState({slot: null});
        }   

  }

  }
  

  onChangeHandler=event=>{
    this.setState({ module: event.target.files[0],loaded: 0});
    }

  handleSubmit = event => {

    const data = new FormData();

    data.append('donor_id',AuthService.getCurrentRoleId());
    data.append('module', this.state.module);
    data.append('date',moment(this.state.date, "YYYY-MM-DD").format("DD/MM/YYYY"));
    data.append('slot',this.state.selectedSlot);
    data.append('facility_code', AuthService.getCurrentFacilityCode());
    
    var r = window.confirm("Sicuro di voler confermare la prenotazione?"); 
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
          alert("Prenotazione inviata con successo!");
        }
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
            <Col md={8}>
              <Card
                title="Prenota Donazione"
                content={
                  <form onSubmit={this.handleSubmit} >
                    <FormInputs
                      ncols={["col-md-6"]}
                      properties={[
                        {
                          label: "Date",
                          type: "Date",
                          bsClass: "form-control",
                          onChange: this.handleChangeDate
                        }
                      ]}
                    />
                    {this.timeSlotShow()}

                    
                    {this.moduleShow()}
                    
                    <Button bsStyle="info" pullRight fill type="submit">
                      Send
                    </Button>
                    <div className="clearfix" />
                  </form>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default PrenotaDonazione;
