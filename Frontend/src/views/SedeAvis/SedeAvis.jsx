import React, { Component } from "react";
import { Grid, Row, Col, Table } from "react-bootstrap";
import Button from "components/CustomButton/CustomButton.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import Card from "components/Card/Card.jsx";
import { SedeArray } from "variables/Variables.jsx";
import axios from "axios";
import AuthService from "../../services/auth.service";
import {updated, success, deleted, created} from "variables/Codes.jsx";

class SedeAvis extends Component {
  state = {
    sedi_avis: [],
    create_sede:"",
    edit_sede: "",
    sedeView: [],
    mail: "",
    password: "",
    name:""
}

componentDidMount() {

  const url = 'http://localhost:3000/api/v1/facilities/';
  axios.get(url,{
    headers: {
      "x-access-token":AuthService.getCurrentToken()
    }})
  .then(response => response.data)
  .then((data) => {
      console.log(data.data);
      this.setState({ sedi_avis: data.data.facilities })
      })

}

creaNuovaSede = event => {
    this.setState({create_sede : true});
}

setDeleteId = event => {

    var r = window.confirm("Sicuro di voler confermare l'eliminazione?"); 
      if(r === true)
      {
          const url = 'http://localhost:3000/api/v1/facilities/'+event;

          axios.delete(url,{
            headers: {
              "x-access-token":AuthService.getCurrentToken()
            }})
            .then(res => {

              console.log(res.status);

              if(res.status === deleted)
              {
                alert("Eliminato con successo!");
              }
              else
              {
                alert("Ops! C'è stato un errore!");
              }
            })   
            
      }
      window.location.reload(false);

}

setEditId = event => {
    this.setState({edit_sede : event});
    
    const url = 'http://localhost:3000/api/v1/facilities/'+event;

    axios.get(url,{
      headers: {
        "x-access-token":AuthService.getCurrentToken()
      }})
    .then(res => {
        this.setState({ sedeView: res.data.data.facility });
        this.setState({ name: res.data.data.facility.name});
        console.log(res.data.data.facility);
        })

}

indietro = event => {
    this.setState({create_sede : null});
    this.setState({edit_sede : null});

}

editHandleSubmit = event => {
  console.log(this.state.sedeView);
    const url = 'http://localhost:3000/api/v1/facilities/'+this.state.edit_sede;

    var r = window.confirm("Sicuro di voler confermare la modifica?"); 
      if(r === true)
      {

    axios.patch(url, {
      "name": this.state.name
    },{
      headers: {
        "x-access-token":AuthService.getCurrentToken()
      }})
      .then(res => {
        if(res.status === updated)
            {
              alert("Modifica effettuata con successo!");
            }
            else
            {
              alert("Ops! C'è stato un errore!");
            }
      })
    }
      window.location.reload(false);

  }

createHandleSubmit = event => {

    const url = 'http://localhost:3000/api/v1/facilities/';

    var r = window.confirm("Sicuro di voler confermare la creazione?"); 
      if(r === true)
      {

    axios.post(url, {
      "name":this.state.name,
      "mail": this.state.mail,
      "password":this.state.password
    },{
      headers: {
        "x-access-token":AuthService.getCurrentToken()
      }})
      .then(res => {
        if(res.status === created)
        {
          alert("Creato con successo!");
        }
        else
        {
          alert("Ops! C'è stato un errore!");
        }
      })
    }
      window.location.reload(false);

  }

  handleChangeMail = event => {
    this.setState( { mail : event.target.value});
  }
  handleChangePassword = event => {
    this.setState({ password : event.target.value});
  }
  handleChangeName = event => {
    this.setState( { name: event.target.value});
  }


  render() {
    return (
      <div className="content">

        {/* Lista principale */}
        {!this.state.edit_sede && !this.state.create_sede && <Grid fluid>
          <Row>
            <Col md={12}>
                <Button type="button" onClick={() => this.creaNuovaSede()}> Crea Sede</Button>
              <Card
                title="Sedi Avis"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <Table striped hover>
                    <thead>
                      <tr>
                        {
                          SedeArray.map((prop, key) => {
                            return <th key={key}>{prop}</th>;
                          })
                        }
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.sedi_avis.map((prop, key) => {
                        return (
                          <tr key={key}>
                            <td>
                              {
                                prop.name
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

        {/* Modifica Donatore */}
        {this.state.edit_sede && <Grid fluid>
          <Row>
            <Col md={12}>
                <Button type="button" onClick={() => this.indietro()}> Indietro</Button>
                <Card
                title="Edit Sede Avis"
                content={
                  <form onSubmit={this.editHandleSubmit} >
                    <FormInputs
                      ncols={["col-md-6"]}
                      properties={[
                        {
                          label: "Nome Sede",
                          type: "text",
                          bsClass: "form-control",
                          defaultValue: this.state.name,
                          onChange: this.handleChangeName
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
                
        { /* Crea Sede*/}
        {this.state.create_sede && <Grid fluid>
          <Row>
            <Col md={12}>
                <Button type="button" onClick={() => this.indietro()}> Indietro</Button>
                <Card
                title="Crea Sede Avis"
                content={
                  <form onSubmit={this.createHandleSubmit} >
                    <FormInputs
                      ncols={["col-md-6", "col-md-6", "col-md-6"]}
                      properties={[
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
                        },
                        {
                          label: "Nome Sede",
                          type: "text",
                          bsClass: "form-control",
                          onChange: this.handleChangeName
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

export default SedeAvis;
