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
import ReservationList from "views/Dottore/ReservationList.jsx";
import AvviaDonazione from "views/Dottore/AvviaDonazione.jsx";
import PrenotaDonazione from "views/Donatore/PrenotaDonazione.jsx";
import RegistraDonatoreNP from "views/Impiegato/RegistraDonatoreNP.jsx";
import CaricaReferto from "views/Analista/CaricaReferto.jsx";
import DonazioniAperte from "views/Analista/DonazioniAperte.jsx";
//ROUTE DEL CRUD
import Analista from "views/Analista/Analista.jsx";
import Donatore from "views/Donatore/Donatore.jsx";
import Dottore from "views/Dottore/Dottore.jsx";
import Impiegato from "views/Impiegato/Impiegato.jsx";
import SedeAvis from "views/SedeAvis/SedeAvis.jsx";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "pe-7s-graph",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/analista-crud",
    name: "Analista",
    icon: "pe-7s-next-2",
    component: Analista,
    layout: "/sede-avis"
  },
  {
    path: "/donatore-crud",
    name: "Donatore",
    icon: "pe-7s-next-2",
    component: Donatore,
    layout: "/impiegato"
  },
  {
    path: "/dottore-crud",
    name: "Dottore",
    icon: "pe-7s-next-2",
    component: Dottore,
    layout: "/sede-avis"
  },
  {
    path: "/impiegato-crud",
    name: "Impiegato",
    icon: "pe-7s-next-2",
    component: Impiegato,
    layout: "/sede-avis"
  },
  {
    path: "/sede-avis-crud",
    name: "Sede Avis",
    icon: "pe-7s-next-2",
    component: SedeAvis,
    layout: "/avis"
  },
  {
    path: "/prenota-donazione",
    name: "Prenota Donazione",
    icon: "pe-7s-next-2",
    component: PrenotaDonazione,
    layout: "/donatore"
  },
  {
    path: "/donazioni-aperte",
    name: "Donazioni Aperte",
    icon: "pe-7s-angle-up-circle",
    component: DonazioniAperte,
    layout: "/analista"
  },
  {
    path: "/carica-referto",
    name: "Carica Referto",
    icon: "pe-7s-refresh-2",
    component: CaricaReferto,
    layout: "/analista"
  },
  {
    path: "/avvia-donazione",
    name: "Avvia Donazione",
    icon: "pe-7s-share",
    component: AvviaDonazione,
    layout: "/doctor"
  },
  {
    path: "/registra-donatore",
    name: "Registra Donatore NP",
    icon: "pe-7s-user",
    component: RegistraDonatoreNP,
    layout: "/impiegato"
  },
  {
    path: "/reservations",
    name: "Reservation List",
    icon: "pe-7s-eyedropper",
    component: ReservationList,
    layout: "/doctor"
  }
];

export default dashboardRoutes;
