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
import Dashboard from "views/Dashboard.jsx";
import ReservationList from "views/ReservationList.jsx";
import PrenotaDonazione from "views/PrenotaDonazione.jsx";
import RegistraDonatoreNP from "views/RegistraDonatoreNP.jsx";
import AvviaDonazione from "views/AvviaDonazione.jsx";
import CaricaReferto from "views/CaricaReferto.jsx";
import DonazioniAperte from "views/DonazioniAperte.jsx";


const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "pe-7s-graph",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/prenota-donazione",
    name: "Prenota Donazione",
    icon: "pe-7s-next-2",
    component: PrenotaDonazione,
    layout: "/admin"
  },
  {
    path: "/donazioni-aperte",
    name: "Donazioni Aperte",
    icon: "pe-7s-angle-up-circle",
    component: DonazioniAperte,
    layout: "/admin"
  },
  {
    path: "/carica-referto",
    name: "Carica Referto",
    icon: "pe-7s-refresh-2",
    component: CaricaReferto,
    layout: "/admin"
  },
  {
    path: "/avvia-donazione",
    name: "Avvia Donazione",
    icon: "pe-7s-share",
    component: AvviaDonazione,
    layout: "/admin"
  },
  {
    path: "/registra-donatore",
    name: "Registra Donatore NP",
    icon: "pe-7s-user",
    component: RegistraDonatoreNP,
    layout: "/admin"
  },
  {
    path: "/reservations",
    name: "Reservation List",
    icon: "pe-7s-eyedropper",
    component: ReservationList,
    layout: "/admin"
  }
];

export default dashboardRoutes;
