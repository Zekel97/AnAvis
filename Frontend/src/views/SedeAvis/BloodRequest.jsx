import React, { Component } from "react";
import {
  Grid,
  Row,
  Col
} from "react-bootstrap";
import Button from "components/CustomButton/CustomButton.jsx";
import axios from 'axios';
import AuthService from "../../services/auth.service";
import {updated, success, deleted, created} from "../../variables/Codes.jsx";


class BloodRequest extends Component {
    state={
        bloodType: '0+',
        donorsContacted: ''
    }

    handleChangeType = event => {
        this.setState({bloodType : event.target.value});
    }

    dropdown() {
        const bloodTypes = ["0+","0-","A+","A-","B+","B-","AB+","AB-"];
        const options =[];
        bloodTypes.map( (element, key) => {options.push(<option key={key} value={element}>{element}</option>)});  
          return(
              <select onChange={this.handleChangeType}> 
              {options}
            </select>
          )
     }


     handleSubmit = event => {
       event.preventDefault();
        const url = 'http://localhost:3000/api/v1/facilities/'+AuthService.getCurrentFacilityCode()+"/require_blood";

        var r = window.confirm("Sicuro di voler confermare la richiesta?"); 
      if(r === true)
      {

        return axios.post(url, {"blood_type" : this.state.bloodType},{
          headers: {
            "x-access-token":AuthService.getCurrentToken()
          }})
          .then(res => {
            
            if(res.status === success)
            {
              alert("Richiesta inviata con successo!");
              this.setState({donorsContacted : res.data.data.donors_contacted});
            }
          }).catch(err => {
            alert(err.response.data.message);
          })
        }
    
      }

      contactedDonorsShow()
      {
        if(this.state.donorsContacted!== '')
        {
          return(
            <div>
              <h2>Sono stati contattati {this.state.donorsContacted} donatori!</h2>
            </div>
          )
        }
        else if(this.state.donorsContacted === 1)
        {
          return(
            <div>
              <h2>E' stato contattato {this.state.donorsContacted} donatore!</h2>
            </div>
          )
        }
      }

  render() {
    return (
      <div className="content">
         <Grid fluid>
          <Row>
            <Col md={8}></Col>
            <form onSubmit={this.handleSubmit} >
              <h3>Seleziona il gruppo sanguigno da richiedere: </h3>
                {this.dropdown()}
                <Button bsStyle="info" pullRight fill type="submit"> Invia Richiesta </Button>
            </form>

            {this.contactedDonorsShow()}

          </Row>
        </Grid>
          
      </div>
    );
  }
}

export default BloodRequest;