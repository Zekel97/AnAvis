import React, { Component } from "react";
import { Grid, Row, Col, Table } from "react-bootstrap";
import Button from "components/CustomButton/CustomButton.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import Card from "components/Card/Card.jsx";
import { DocArray } from "variables/Variables.jsx";
import axios from "axios";
import AuthService from "../../services/auth.service";
import {updated, success, deleted, created} from "../../variables/Codes.jsx";


class Analista extends Component {
  state = {
    analists: [],
    create_analist:"",
    edit_analist: "",
    analistView: [],
    name:"",
    start_hour:"",
    end_hour:"",
    working_days:"",
    mail: "",
    password: "",
    user_id: ""
}

componentDidMount() {

  const url = 'http://localhost:3000/api/v1/analysts/';
  axios.get(url,{
    headers: {
      "x-access-token":AuthService.getCurrentToken()
    }})
  .then(response => response.data)
  .then((data) => {
      this.setState({ analists: data.data.analysts })
      })

}

creaNuovoAnalista = event => {
    this.setState({create_analist : true});
}

setDeleteId = event => {

    var r = window.confirm("Sicuro di voler confermare l'eliminazione?"); 
      if(r === true)
      {
          const url = 'http://localhost:3000/api/v1/analysts/'+event;

          return axios.delete(url,{
            headers: {
              "x-access-token":AuthService.getCurrentToken()
            }})
            .then(res => {
              if(res.status === deleted)
              {
                alert("Eliminato con successo!");
              }
            }).catch(err => {
              alert(err.response.data.message);
            })
            
      }

      window.location.reload(false);
}

setEditId = event => {
    this.setState({edit_analist : event});
    
    const url = 'http://localhost:3000/api/v1/analysts/'+event;

  axios.get(url,{
    headers: {
      "x-access-token":AuthService.getCurrentToken()
    }})
  .then(response => response.data)
  .then((data) => {
      this.setState({ analistView: data.data.analyst });

      this.setState({ name : this.state.analistView.name});
      this.setState({start_hour : data.data.analyst.start_hour});
      this.setState({end_hour : data.data.analyst.end_hour});
      this.setState({working_days : data.data.analyst.working_days});

      })
}

indietro = event => {
    this.setState({create_analist : null});
    this.setState({edit_analist : null});
}

editHandleSubmit = event => {


    const url = 'http://localhost:3000/api/v1/analysts/'+this.state.edit_analist;

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
      }).catch(err => {
        alert(err.response.data.message);
      })
    }
  }

  createHandleSubmit = event => {

    const url = 'http://localhost:3000/api/v1/analysts/';

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
        window.location.reload(false);
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
        {!this.state.edit_analist && !this.state.create_analist && <Grid fluid>
          <Row>
            <Col md={12}>
                <Button type="button" onClick={() => this.creaNuovoAnalista()}> Crea Analista</Button>
              <Card
                title="Lista Analisti"
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
                      {this.state.analists.map((prop, key) => {
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
                            <td>
                              
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

        {/* Modifica Analista */}
        {this.state.edit_analist && <Grid fluid>
          <Row>
            <Col md={15}>
                <Button type="button" onClick={() => this.indietro()}> Indietro</Button>
                <Card
                title="Visualizza Analista"
                content={
                  <form onSubmit={this.editHandleSubmit} >
                    <FormInputs
                      ncols={["col-md-6"]}
                      properties={[
                        {
                          label: "Nome Analista",
                          type: "text",
                          bsClass: "form-control",
                          defaultValue: this.state.analistView.name,
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
                          defaultValue: this.state.analistView.start_hour,
                          onChange: this.handleChangeStartHour
                        },
                        {
                          label: "End Hour",
                          type: "time",
                          bsClass: "form-control",
                          defaultValue: this.state.analistView.end_hour,
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
                
        { /* Crea Analista*/}
        {this.state.create_analist && <Grid fluid>
          <Row>
            <Col md={12}>
                <Button type="button" onClick={() => this.indietro()}> Indietro</Button>
                <Card
                title="Crea Analista"
                content={
                  <form onSubmit={this.createHandleSubmit} >
                    <FormInputs
                      ncols={["col-md-6", "col-md-6", "col-md-6"]}
                      properties={[
                        {
                          label: "Nome Analista",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: this.state.analistView.name,
                          onChange: this.handleChangeName
                        },
                        {
                          label: "Mail",
                          type: "email",
                          bsClass: "form-control",
                          placeholder: this.state.analistView.mail,
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
                          placeholder: "08:00",
                          onChange: this.handleChangeStartHour
                        },
                        {
                          label: "End Hour",
                          type: "time",
                          bsClass: "form-control",
                          placeholder: "12:00",
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

export default Analista;
