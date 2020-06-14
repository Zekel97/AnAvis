import React, { Component } from "react";
import { Grid, Row, Col, Table } from "react-bootstrap";
import Button from "components/CustomButton/CustomButton.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import Card from "components/Card/Card.jsx";
import { UserArray } from "variables/Variables.jsx";
import axios from "axios";
import AuthService from "../../services/auth.service";
import {updated, success, deleted, created} from "variables/Codes.jsx";

class Donatore extends Component {
  state = {
    users: [],
    selected_user:"",
    edit_user: "",
    userView: [],
    name: "",
    facility_code:"",
    mail: "",
    password: "",
    user_id: "",
    role: "",
    reset_password: ""
}

componentDidMount() {

  const url = 'http://localhost:3000/api/v1/users/';
  axios.get(url,{
    headers: {
      "x-access-token":AuthService.getCurrentToken()
    }})
  .then(response => response.data)
  .then((data) => {
      this.setState({ users: data.data.users })
      })

}

setEditId = event => {
    
    this.setState({edit_user : event});

    const urlSingolo = 'http://localhost:3000/api/v1/users/'+event;

    axios.get(urlSingolo, {
      headers: {
        "x-access-token":AuthService.getCurrentToken()
      }}).then(res => {
        this.setState({mail:res.data.data.user.mail});
        this.setState({role: res.data.data.user.role[0]});
      })

}

indietro = event => {
    this.setState({selected_user : null});
    this.setState({edit_user : null});

}

setResetPasswordId = event => {
  this.setState({reset_password: event});
}

editHandleSubmit = event => {

    const url = 'http://localhost:3000/api/v1/users/'+this.state.edit_user;
    
    var r = window.confirm("Sicuro di voler confermare la modifica?"); 
      if(r === true)
      {
    
    return axios.patch(url, {
      "mail": this.state.mail
    },{
      headers: {
        "x-access-token":AuthService.getCurrentToken()
      }})
      .then(res => {
        if(res.status === updated)
            {
              alert("Modifica effettuata con successo!");
            }
            window.location.reload(false);
      }).catch(err => {
        alert(err.response.data.message);
      })
      }

  }

  resetPasswordSubmit = event => {

    
    const url = 'http://localhost:3000/api/v1/users/'+event+"/reset";

    var r = window.confirm("Sicuro di voler confermare il reset della password?"); 
      if(r === true)
      {

    return axios.patch(url,{},{
      headers: {
        "x-access-token":AuthService.getCurrentToken()
      }})
      .then(res => {
        if(res.status === success)
            {
              alert("Reset effettuato con successo!");
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
  handleChangeFacility = event => {
    this.setState({facility_code : event.target.value});
  }
  handleChangeMail = event => {
    this.setState({mail : event.target.value});
  }
  handleChangePassword = event => {
    this.setState({password : event.target.value});
  }
  handleChangeRole = event => {
    this.setState({role: event.target.value});
  }

  render() {
    return (
      <div className="content">

        {/* Lista principale */}
        {!this.state.edit_user && <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="Lista Utenti"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <Table striped hover>
                    <thead>
                      <tr>
                        {
                          UserArray.map((prop, key) => {
                            return <th key={key}>{prop}</th>;
                          })
                        }
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.users.map((prop, key) => {
                        return (
                          <tr key={key}>
                            <td>
                                {
                                prop._id
                                }
                            </td>
                            <td>
                              {
                                prop.mail
                              }
                            </td>
                            <td>
                              {
                                prop.role[0]
                    
                              }
                            </td>
                            <td>
                                <Button type="button" onClick={() => this.resetPasswordSubmit(prop._id)}> Reset Password </Button>
                            </td>
                            <td>
                                <Button type="button" onClick={() => this.setEditId(prop._id)}> Modifica </Button>
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

        {/* Modifica User */}
        {this.state.edit_user && <Grid fluid>
          <Row>
            <Col md={12}>
                <Button type="button" onClick={() => this.indietro()}> Indietro</Button>
                <Card
                title="Modifica Utente"
                content={
                  <form onSubmit={this.editHandleSubmit} >
                    <FormInputs
                      ncols={["col-md-6"]}
                      properties={[
                        {
                          label: "Email",
                          type: "text",
                          bsClass: "form-control",
                          defaultValue: this.state.mail,
                          onChange: this.handleChangeMail
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
