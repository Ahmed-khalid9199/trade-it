import React, { useEffect } from "react";
import Layout from "./components/layout/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Chat from "./components/chat/Chat";

import { Route, Switch } from "react-router-dom";
// import PrivateRoute from "./components/PrivateRoute";
import { useDispatch } from "react-redux";
import { userActions } from "./store/user";
import "./app.css";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    var user = localStorage.getItem("user");
    if (user) {
      user = JSON.parse(user);
      dispatch(userActions.login(user));
    }
  }, [dispatch]);
  return (
    <>
      <Switch>
        {/* public routes go here */}
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route path="/chat" exact component={Chat} />

        {/* <PrivateRoute path="/"> */}
        {/* private routes go here */}
        <Layout />
        {/* </PrivateRoute> */}
      </Switch>
    </>
  );
};
export default App;
