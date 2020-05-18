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
import ReservationList from "views/ReservationList.jsx";
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

class AvviaDonazione extends Component {
  state = {
    reservation_id: '',
  }

  handleChangeCode = event => {
    this.setState({ reservation_id: event.target.value });
    
  }



  handleSubmit = event => {

      var r = window.confirm("Sicuro di voler confermare la Donazione?"); 
      if(r === true)
      {
          
          event.preventDefault();
          
          const data = new FormData();
      
          data.append('reservation_id', this.state.reservation_id);
      
          const url = 'http://localhost:3000/api/v1/donations/'+this.state.reservation_id;
      
              
          axios.post(url)
            .then(res => {
              console.log(res);
              console.log(res.data);
            })   

      }
      else
      {
          console.log("Ha rifiutato");
      }
    
  }

  render() {

    return (
      <div className="content">        
        <ReservationList />       
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="Avvia Donazione"
                content={
                  <form onSubmit={this.handleSubmit} >
                    <FormInputs
                      ncols={["col-md-6"]}
                      properties={[
                        {
                          label: "Codice",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Codice Donatore",
                          defaultValue: "Mike",
                          onChange: this.handleChangeCode
                        }
                      ]}
                    />

                    
                    <Button bsStyle="info" pullRight fill type="submit">
                      Avvia Donazione
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

export default AvviaDonazione;
