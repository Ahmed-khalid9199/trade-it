import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import logo from "../../assets/images/olx-logo1.png";
import { Link, useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import MySelect from "../UI/MySelect";
import "./topnav.css";

import { Dropdown } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/user";

import avatar from "../../assets/images/avatar.png";

const Navbar = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();

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

  return (
    <div>
      <AppBar>
        <Toolbar position="static" className="my-navbar">
          <Link to="/">
            <IconButton
              edge="start"
              className="menuButton"
              color="inherit"
              aria-label="menu"
            >
              <img src={logo} width="68px" height="48px" alt="olx-logo" />
            </IconButton>
          </Link>
          <MySelect
            placeholder="my location"
            isMulti={false}
            options={[
              { label: "Karachi ", value: "karachi" },
              { label: "Lahore ", value: "lahore" },
              { label: "Islamabad ", value: "islamabad" },
            ]}
          />
          <div>
            <i class="bx bx-search"></i>
            <Form.Control
              size="md"
              type="email"
              placeholder="Search anything"
              className="top-search"
            />
          </div>
          <div className="dropdown">
            {user && !user.isAuthenticated && (
              <Dropdown className="user-dropdown">
                <Dropdown.Toggle>
                  <img src={avatar} className="avatar" alt="" />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item>Profile</Dropdown.Item>
                  <Dropdown.Item>Settings</Dropdown.Item>
                  <Dropdown.Item onClick={logoutHandler}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
            {user && user.isAuthenticated && (
              <Button variant="primary">Log in</Button>
            )}

            {/* <Link to="./post">
                  <Button variant="outline-success">+Post New Product</Button>
                </Link> */}
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
