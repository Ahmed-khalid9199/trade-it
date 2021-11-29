import React from "react";

import { Route, Switch } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Post from "../pages/Post";

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={Dashboard} />
      <Route path="/post" exact component={Post} />
      <Route path="*">
        <h1>Not found</h1>
      </Route>
    </Switch>
  );
};

export default Routes;
