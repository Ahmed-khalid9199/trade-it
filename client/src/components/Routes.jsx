import React from "react";

import { Route, Switch } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Post from "../pages/Post";
import ProductDetail from "../pages/ProductDetail";
import EditProduct from "../pages/EditProduct";
import Profile from "../pages/Profile";
import MyProfile from "../pages/MyProfile";
import Chat from "./chat/Chat";
import PrivateRoute from "./PrivateRoute";

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={Dashboard} />
      <PrivateRoute path="/">
        <Route path="/post" exact component={Post} />
        <Route path="/productdetail" exact component={ProductDetail} />
        <Route path="/editproduct" exact component={EditProduct} />
        <Route path="/profile" exact component={Profile} />
        <Route path="/myprofile" exact component={MyProfile} />
        <Route path="/inbox/:chatid" component={Chat} />
      </PrivateRoute>

      <Route path="*">
        <h1>Not found</h1>
      </Route>
    </Switch>
  );
};

export default Routes;
