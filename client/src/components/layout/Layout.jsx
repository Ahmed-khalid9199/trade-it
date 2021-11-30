import React from "react";
import "./layout.css";
import { Navbar, Mininav } from "../topnav/TopNav";
import Routes from "../Routes";
import { Route } from "react-router-dom";

const Layout = () => {
  return (
    <Route
      render={(props) => (
        <div className={`layout`}>
          <div className="layout__content">
            <Navbar />
            {/* <Mininav /> */}

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
