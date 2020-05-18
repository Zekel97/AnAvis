import React, { Component } from "react";
import { Grid, Row, Col, Table } from "react-bootstrap";
import Button from "components/CustomButton/CustomButton.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import Card from "components/Card/Card.jsx";
import { SedeArray } from "variables/Variables.jsx";
import axios from "axios";

class SedeAvis extends Component {
  state = {
    sedi_avis: [],
    create_sede:"",
    edit_sede: "",
    sedeView: [],
    nome: ""
}

componentDidMount() {

  const url = 'http://localhost:3000/api/v1/facilities/';
  axios.get(url)
  .then(response => response.data)
  .then((data) => {
      console.log(data.data);
      this.setState({ sedi_avis: data.data.facilities })
      })

}

creaNuovaSede = event => {
    this.setState({create_sede : true});
    //appare form creazione donor
}

setDeleteId = event => {

    var r = window.confirm("Sicuro di voler confermare l'eliminazione?"); 
      if(r === true)
      {
          const url = 'http://localhost:3000/api/v1/facilities/'+event;

          axios.delete(url)
            .then(res => {
              console.log(res);
              console.log(res.data);
            })   
            
        console.log("ELIMINATO ID : "+event);
      }
}

setEditId = event => {
    console.log("modifica id");
    
    this.setState({edit_sede : event});
    
    const url = 'http://localhost:3000/api/v1/facilities/'+event;
    console.log(url);
  axios.get(url)
  .then(response => response.data)
  .then((data) => {
      this.setState({ sedeView: data.data.facility })
      console.log(this.state.sedeView)
      })

}

indietro = event => {
    console.log("Indietro");
    this.setState({create_sede : null});
    this.setState({edit_sede : null});

    //resetto tutti i campi
}

editHandleSubmit = event => {

  //TODO
    //invio i dati MODIFICATI
    //regolare PATCH
    const data = {
      name: this.state.name
    };

    const url = 'http://localhost:3000/api/v1/facilities/'+this.state.edit_sede;

    console.log(url);

    axios.patch(url, {
      "name": this.state.name
    })
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
  }

createHandleSubmit = event => {
    //CREA Sede Avis

    const data = {
      name: this.state.name
    };

    const url = 'http://localhost:3000/api/v1/facilities/';

    console.log(data);

    axios.post(url, {
      "name": this.state.name
    })
      .then(res => {
        console.log(res);
        console.log(res.data);
      })

      window.location.reload(false);

  }

  handleChangeName = event => {
    this.setState( { name : event.target.value});
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
                                prop._id
                                }
                            </td>
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
                          defaultValue: this.state.sedeView.name,
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
                
        { /* Crea Donatore*/}
        {this.state.create_sede && <Grid fluid>
          <Row>
            <Col md={12}>
                <Button type="button" onClick={() => this.indietro()}> Indietro</Button>
                <Card
                title="Crea Sede Avis"
                content={
                  <form onSubmit={this.createHandleSubmit} >
                    <FormInputs
                      ncols={["col-md-6"]}
                      properties={[
                        {
                          label: "Nome Sede",
                          type: "text",
                          bsClass: "form-control",
                          defaultValue: "Mike",
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
