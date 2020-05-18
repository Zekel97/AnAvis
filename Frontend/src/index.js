/*!

=========================================================
* Light Bootstrap Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/sass/light-bootstrap-dashboard-react.scss?v=1.3.0";
import "./assets/css/demo.css";
import "./assets/css/pe-icon-7-stroke.css";

import DoctorLayout from "layouts/Doctor.jsx";
import AdminLayout from "layouts/Admin.jsx";
import AnalistaLayout from "layouts/Analista.jsx";
import AvisLayout from "layouts/Avis.jsx";
import DonatoreLayout from "layouts/Donatore.jsx";
import ImpiegatoLayout from "layouts/Impiegato.jsx";
import SedeAvisLayout from "layouts/SedeAvis.jsx";


ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/admin" render={props => <AdminLayout {...props} />} />
      <Route path="/doctor" render={props => <DoctorLayout {...props} />} />
      <Route path="/analista" render={props => <AnalistaLayout {...props} />} />
      <Route path="/avis" render={props => <AvisLayout {...props} />} />
      <Route path="/donatore" render={props => <DonatoreLayout {...props} />} />
      <Route path="/impiegato" render={props => <ImpiegatoLayout {...props} />} />
      <Route path="/sede-avis" render={props => <SedeAvisLayout {...props} />} />
      <Redirect from="/" to="/admin/dashboard" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
