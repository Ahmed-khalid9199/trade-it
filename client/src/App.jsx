import React, { useEffect } from "react";
import Layout from "./components/layout/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";

import { Route, Switch, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userActions } from "./store/user";
import "./app.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./components/PrivateRoute";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/customer/Dashboard";
import ProductDetail from "./pages/customer/ProductDetail";

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
        <Route path="/" exact>
          <Redirect to="/dashboard" />
        </Route>
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route path="/forgot-password" exact component={ForgotPassword} />

        {/* <Route path="/dashboard" exact component={Dashboard} />
        <Route path="/detail/:productid" exact component={ProductDetail} /> */}

        {/* <PrivateRoute path="/"> */}
        <Layout />
        {/* </PrivateRoute> */}

        <Route path="*">
          <h1>Not found</h1>
        </Route>
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
