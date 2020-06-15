import React, { Component } from "react";
import { Grid, Row, Col, Table } from "react-bootstrap";
import Button from "components/CustomButton/CustomButton.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import Card from "components/Card/Card.jsx";
import { DonatoreArray } from "variables/Variables.jsx";
import axios from "axios";
import AuthService from "../../services/auth.service";
import {updated, success, deleted} from "../../variables/Codes.jsx";
import { created } from "variables/Codes";
import moment from 'moment';

class Donatore extends Component {
  state = {
    donors: [],
    create_donor:"",
    edit_donor: "",
    donorView: [],
    name: "",
    last_donation_date: "",
    blood_group: "0+",
    facility_code:"",
    mail: "",
    password: "",
    user_id: ""
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

creaNuovoDonor = event => {
    this.setState({create_donor : true});
}

convertDate(date)
{
  const newDate = moment(date).format("DD.MM. h:mm");
  return date;
}

setDeleteId = event => {
  
    var r = window.confirm("Sicuro di voler confermare l'eliminazione?"); 
      if(r === true)
      {
          const url = 'http://localhost:3000/api/v1/donors/'+event;

          return axios.delete(url,{
            headers: {
              "x-access-token":AuthService.getCurrentToken()
            }})
            .then(res => {
            if(res.status === deleted)
            {
              alert("Eliminato con successo!");
            }
            window.location.reload(false);
            }).catch(err => {
              alert(err.response.data.message);
            })
            
      }

      
}


setEditId = event => {
    
    this.setState({edit_donor : event});
    
    const url = 'http://localhost:3000/api/v1/donors/'+event;
    
  axios.get(url,{
    headers: {
      "x-access-token":AuthService.getCurrentToken()
    }})
  .then(response => response.data)
  .then((data) => {
      this.setState({ donorView: data.data.donor })
      this.setState({user_id: event});
      this.setState({name: data.data.donor.name});
      this.setState({blood_group: data.data.donor.blood_group});
      })

}

indietro = event => {
    this.setState({selected_donor : null});
    this.setState({create_donor : null});
    this.setState({edit_donor : null});

}

editHandleSubmit = event => {

    const url = 'http://localhost:3000/api/v1/donors/'+this.state.user_id;

    var r = window.confirm("Sicuro di voler confermare la modifica?"); 
      if(r === true)
      {

      return axios.patch(url, {
        "name": this.state.name,
        "blood_group": this.state.blood_group
      },{
        headers: {
          "x-access-token":AuthService.getCurrentToken()
        }})
        .then(res => {
          if(res.status === updated)
              {
                alert("Modificato con successo!");
              }
              window.location.reload(false);
        }).catch(err => {
          alert(err.response.data.message);
        })
    
      
    }
  }

createHandleSubmit = event => {
    const url = 'http://localhost:3000/api/v1/donors/';
    var r = window.confirm("Sicuro di voler confermare la creazione?"); 
    
    if(r)
    {
      return axios.post(url, {
        "name": this.state.name,
        "blood_group": this.state.blood_group, 
        "facility_code": AuthService.getCurrentFacilityCode(),
        "mail": this.state.mail,
        "password": this.state.password
      },{
        headers: {
          "x-access-token":AuthService.getCurrentToken()
        }
      })
        .then(res => {

          if(res.status === created)
              {
                alert("Creato con successo!");
              }
              window.location.reload(false);
        }).catch(err => {
          alert(err.response.data.message);
        })
    }
  }

  dropdown() {
    const bloodTypes = ["0+","0-","A+","A-","B+","B-","AB+","AB-"];
    const options =[];
    bloodTypes.map( (element, key) => {options.push(<option key={key} value={element}>{element}</option>)});  
      return(
          <select onChange={this.handleChangeBloodG}> 
          {options}
        </select>
      )
 }

  handleChangeName = event => {
    this.setState({name : event.target.value});
  }
  handleChangeLDD = event => {
    this.setState({last_donation_date : event.target.value});
  }
  handleChangeBloodG = event => {
    this.setState({blood_group : event.target.value});
  }
  handleChangeFacility = event => {
    this.setState({facility_code : event.target.value});
  }
  handleChangeMail = event => {
    this.setState({mail : event.target.value});
  }
  handleChangePassword = event => {
    this.setState({password : event.target.value});
  }

  render() {
    return (
      <div className="content">

        {/* Lista principale */}
        {!this.state.edit_donor && !this.state.create_donor && <Grid fluid>
          <Row>
            <Col md={12}>
                <Button type="button" onClick={() => this.creaNuovoDonor()}> Crea Donatore</Button>
              <Card
                title="Lista Donatori"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <Table striped hover>
                    <thead>
                      <tr>
                        {
                          DonatoreArray.map((prop, key) => {
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
                                prop.last_donation_date ? moment(prop.last_donation_date).format("DD/MM/YYYY") : "Non ancora donato"
                              }
                            </td>
                            <td>
                                <Button type="button" onClick={() => this.setDeleteId(prop._id)}> Delete </Button>
                            </td>
                            <td>
                                <Button type="button" onClick={() => this.setEditId(prop._id)}> Visualizza </Button>
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

        {/* Modifica Donatore */}
        {this.state.edit_donor && <Grid fluid>
          <Row>
            <Col md={12}>
                <Button type="button" onClick={() => this.indietro()}> Indietro</Button>
                <Card
                title="Visualizza Donatore"
                content={
                  <form onSubmit={this.editHandleSubmit} >
                    <FormInputs
                      ncols={["col-md-6"]}
                      properties={[
                        {
                          label: "Nome Donatore",
                          type: "text",
                          bsClass: "form-control",
                          defaultValue: this.state.donorView.name,
                          onChange: this.handleChangeName
                        }
                      ]}
                    />
                    <p>Gruppo Sanguigno: <strong>attuale: {this.state.blood_group}</strong></p>
                    {this.dropdown()}

                    
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
                
        { /* Crea Donatore*/}
        {this.state.create_donor && <Grid fluid>
          <Row>
            <Col md={12}>
                <Button type="button" onClick={() => this.indietro()}> Indietro</Button>
                <Card
                title="Crea Donatore"
                content={
                  <form onSubmit={this.createHandleSubmit} >
                    <FormInputs
                      ncols={["col-md-6", "col-md-6", "col-md-6"]}
                      properties={[
                        {
                          label: "Nome Donatore",
                          type: "text",
                          bsClass: "form-control",
                          onChange: this.handleChangeName
                        },
                        {
                          label: "Mail",
                          type: "email",
                          bsClass: "form-control",
                          onChange: this.handleChangeMail
                        },
                        {
                          label: "Password",
                          type: "password",
                          bsClass: "form-control",
                          onChange: this.handleChangePassword
                        }
                      ]}
                    />
                    
                    <p>Gruppo Sanguigno: </p>
                    {this.dropdown()}

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

export default Donatore;
