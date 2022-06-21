import React from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";

import "./layout.css";
import { Navbar } from "../topnav/TopNav";
import Routes from "../Routes";
import Sidebar from "../sidebar/Sidebar";

const Layout = () => {
  const { user } = useSelector((state) => state.user);
  const isAdmin = user?.type === "admin";
  return (
    <Route
      render={(props) => (
        <div className={`layout`}>
          {isAdmin && <Sidebar />}

          <div className={`${isAdmin ? "layout__content" : ""}`}>
            <Navbar />

            <div className="layout__content__main">
              <Routes />
            </div>
          </div>
        </div>
      )}
    />
  );
};

export default Layout;
