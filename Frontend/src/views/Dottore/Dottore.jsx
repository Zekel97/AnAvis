import React, { Component } from "react";
import { Grid, Row, Col, Table } from "react-bootstrap";
import Button from "components/CustomButton/CustomButton.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import Card from "components/Card/Card.jsx";
import { DocArray } from "variables/Variables.jsx";
import axios from "axios";
import AuthService from "../../services/auth.service";
import {updated, success, deleted, created} from "variables/Codes.jsx";

class Dottore extends Component {
  state = {
    doctors: [],
    create_doctor:"",
    edit_doctor: "",
    doctorView: [],
    name:"",
    start_hour:"",
    end_hour:"",
    working_days:"",
    mail: "",
    password: ""
}

componentDidMount() {

  const url = 'http://localhost:3000/api/v1/doctors/';
  axios.get(url,{
    headers: {
      "x-access-token":AuthService.getCurrentToken()
    }})
  .then(response => response.data)
  .then((data) => {
      this.setState({ doctors: data.data.doctors })
      })

}

creaNuovoDoctor = event => {
    this.setState({create_doctor : true});
}

setDeleteId = event => {

    var r = window.confirm("Sicuro di voler confermare l'eliminazione?"); 
      if(r === true)
      {
          const url = 'http://localhost:3000/api/v1/doctors/'+event;

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
    this.setState({edit_doctor : event});
    
    const url = 'http://localhost:3000/api/v1/doctors/'+event;

  axios.get(url,{
    headers: {
      "x-access-token":AuthService.getCurrentToken()
    }})
  .then(response => response.data)
  .then((data) => {
      this.setState({ doctorView: data.data.doctor });

      this.setState({ name : data.data.doctor.name});
      this.setState({start_hour : data.data.doctor.start_hour});
      this.setState({end_hour : data.data.doctor.end_hour});
      this.setState({working_days : data.data.doctor.working_days});
      this.setState({mail: data.data.doctor.mail});
      })

}

indietro = event => {
    this.setState({create_doctor : null});
    this.setState({edit_doctor : null});

}

editHandleSubmit = event => {


    const url = 'http://localhost:3000/api/v1/doctors/'+this.state.edit_doctor;

    var r = window.confirm("Sicuro di voler confermare la modifica?"); 
      if(r === true)
      {

    return axios.patch(url, {
      "name": this.state.name,
      "start_hour": this.state.start_hour,
      "end_hour": this.state.end_hour, 
      "working_days": this.state.working_days
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


    const url = 'http://localhost:3000/api/v1/doctors/';

    var r = window.confirm("Sicuro di voler confermare la creazione?"); 
      if(r === true)
      {

    return axios.post(url, {
      "name": this.state.name,
      "start_hour": this.state.start_hour,
      "end_hour": this.state.end_hour, 
      "working_days": this.state.working_days,
      "mail": this.state.mail,
      "password": this.state.password
    },{
      headers: {
        "x-access-token":AuthService.getCurrentToken()
      }})
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

  handleChangeName = event => {
    this.setState({name : event.target.value});
  }
  handleChangeStartHour = event => {
    this.setState({start_hour : event.target.value});
  }
  handleChangeEndHour = event => {
    this.setState({end_hour : event.target.value});
  }
  handleChangeMail = event => {
    this.setState({mail : event.target.value});
  }
  handleChangePassword = event => {
    this.setState({password : event.target.value});
  }
  handleChange = event => {
    var options = event.target.options;
    var value = [];
    for (var i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
  
    this.setState({working_days : value});
  }

  render() {
    return (
      <div className="content">

        {/* Lista principale */}
        {!this.state.edit_doctor && !this.state.create_doctor && <Grid fluid>
          <Row>
            <Col md={12}>
                <Button type="button" onClick={() => this.creaNuovoDoctor()}> Crea Dottore</Button>
              <Card
                title="Lista Dottori"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <Table striped hover>
                    <thead>
                      <tr>
                        {
                          DocArray.map((prop, key) => {
                            return <th key={key}>{prop}</th>;
                          })
                        }
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.doctors.map((prop, key) => {
                        return (
                          <tr key={key}>

                            <td>
                              {
                                prop.name
                              }
                            </td>
                            <td>
                              {
                                prop.start_hour
                                
                              }
                            </td>
                            <td>
                              {
                                prop.end_hour
                              }
                            </td>
                            <td>
                              {
                                prop.working_days.toString()
                              }
                            </td>
                            <td>
                                <Button type="button" onClick={() => this.setEditId(prop._id)}> Visualizza </Button>
                                <Button type="button" onClick={() => this.setDeleteId(prop._id)}> Delete </Button>
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

        {/* Modifica Doctor */}
        {this.state.edit_doctor && <Grid fluid>
          <Row>
            <Col md={12}>
                <Button type="button" onClick={() => this.indietro()}> Indietro</Button>
                <Card
                title="Visualizza Dottore"
                content={
                  <form onSubmit={this.editHandleSubmit} >
                    <FormInputs
                      ncols={["col-md-6"]}
                      properties={[
                        {
                          label: "Nome Dottore",
                          type: "text",
                          bsClass: "form-control",
                          defaultValue: this.state.doctorView.name,
                          onChange: this.handleChangeName
                        }
                      ]}
                    />
                    <FormInputs
                      ncols={["col-md-6", "col-md-6"]}
                      properties={[
                        {
                          label: "Start Hour",
                          type: "time",
                          bsClass: "form-control",
                          defaultValue: this.state.doctorView.start_hour,
                          onChange: this.handleChangeStartHour
                        },
                        {
                          label: "End Hour",
                          type: "time",
                          bsClass: "form-control",
                          defaultValue: this.state.doctorView.end_hour,
                          onChange: this.handleChangeEndHour
                        }
                      ]}
                    />
                    
                    <p>Working days: <strong>attuali: {this.state.working_days.toString()}</strong></p>
                    <select multiple={true} value={this.props.arrayOfOptionValues} onChange={this.handleChange}>
                    <option value={"lunedì"}>Lunedì</option>
                    <option value={"martedì"}>Martedì</option>
                    <option value={"mercoledì"}>Mercoledì</option>
                    <option value={"giovedì"}>Giovedì</option>
                    <option value={"venerdì"}>Venerdì</option>
                    <option value={"sabato"}>Sabato</option>
                    <option value={"domenica"}>Domenica</option>
                  </select>

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
                
        { /* Crea Doctor*/}
        {this.state.create_doctor && <Grid fluid>
          <Row>
            <Col md={12}>
                <Button type="button" onClick={() => this.indietro()}> Indietro</Button>
                <Card
                title="Crea Dottore"
                content={
                  <form onSubmit={this.createHandleSubmit} >
                    <FormInputs
                      ncols={["col-md-6", "col-md-6", "col-md-6"]}
                      properties={[
                        {
                          label: "Nome Dottore",
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
                    <FormInputs
                      ncols={["col-md-6", "col-md-6"]}
                      properties={[
                        {
                          label: "Start Hour",
                          type: "time",
                          bsClass: "form-control",
                          onChange: this.handleChangeStartHour
                        },
                        {
                          label: "End Hour",
                          type: "time",
                          bsClass: "form-control",
                          onChange: this.handleChangeEndHour
                        }
                      ]}
                    />

<select multiple={true} value={this.props.arrayOfOptionValues} onChange={this.handleChange}>
                    <option value={"lunedì"}>Lunedì</option>
                    <option value={"martedì"}>Martedì</option>
                    <option value={"mercoledì"}>Mercoledì</option>
                    <option value={"giovedì"}>Giovedì</option>
                    <option value={"venerdì"}>Venerdì</option>
                    <option value={"sabato"}>Sabato</option>
                    <option value={"domenica"}>Domenica</option>
                  </select>
                    
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

export default Dottore;
