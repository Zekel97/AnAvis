import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Button from "components/CustomButton/CustomButton.jsx";

import AdminNavbarLinks from "../Navbars/AdminNavbarLinks.jsx";

import logo from "assets/img/logo.png";

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_role: "/admin",
      width: window.innerWidth
    };
  }
  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }
  updateDimensions() {
    this.setState({ width: window.innerWidth });
  }
  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }

  changeToAnalista()
  {
    this.setState({user_role : "/analista"});
  }
  changeToDonatore()
  {
    this.setState({user_role : "/donatore"});
  }
  changeToDottore()
  {
    this.setState({user_role : "/doctor"});
  }
  changeToImpiegato()
  {
    this.setState({user_role : "/impiegato"});
  }
  changeToSedeAvis()
  {
    this.setState({user_role : "/sede-avis"});
  }
  changeToAvis()
  {
    this.setState({user_role : "/avis"});
  }
  

  render() {
    const sidebarBackground = {
      backgroundImage: "url(" + this.props.image + ")"
    };
    return (
      <div
        id="sidebar"
        className="sidebar"
        data-color={this.props.color}
        data-image={this.props.image}
      >
          {this.props.hasImage ? (
            <div className="sidebar-background" style={sidebarBackground} />
          ) : (
            null
          )}
        <div className="logo">
          <a
            className="simple-text logo-mini"
          >
            <div className="logo-img">
              <img src={logo} alt="logo_image" />
            </div>
          </a>
          <a
           
            className="simple-text logo-normal"
          >
            AnAvis
          </a>
        </div>
        <div className="sidebar-wrapper">
          <ul className="nav">
            {this.state.width <= 991 ? <AdminNavbarLinks /> : null}
            <Button type="button" onClick={() => this.changeToAnalista()}> Analista </Button>
            <Button type="button" onClick={() => this.changeToDonatore()}> Donatore </Button>
            <Button type="button" onClick={() => this.changeToDottore()}> Dottore </Button>
            <Button type="button" onClick={() => this.changeToImpiegato()}> Impiegato </Button>
            <Button type="button" onClick={() => this.changeToSedeAvis()}> Sede Avis </Button>
            <Button type="button" onClick={() => this.changeToAvis()}>Avis </Button>
            {this.props.routes.map((prop, key) => {
              if (!prop.redirect && prop.layout=== this.state.user_role)
              {
                
                return (
                  <li
                    className={
                      prop.upgrade
                        ? "active active-pro"
                        : this.activeRoute(prop.layout + prop.path)
                    }
                    key={key}
                  >
                    <NavLink
                      to={prop.layout + prop.path}
                      className="nav-link"
                      activeClassName="active"
                    >
                      <i className={prop.icon} />
                      <p>{prop.name}</p>
                    </NavLink>
                  </li>
                );}
              return null;
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default Sidebar;
