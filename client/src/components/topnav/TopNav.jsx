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
  const queryParams = qs.parse(location.search);

  const [selectedSearch, setSelectedSearch] = useState(
    queryParams.search ? queryParams.search : ""
  );
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
        const newQuery = { ...queryParams, search: selectedSearch };
        history.push(`/dashboard/?${qs.stringify(newQuery)}`);
      } else {
        delete queryParams.search;
        history.push(`/dashboard/?${qs.stringify(queryParams)}`);
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
            {/* {user?.type === "customer" && ( */}
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
          </div>
          <div class="d-flex justify-content-end">
            {user && !user.isAuthenticated && (
              <>
                <Link to="/post">
                  <i
                    style={{ fontSize: "2rem", color: "green" }}
                    class="bx bx-plus-circle p-2"
                  ></i>
                </Link>
                <Link to="/inbox/thread">
                  <i style={{ fontSize: "2rem" }} class="bx bx-chat p-2"></i>
                </Link>

                <div>
                  {user.firstName ? (
                    <h3 className="user-name">{`${user.firstName} ${user.lastName}`}</h3>
                  ) : (
                    <h3 className="username">{user.username}</h3>
                  )}
                </div>
                <div className="dropdown">
                  <Dropdown className="user-dropdown">
                    <Dropdown.Toggle>
                      <img
                        src={user.imgSrc ? user.imgSrc : avatar}
                        className="avatar"
                        alt=""
                      />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      {user.type === "customer" && (
                        <>
                          <Dropdown.Item
                            onClick={() => {
                              history.push(`/profile/${user._id}`);
                            }}
                          >
                            My Profile
                          </Dropdown.Item>
                          {/* <Dropdown.Item
                            onClick={() => {
                              history.push("/post");
                            }}
                          >
                            Post new Ad
                          </Dropdown.Item>{" "} */}
                          {/* <Dropdown.Item
                            onClick={() => {
                              history.push("/inbox/thread");
                            }}
                          >
                            Inbox
                          </Dropdown.Item> */}
                        </>
                      )}

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
                </div>
              </>
            )}
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
