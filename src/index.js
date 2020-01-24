/*!

=========================================================
* Material Dashboard PRO React - v1.8.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-pro-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

import AuthLayout from "layouts/Auth.js";
import RtlLayout from "layouts/RTL.js";
import AdminLayout from "layouts/Admin.js";
import UserLayout from "layouts/User.js";
import Description from "views/Pages/Description"
import Cart from "views/Pages/Cart"
import routes from "routes.js";
import ManualCode from "views/Pages/ManualCode"
import Login from "views/Pages/LoginPage"
import Register from "views/Pages/RegisterPage"
import CreateDish from "./views/Pages/CreateDish"
import dO from "views/Pages/DecideOrder"
import "assets/scss/material-dashboard-pro-react.scss?v=1.8.0";
import QR from "./views/QR/Page_QR"
import EditMenu from "views/Dashboard/EditMenu"
import Pago from "views/Pages/Pay"

const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/qr" component={QR}/>
      <Route path="/Login" component={Login}/>
      <Route path="/description" component={Description}/>
      <Route path="/rtl" component={RtlLayout} />
      <Route exact path="/" component={Register} />
      <Route path="/auth" component={AuthLayout} />
      <Route path="/admin" component={AdminLayout} />
      <Route path="/user" component={UserLayout} />
      <Route path="/pay" component={Pago} />
      <Route path="/user/dO" component={dO}/>
      <Route path="/manualCode" component={ManualCode} />
      <Route path="/admin/createDish" component={CreateDish} />
      <Route path="/editMenu" component={EditMenu} />
      
    </Switch>
  </Router>,
  document.getElementById("root")
);
