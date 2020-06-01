import React, { Component } from "react";
import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl
} from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import { UserCard } from "components/UserCard/UserCard.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import axios from 'axios';

import avatar from "assets/img/faces/face-3.jpg";
import authService from "services/auth.service";


class ReservationMaker extends Component {
  state = {
    user_code: '',
    module: null,
    date: '',
    slot: ''
  }

  
  handleChangeCode = event => {
    this.setState({ user_code: event.target.value });
  }
  handleChangeDate = event => {
    this.setState({ date: event.target.value });
  }
  handleChangeSlot = event => {
    this.setState({ slot: event.target.value });
  }

  /*
    user_code 
    module
    date
    slot
  */

  // -- FILE UPLOAD FUNCTION
  onChangeHandler=event=>{
    this.setState({ module: event.target.files[0],loaded: 0});
    console.log(event.target.files[0]);
}

  handleSubmit = event => {
    event.preventDefault();


    const data = new FormData();
    
    data.append('user_code', authService.getCurrentRoleId());
   data.append('date', this.state.date);
   data.append('slot', this.state.slot);
   data.append('module', this.state.module);


    

    const url = 'http://localhost:3000/api/v1/reservations/';

    axios.post(url, data)
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
  }

  render() {

    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={8}>
              <Card
                title="Edit Profile"
                content={
                  <form onSubmit={this.handleSubmit} >
                    <FormInputs
                      ncols={["col-md-6", "col-md-6"]}
                      properties={[
                        {
                          label: "Codice",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Nome Donatore",
                          defaultValue: "Mike",
                          onChange: this.handleChangeCode
                        },
                        {
                          label: "Date",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Last Donation Date",
                          defaultValue: "1/04/2020",
                          onChange: this.handleChangeDate
                        }
                      ]}
                    />
                    <FormInputs
                      ncols={["col-md-6"]}
                      properties={[
                        {
                          label: "Slot",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Blood Group",
                          defaultValue: "Mike",
                          onChange: this.handleChangeSlot
                        }
                      ]}
                    />

                    { /* FILE UPLOAD FORM */}
                    <input type="file" name="file" onChange={this.onChangeHandler}/>
                    
                    <Button bsStyle="info" pullRight fill type="submit">
                      Send
                    </Button>
                    <div className="clearfix" />
                  </form>
                }
              />
            </Col>
            <Col md={4}>
              <UserCard
                bgImage="https://ununsplash.imgix.net/photo-1431578500526-4d9613015464?fit=crop&fm=jpg&h=300&q=75&w=400"
                avatar={avatar}
                name="Mike Andrew"
                userName="michael24"
                description={
                  <span>
                    "Lamborghini Mercy
                    <br />
                    Your chick she so thirsty
                    <br />
                    I'm in that two seat Lambo"
                  </span>
                }
                socials={
                  <div>
                    <Button simple>
                      <i className="fa fa-facebook-square" />
                    </Button>
                    <Button simple>
                      <i className="fa fa-twitter" />
                    </Button>
                    <Button simple>
                      <i className="fa fa-google-plus-square" />
                    </Button>
                  </div>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default ReservationMaker;
