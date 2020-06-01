import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/sass/light-bootstrap-dashboard-react.scss?v=1.3.0";
import "./assets/css/demo.css";
import "./assets/css/pe-icon-7-stroke.css";

import DoctorLayout from "layouts/Doctor.jsx";
import AnalistaLayout from "layouts/Analista.jsx";
import AvisLayout from "layouts/Avis.jsx";
import DonorLayout from "layouts/Donor.jsx";
import ImpiegatoLayout from "layouts/Impiegato.jsx";
import SedeAvisLayout from "layouts/SedeAvis.jsx";
import NotAuthLayout from "layouts/NotAuth.jsx";


ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/doctor" render={props => <DoctorLayout {...props} />} />
      <Route path="/analyst" render={props => <AnalistaLayout {...props} />} />
      <Route path="/avis" render={props => <AvisLayout {...props} />} />
      <Route path="/donor" render={props => <DonorLayout {...props} />} />
      <Route path="/employee" render={props => <ImpiegatoLayout {...props} />} />
      <Route path="/facility" render={props => <SedeAvisLayout {...props} />} />
      <Route path="/notauth" render={props => <NotAuthLayout {...props} />} />
      <Redirect from="/" to="/notauth/login" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
