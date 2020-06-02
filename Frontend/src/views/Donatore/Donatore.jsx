import React, { Component } from "react";
import { Grid, Row, Col, Table } from "react-bootstrap";
import Button from "components/CustomButton/CustomButton.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import Card from "components/Card/Card.jsx";
import { DonArray } from "variables/Variables.jsx";
import axios from "axios";
import AuthService from "../../services/auth.service";

class Donatore extends Component {
  state = {
    donors: [],
    create_donor:"",
    edit_donor: "",
    donorView: [],
    name: "",
    last_donation_date: "",
    blood_group: "",
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
      console.log(this.state.donors)
      })

}

creaNuovoDonor = event => {
    this.setState({create_donor : true});
    //appare form creazione donor
}

setDeleteId = event => {

    var r = window.confirm("Sicuro di voler confermare l'eliminazione?"); 
      if(r === true)
      {
          const url = 'http://localhost:3000/api/v1/donors/'+event;

          axios.delete(url,{
            headers: {
              "x-access-token":AuthService.getCurrentToken()
            }})
            .then(res => {
              console.log(res);
              console.log(res.data);
            })   
            
        console.log("ELIMINATO ID : "+event);
      }
      window.location.reload(false);
}

setEditId = event => {
    console.log(event);
    
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
    console.log("Indietro");
    this.setState({selected_donor : null});
    this.setState({create_donor : null});
    this.setState({edit_donor : null});

    //resetto tutti i campi
}

editHandleSubmit = event => {

    console.log(event.target.value);
    const url = 'http://localhost:3000/api/v1/donors/'+this.state.user_id;

    console.log(this.state.blood_group);
    axios.patch(url, {
      "name": this.state.name,
      "blood_group": this.state.blood_group
    },{
      headers: {
        "x-access-token":AuthService.getCurrentToken()
      }})
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
    
      window.location.reload(false);

  }

createHandleSubmit = event => {
    //CREA Donatore

    const url = 'http://localhost:3000/api/v1/donors/';

    axios.post(url, {
      "name": this.state.name,
      "blood_group": this.state.blood_group, 
      "facility_code": AuthService.getCurrentFacilityCode(),
      "mail": this.state.mail,
      "password": this.state.password
    },{
      headers: {
        "x-access-token":AuthService.getCurrentToken()
      }})
      .then(res => {
        console.log(res);
        console.log(res.data);
      })

      window.location.reload(false);
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
                                prop._id
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
                title="Edit Profile"
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
                    <FormInputs
                      ncols={["col-md-6"]}
                      properties={[
                        {
                          label: "Blood Group",
                          type: "text",
                          bsClass: "form-control",
                          defaultValue: this.state.donorView.blood_group,
                          onChange: this.handleChangeBloodG
                        }
                      ]}
                    />
                    
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
                title="Edit Profile"
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
                          type: "text",
                          bsClass: "form-control",
                          onChange: this.handleChangePassword
                        }
                      ]}
                    />
                    <FormInputs
                      ncols={["col-md-6"]}
                      properties={[
                        {
                          label: "Blood Group",
                          type: "text",
                          bsClass: "form-control",
                          onChange: this.handleChangeBloodG
                        }
                      ]}
                    />
                    
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
