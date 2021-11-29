import React from "react";
import "./layout.css";
import "../../app.css";
import { Navbar, Mininav } from "../topnav/TopNav";
import Routes from "../Routes";
import { Route } from "react-router-dom";

const Layout = () => {
  return (
    <Route
      render={(props) => (
        <>
          <div className="App">
            <Navbar />
            <Mininav />
          </div>
          <Routes />
        </>
        // <div className={`layout`}>
        //   <div className="layout__content">
        //     <Navbar />
        //     <Mininav />
        //     <div className="layout__content-main">
        //       <Routes />
        //     </div>
        //   </div>
        // </div>
      )}
    />
  );
};

export default Layout;
