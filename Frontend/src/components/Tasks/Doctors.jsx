import React, { Component } from 'react';
import axios from 'axios';
const API_URL = 'http://jsonplaceholder.typicode.com';

class Doctors extends Component {
  state = {
    doctors: []
  }
  componentDidMount() {
    const url = `localhost:3000/api/v1/doctors/`;
    axios.get(url).then(response => response.data)
    .then((data) => {
      this.setState({ doctors: data })
      console.log(this.state.doctors)
     })
  }
  // [...]
}
export default Doctors;