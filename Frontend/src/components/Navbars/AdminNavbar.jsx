import React, { Component } from "react";
import { Navbar } from "react-bootstrap";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarExists: false
    };
  }

  render() {
    return (
      <Navbar fluid>
        <Navbar.Header>
          <Navbar.Brand>
            {this.props.brandText}
          </Navbar.Brand>
          
        </Navbar.Header>
        
      </Navbar>
    );
  }
}

export default Header;
