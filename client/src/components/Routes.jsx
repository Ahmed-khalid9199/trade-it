import React from "react";

import { Route, Switch } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Post from "../pages/Post";
import Profile from "../pages/Profile";
import Chat from "./chat/Chat";
import PrivateRoute from "./PrivateRoute";

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={Dashboard} />
      <PrivateRoute path="/">
        <Route path="/post" exact component={Post} />
        <Route path="/chat" exact component={Chat} />
        <Route path="/profile" exact component={Profile} />
      </PrivateRoute>

      <Route path="*">
        <h1>Not found</h1>
      </Route>
    </Switch>
  );
};

export default Routes;
