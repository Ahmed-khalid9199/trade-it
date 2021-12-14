import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import logo from "../../assets/images/olx-logo1.png";
import { Link, useHistory, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { productsActions } from "../../store/products";
import qs from "query-string";

// import MySelect from "../UI/MySelect";
import "./topnav.css";

import { Dropdown } from "react-bootstrap";

import { userActions } from "../../store/user";

import avatar from "../../assets/images/avatar.png";

const Navbar = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const [selectedSearch, setSelectedSearch] = useState();

  const logoutHandler = () => {
    dispatch(
      userActions.logout({
        cb: () => {
          localStorage.setItem("user", "");
          history.replace("/login");
        },
      })
    );
  };

  const SearchProducts = (event) => {
    if (event.key === "Enter") {
      if (selectedSearch) {
        const queryParams = qs.parse(location.search);
        const newQuery = { ...queryParams, search: selectedSearch };
        history.push(`/?${qs.stringify(newQuery)}`);
      } else {
        const queryParams = qs.parse(location.search);
        delete queryParams.search;
        history.push(`/?${qs.stringify(queryParams)}`);
      }
    }
  };

  return (
    <div>
      <AppBar>
        <Toolbar position="static" className="my-navbar">
          <div className="col-8 nav-justify">
            {/* <div className="top-flex"> */}
            <Link to="/">
              <IconButton
                edge="start"
                className="menuButton"
                color="inherit"
                aria-label="menu"
              >
                <img src={logo} width="74px" height="52px" alt="olx-logo" />
              </IconButton>
            </Link>
            <Form.Control
              size="md"
              type="email"
              placeholder="Search anything"
              className="top-search"
              value={selectedSearch}
              onKeyDown={SearchProducts}
              onChange={(e) => {
                SearchProducts(e.target.value);
                setSelectedSearch(e.target.value);
              }}
            />

            <div className="icon">
              <i class="bx bx-search"></i>
            </div>
          </div>
          <div>
            <div className="dropdown">
              {user && !user.isAuthenticated && (
                <Dropdown className="user-dropdown">
                  <Dropdown.Toggle>
                    <img
                      src={user.imgSrc ? user.imgSrc : avatar}
                      className="avatar"
                      alt=""
                    />
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item
                      onClick={() => {
                        history.push(`/profile/${user._id}`);
                      }}
                    >
                      Profile
                    </Dropdown.Item>

                    <Dropdown.Item
                      onClick={() => {
                        history.push("/post");
                      }}
                    >
                      Post new Ad
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        history.push("/inbox/thread");
                      }}
                    >
                      Inbox
                    </Dropdown.Item>

                    <Dropdown.Item
                      onClick={() => {
                        history.push("/editprofile");
                      }}
                    >
                      Edit Profile
                    </Dropdown.Item>
                    <Dropdown.Item onClick={logoutHandler}>
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              )}

              {/* <Link to="./post">
                  <Button variant="outline-success">+Post New Product</Button>
                </Link> */}
            </div>
            {!user && (
              <Link to="/login">
                <Button variant="primary">Log in</Button>{" "}
              </Link>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

class Mininav extends React.Component {
  render() {
    return (
      <div
        position="relative"
        style={{
          backgroundColor: "white",
          display: "flex",
          padding: "10px 30px",
          marginTop: "75px",
          boxShadow: "0px 1px 7px 0px silver",
          zIndex: "1",
        }}
      >
        <input type="button" value="ALL CATEGORIES" id="megaMenu" />
        <li id="link">Mobile Phones</li>
        <li id="link">Cars</li>
        <li id="link">Motorcycle</li>
        <li id="link">Houses</li>
        <li id="link">TV-Video-Audio</li>
        <li id="link">Tablets</li>
        <li id="link">Land & Plots</li>
      </div>
    );
  }
}

export { Navbar, Mininav };
