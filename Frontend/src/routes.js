import Dashboard from "views/Dashboard.jsx";
import UserPage from "views/UserPage.jsx";

import ReservationList from "views/Dottore/ReservationList.jsx";
import ReservationListEmployee from "views/Impiegato/ReservationListEmployee.jsx";
import AvviaDonazione from "views/Dottore/AvviaDonazione.jsx";
import PrenotaDonazione from "views/Donatore/PrenotaDonazione.jsx";
import RegistraDonatoreNP from "views/Impiegato/RegistraDonatoreNP.jsx";
import CaricaReferto from "views/Analista/CaricaReferto.jsx";
import DonazioniAperte from "views/Analista/DonazioniAperte.jsx";

import Login from "views/Authentication/Login.jsx";
import Logout from "views/Authentication/Logout.jsx";
import BloodRequest from "views/SedeAvis/BloodRequest.jsx";
import StatisticheAvis from "views/Avis/StatisticheAvis.jsx";
//ROUTE DEL CRUD
import Analista from "views/Analista/Analista.jsx";
import Donatore from "views/Donatore/Donatore.jsx";
import Dottore from "views/Dottore/Dottore.jsx";
import Impiegato from "views/Impiegato/Impiegato.jsx";
import SedeAvis from "views/SedeAvis/SedeAvis.jsx";
import Users from "views/Utenti/Users.jsx";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "pe-7s-graph",
    component: Dashboard,
    layout: "/notauth"
  },
  {
    path: "/gestione-utenti",
    name: "Gestione Utenti",
    icon: "pe-7s-graph",
    component: Users,
    layout: "/admin"
  },
  {
    path: "/userpage",
    name: "User Page",
    icon: "pe-7s-graph",
    component: UserPage,
    layout: "/admin"
  },
  {
    path: "/userpage",
    name: "User Page",
    icon: "pe-7s-graph",
    component: UserPage,
    layout: "/facility"
  },
  {
    path: "/userpage",
    name: "User Page",
    icon: "pe-7s-graph",
    component: UserPage,
    layout: "/employee"
  },
  {
    path: "/userpage",
    name: "User Page",
    icon: "pe-7s-graph",
    component: UserPage,
    layout: "/avis"
  },
  {
    path: "/userpage",
    name: "User Page",
    icon: "pe-7s-graph",
    component: UserPage,
    layout: "/donor"
  },
  {
    path: "/userpage",
    name: "User Page",
    icon: "pe-7s-graph",
    component: UserPage,
    layout: "/analyst"
  },
  {
    path: "/userpage",
    name: "User Page",
    icon: "pe-7s-graph",
    component: UserPage,
    layout: "/doctor"
  },
  {
    path: "/analista-crud",
    name: "Analista",
    icon: "pe-7s-next-2",
    component: Analista,
    layout: "/facility"
  },
  {
    path: "/analista-crud",
    name: "Analista",
    icon: "pe-7s-next-2",
    component: Analista,
    layout: "/avis"
  },
  {
    path: "/donatore-crud",
    name: "Donatore",
    icon: "pe-7s-next-2",
    component: Donatore,
    layout: "/employee"
  },
  {
    path: "/dottore-crud",
    name: "Dottore",
    icon: "pe-7s-next-2",
    component: Dottore,
    layout: "/facility"
  },
  {
    path: "/impiegato-crud",
    name: "Impiegato",
    icon: "pe-7s-next-2",
    component: Impiegato,
    layout: "/facility"
  },
  {
    path: "/dottore-crud",
    name: "Dottore",
    icon: "pe-7s-next-2",
    component: Dottore,
    layout: "/avis"
  },
  {
    path: "/impiegato-crud",
    name: "Impiegato",
    icon: "pe-7s-next-2",
    component: Impiegato,
    layout: "/avis"
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
    layout: "/donor"
  },
  {
    path: "/donazioni-aperte",
    name: "Donazioni Aperte",
    icon: "pe-7s-angle-up-circle",
    component: DonazioniAperte,
    layout: "/analyst"
  },
  {
    path: "/bloodrequest",
    name: "Blood Request",
    icon: "pe-7s-angle-up-circle",
    component: BloodRequest,
    layout: "/facility"
  },
  {
    path: "/bloodrequest",
    name: "Blood Request",
    icon: "pe-7s-angle-up-circle",
    component: BloodRequest,
    layout: "/avis"
  },
  {
    path: "/carica-referto",
    name: "Carica Referto",
    icon: "pe-7s-refresh-2",
    component: CaricaReferto,
    layout: "/analyst"
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
    layout: "/employee"
  },
  {
    path: "/reservations",
    name: "Reservation List",
    icon: "pe-7s-eyedropper",
    component: ReservationList,
    layout: "/doctor"
  },
  {
    path: "/reservations",
    name: "Reservation List",
    icon: "pe-7s-eyedropper",
    component: ReservationListEmployee,
    layout: "/employee"
  },
  {
    path: "/stats",
    name: "Statistiche",
    icon: "pe-7s-graph",
    component: StatisticheAvis,
    layout: "/avis"
  },
  {
    path: "/login",
    name: "Login",
    icon: "pe-7s-eyedropper",
    component: Login,
    layout: "/notauth"
  },
  {
    path: "/logout",
    name: "Logout",
    icon: "pe-7s-graph",
    component: Logout,
    layout: "/facility",
  },
  {
    path: "/logout",
    name: "Logout",
    icon: "pe-7s-graph",
    component: Logout,
    layout: "/employee"
  },
  {
    path: "/logout",
    name: "Logout",
    icon: "pe-7s-graph",
    component: Logout,
    layout: "/avis"
  },
  {
    path: "/logout",
    name: "Logout",
    icon: "pe-7s-graph",
    component: Logout,
    layout: "/donor"
  },
  {
    path: "/logout",
    name: "Logout",
    icon: "pe-7s-graph",
    component: Logout,
    layout: "/analyst"
  },
  {
    path: "/logout",
    name: "Logout",
    icon: "pe-7s-graph",
    component: Logout,
    layout: "/doctor"
  },
  {
    path: "/logout",
    name: "Logout",
    icon: "pe-7s-graph",
    component: Logout,
    layout: "/admin"
  }
];

export default dashboardRoutes;
