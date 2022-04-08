import React, { useEffect } from "react";
import Layout from "./components/layout/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";

import { Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userActions } from "./store/user";
import "./app.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./components/PrivateRoute";

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
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <PrivateRoute path="/">
          <Layout />
        </PrivateRoute>
      </Switch>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};
export default App;
