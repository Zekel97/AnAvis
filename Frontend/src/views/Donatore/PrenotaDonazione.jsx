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

moment.locale("it");

function toLocalDate(date){
    let localDate = new Date(date);
    return localDate.toLocaleDateString();
}


class PrenotaDonazione extends Component {
  state = {
    user_code: '',
    module: null,
    date: '',
    slot: '',
    giorno: '',
    selectedSlot: ''
  }
   
   dropdown() {

      if (!this.state.slot && this.state.slot.length === 0){
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
    console.log(this.state.selectedSlot);
  }

  handleChangeCode = event => {
    this.setState({ user_code: event.target.value });
    console.log(this.state.user_code);
  }

  handleChangeDate = event => {

    this.setState({ date:  event.target.value });

    let trueDate = moment(event.target.value,"YYYY-MM-DD").format('DD/MM/YYYY');
        
    if(this.state.date !== "Invalid date")
    {
        if(moment(trueDate,"DD/MM/YYYY").isAfter(moment()))
        {
            const url = 'http://localhost:3000/api/v1/reservations/daily_slots';
            axios.get(url, {
                params: {
                  date: moment(trueDate,"DD/MM/YYYY").format("YYYY-MM-DD")
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
                console.log(this.state);
                
                this.setState({giorno : data.data.giorno})
                  
                  
            })
              .catch(function (error) {

                  console.log(error);
              })
        }   

  }

  }
  

  // -- FILE UPLOAD FUNCTION
  onChangeHandler=event=>{
    this.setState({ module: event.target.files[0],loaded: 0});
    console.log(event.target.files[0]);
    }

  handleSubmit = event => {
    console.log(this.state.selectedSlot);
    var data = new FormData();

    data.append('user_code', this.state.user_code);
    data.append('date', moment(this.state.date, "YYYY-MM-DD").format("DD/MM/YYYY"));
    data.append('slot', this.state.selectedSlot);
    data.append('module', this.state.module);

    const url = 'http://localhost:3000/api/v1/reservations/';

    console.log(this.state.user_code+" - "+this.state.date+" - "+this.state.selectedSlot+" - "+this.state.module);
    axios.post(url, {
      "user_code":this.state.user_code,
      "date":moment(this.state.date, "YYYY-MM-DD").format("DD/MM/YYYY"),
      "slot": this.state.selectedSlot,
      "module":this.state.module
    })
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
      window.location.reload(false);

      
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
                      ncols={["col-md-6", "col-md-6"]}
                      properties={[
                        {
                          label: "Codice",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Codice Donatore",
                          defaultValue: "Mike",
                          onChange: this.handleChangeCode
                        },
                        {
                          label: "Date",
                          type: "Date",
                          bsClass: "form-control",
                          placeholder: "Last Donation Date",
                          defaultValue: "1/04/2020",
                          onChange: this.handleChangeDate
                        }
                      ]}
                    />
                    {this.dropdown()}

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
        </Grid>
      </div>
    );
  }
}

export default PrenotaDonazione;