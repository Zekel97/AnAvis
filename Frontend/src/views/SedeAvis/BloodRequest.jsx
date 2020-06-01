import React, { Component } from "react";
import {
  Grid,
  Row,
  Col
} from "react-bootstrap";
import Button from "components/CustomButton/CustomButton.jsx";
import axios from 'axios';
import AuthService from "../../services/auth.service";

class BloodRequest extends Component {
    state={
        bloodType: ''
    }

    handleChangeType = event => {
        console.log(event.target.value);
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
        const url = 'http://localhost:3000/api/v1/facilities/'+AuthService.getCurrentFacilityCode()+"/require_blood";
        const urlfake = '';

        axios.post(url, {"bloodType" : this.state.bloodType},{
          headers: {
            "x-access-token":AuthService.getCurrentToken()
          }})
          .then(res => {
            console.log(res.status);
            console.log(res.data);
          })
    
          window.location.reload(false);
          
      }

  render() {
    return (
      <div className="content">
         <Grid fluid>
          <Row>
            <Col md={8}></Col>
            <form onSubmit={this.handleSubmit} >
                {this.dropdown()}
                <Button bsStyle="info" pullRight fill type="submit"> Invia Richiesta </Button>
            </form>


          </Row>
        </Grid>
          
      </div>
    );
  }
}

export default BloodRequest;