import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import "./MyProfile.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import axios from "axios";

import avatar from "../assets/images/avatar.png";

const MyProfile = () => {
  const { user } = useSelector((state) => state.user);
  const params = useParams();
  const [currUser, setCurrUser] = useState(null);

  useEffect(() => {
    let data = "";
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/getuser`, {
        _id: params.userid,
      })
      .then(({ data }) => {
        console.log("get user", data);
        setCurrUser(data[0]);
      })
      .catch((err) => {
        console.log("get user crashed", err);
      });
  }, []);

  return (
    <div class="main-content">
      {/* <!-- Top navbar --> */}
      <nav
        class="navbar navbar-top navbar-expand-md navbar-dark"
        id="navbar-main"
      >
        {/* <!-- Brand --> */}

        <h1 style={{ color: "black" }}>{currUser && currUser.firstName}</h1>

        {/* <!-- Form --> */}

        {/* <!-- User --> */}
      </nav>
      {/* <!-- Header --> */}
      <div
        class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
        // style="min-height: 600px; background-image: url(https://raw.githack.com/creativetimofficial/argon-dashboard/master/assets/img/theme/profile-cover.jpg); background-size: cover; background-position: center top;"
      >
        {/* <!-- Mask --> */}
        <span class="mask bg-gradient-default opacity-8"></span>
        {/* <!-- Header container --> */}
        {params.userid === user._id && (
          <div class="container-fluid d-flex align-items-center">
            <div class="row">
              <div>
                <Link to="/editprofile">
                  {" "}
                  <Button>Edit profile</Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
      <br />
      {/* <!-- Page content --> */}
      <div class="container-fluid mt--7">
        <div class="row">
          <div class="col-xl-4 order-xl-2 mb-5 mb-xl-0">
            <div class="caard caard-profile shadow">
              <div class="row justify-content-center">
                <div class="col-lg-3 order-lg-2">
                  <div class="caard-profile-image">
                    <a href="#">
                      <img src={avatar} class="rounded-circle" />
                    </a>
                  </div>
                </div>
              </div>
              <div class="caard-header text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                <div class="d-flex justify-content-between">
                  <a href="#" class="btn btn-sm btn-info mr-4">
                    Connect
                  </a>
                  <a href="#" class="btn btn-sm btn-default float-right">
                    Message
                  </a>
                </div>
              </div>
              <div class="caard-body pt-0 pt-md-4">
                <div class="row">
                  <div class="col">
                    <div class="caard-profile-stats d-flex justify-content-center mt-md-5">
                      <div>
                        <span class="heading">22</span>
                        <span class="description">Friends</span>
                      </div>
                      <div>
                        <span class="heading">10</span>
                        <span class="description">Products</span>
                      </div>
                      <div>
                        <span class="heading">89</span>
                        <span class="description">Comments</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="text-center">
                  <h3>
                    {currUser && currUser.username}
                    <span class="font-weight-light">
                      ,{" "}
                      {currUser && currUser.likes === 0
                        ? currUser && currUser.likes
                        : "No likes yet"}
                    </span>
                  </h3>
                  <div class="h5 font-weight-300">
                    <i class="ni location_pin mr-2"></i>
                    {currUser &&
                      currUser.street + "," + currUser &&
                      currUser.city}
                  </div>
                  <div class="h5 mt-4">
                    <i class="ni business_briefcase-24 mr-2"></i>
                    {currUser && currUser.phoneNumber}
                  </div>
                  <div style={{ color: "black" }}>
                    Comsats University Project
                  </div>
                  <hr class="my-4" />
                  <p style={{ color: "black" }}>
                    Ryan — the name taken by Melbourne-raised, Brooklyn-based
                    Nick Murphy — writes, performs and records all of his own
                    music.
                    {currUser && currUser.reviews}
                  </p>
                  <p>Show more</p>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-8 order-xl-1">
            <div class="caard bg-secondary shadow">
              <div class="caard-header bg-white border-0">
                <div class="row align-items-center">
                  <div class="col-8">
                    <h3 class="mb-0">My Ads</h3>
                  </div>
                </div>
              </div>
              <br />
              <Row>
                <Col>
                  <Card>HELLO</Card>{" "}
                </Col>
                <Col>
                  <Card>HELLO</Card>
                </Col>
              </Row>
              <br />
              <Row>
                <Col>
                  <Card>HELLO</Card>{" "}
                </Col>
                <Col>
                  <Card>HELLO</Card>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
