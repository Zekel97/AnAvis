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
import DonazioniAperte from "./DonazioniAperte.jsx";

moment.locale("it");

function toLocalDate(date){
    let localDate = new Date(date);
    return localDate.toLocaleDateString();
}

class CaricaReferto extends Component {
  state = {
    donation_id: '',
    referto: null
  }

  handleChangeCode = event => {
    this.setState({ donation_id: event.target.value });
    
  }

  onChangeHandler=event=>{
    this.setState({ referto: event.target.files[0],loaded: 0});
    console.log(event.target.files[0]);
    }



  handleSubmit = event => {

      var r = window.confirm("Sicuro di voler confermare il caricamento del referto?"); 
      if(r === true)
      {
          
          event.preventDefault();
          
          const data = new FormData();
      
          data.append('report',this.state.referto);
      
          const url = 'http://localhost:3000/api/v1/donations/'+this.state.donation_id;

          axios.patch(url, data)
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

        <DonazioniAperte /> 

        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="Carica Referto"
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
        </Grid>
      </div>
    );
  }
}

export default CaricaReferto;
