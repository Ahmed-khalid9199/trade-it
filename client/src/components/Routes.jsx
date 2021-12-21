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
      <PrivateRoute path="/">
        <Route path="/" exact component={Dashboard} />
        <Route path="/detail/:productid" exact component={ProductDetail} />
        <Route path="/profile/:userid" exact component={MyProfile} />
        <Route path="/post" exact component={Post} />
        <Route path="/editprofile" exact component={Profile} />
        <Route path="/editproduct/:productid" exact component={EditProduct} />
        <Route path="/inbox/:chatid" component={Chat} />
        {/* <Route path="*">
          <h1>Not found hello</h1>
        </Route> */}
      </PrivateRoute>
    </Switch>
  );
};

export default Routes;
