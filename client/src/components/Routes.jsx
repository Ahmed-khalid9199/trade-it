import React from "react";

import { Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";

import Post from "../pages/customer/Post";
import EditProduct from "../pages/customer/EditProduct";
import Profile from "../pages/customer/Profile";
import MyProfile from "../pages/customer/MyProfile";
import Chat from "./chat/Chat";

import AdminDashboard from "../pages/admin/Dashboard";
import Users from "../pages/admin/Users";
import Products from "../pages/admin/Products";

import Dashboard from "../pages/customer/Dashboard";
import ProductDetail from "../pages/customer/ProductDetail";

const Routes = () => {
  const { user } = useSelector((state) => state.user);
  return user?.type === "customer" ? (
    <Switch>
      <Route path="/dashboard" exact component={Dashboard} />
      <Route path="/detail/:productid" exact component={ProductDetail} />
      <Route path="/profile/:userid" exact component={MyProfile} />
      <Route path="/post" exact component={Post} />
      <Route path="/editprofile" exact component={Profile} />
      <Route path="/editproduct/:productid" exact component={EditProduct} />
      <Route path="/inbox/:chatid" component={Chat} />
    </Switch>
  ) : user?.type === "admin" ? (
    <Switch>
      <Route path="/detail/:productid" exact component={ProductDetail} />
      <Route path="/dashboard" exact component={AdminDashboard} />
      <Route path="/users" exact component={Users} />
      <Route path="/products" exact component={Products} />
      <Route path="/editprofile" exact component={Profile} />
    </Switch>
  ) : (
    <Switch>
      <Route path="/dashboard" exact component={Dashboard} />
      <Route path="/detail/:productid" exact component={ProductDetail} />
      <Route path="*">
        <h1>Not found</h1>
      </Route>
    </Switch>
  );
};

export default Routes;
