import React, { Component } from "react";
import { Grid, Row, Col, Table } from "react-bootstrap";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import Card from "components/Card/Card.jsx";
import { ResArray } from "variables/Variables.jsx";
import axios from "axios";
import AuthService from "../../services/auth.service";
import Button from "components/CustomButton/CustomButton.jsx";
import authService from "../../services/auth.service";


class ReservationList extends Component {
  state = {
    reservations: [],
    date: 0,
    choosenDate: ''
}

componentDidMount() {
  const url = 'http://localhost:3000/api/v1/facilities/'+authService.getCurrentFacilityCode()+'/reservations/';
  axios.get(url,{
    headers: {
      "x-access-token":AuthService.getCurrentToken()
    }})
  .then(response => response.data)
  .then((data) => {
      if(data.data.reservations.length === 0)
      {
        this.setState({ date: "none"});
      }
      else{
        this.setState({ reservations: data.data.reservations })
        this.setState({ date: "TUTTE"})
      }
      })
  .catch(function (error) {
    
    console.log(error);
  })

}

handleChangeDate = event => {
  const date = event.target.value;
  this.setState({ choosenDate: date });
}

handleUpdateTable = event => {
  event.preventDefault();
  const url = 'http://localhost:3000/api/v1/facilities/'+authService.getCurrentFacilityCode()+'/reservations/'+this.state.choosenDate;

  axios.get(url,{
    headers: {
      "x-access-token":AuthService.getCurrentToken()
    }})
  .then(response => response.data)
  .then((data) => {
      if(data.data.reservations.length === 0)
      {
        this.setState({ date: this.state.choosenDate});
        this.setState({reservations: []});
      }
      else{
        this.setState({ reservations: data.data.reservations })
        this.setState({ date: data.data.reservations[0].date})
      }
      })
  .catch(function (error) {
    console.log(error.message);
  })
}
urlify(url_part)
{
  let url = "http://localhost:3000/";
  url = url + url_part;
  return url;
}


  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>

                <form onSubmit={this.handleUpdateTable} >
                    <FormInputs
                      ncols={["col-md-3"]}
                      properties={[
                        {
                          label: "Date",
                          type: "Date",
                          bsClass: "form-control",
                          onChange: this.handleChangeDate
                        }
                      ]}
                    />
                    <Button bsStyle="info" pullRight fill type="submit">
                      Aggiorna
                    </Button>
                </form>

            <Col md={12}>
              <Card
                title={"Prenotazioni - "+this.state.date}
                ctTableFullWidth
                ctTableResponsive
                content={

                <div>
                  <Table striped hover>
                    <thead>
                      <tr>
                        {
                          ResArray.map((prop, key) => {
                            return <th key={key}>{prop}</th>;
                          })
                        }
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.reservations.map((prop, key) => {
                        return (
                          <tr key={key}>
                            <td>
                              {
                                prop._id
                              }
                            </td>
                            <td>
                              {
                                prop.donor_id
                              }
                            </td>
                            <td>
                              {
                                prop.slot
                              }
                            </td>
                            <td>
                              {
                                prop.date
                              }
                            </td>  
                            <td>
                              <a href={this.urlify(prop.module_path)} target="_blank">MODULO</a>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                  </div>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default ReservationList;
