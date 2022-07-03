import React, { useEffect, useState } from "react";
import { Button, Tabs, Tab } from "react-bootstrap";
import "./MyProfile.css";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import axios from "axios";
import Cards from "../../components/card/Cards";
import TradeHistory from "../../components/tradehistory/TradeHistory";

import avatar from "../../assets/images/avatar.png";
import { useSelector } from "react-redux";
import BarChart from "../../components/charts/BarChart";
const MyProfile = () => {
  const [myProducts, setMyProducts] = useState(null);
  const [myHistory, setMyHistory] = useState(null);
  const [myLikes, setMyLikes] = useState(null);
  const params = useParams();
  const [currUser, setCurrUser] = useState(null);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/getmyproducts/${params.userid}`)
      .then((result) => {
        setMyProducts(result.data);

        let tempHistory = result.data
          .filter((p) => p.activityStatus === "traded")
          .map((p) => ({
            img: p.images[0],
            title: p.title,
            tradeProdImg: p.tradedWith.images[0],
            tradeProdTitle: p.tradedWith.title,
            tradedAt: p.tradedAt,
          }));
        tempHistory = tempHistory.sort(
          (a, b) =>
            new Date(b.tradedAt).getTime() - new Date(a.tradedAt).getTime()
        );
        setMyHistory(tempHistory);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/getuser`, {
        _id: params.userid,
      })
      .then(({ data }) => {
        setCurrUser(data);
      })
      .catch((err) => {
        console.log("get user crashed", err);
      });

    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/getLikes/${params.userid}`)
      .then(({ data }) => {
        setMyLikes(data);
      })
      .catch((err) => {
        console.log("get user crashed", err);
      });
  }, [params.userid]);
  return (
    <div class="main-content">
      {/* <!-- Top navbar --> */}
      <nav
        class="navbar navbar-top navbar-expand-md navbar-dark"
        id="navbar-main"
      >
        {/* <!-- Brand --> */}

        <h1 style={{ color: "black", marginLeft: "10px", fontSize: "50px" }}>
          {currUser && currUser.firstName} {currUser && currUser.lastName}
        </h1>

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
        {currUser && params.userid === user.user._id && (
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
                    {currUser && (
                      <img
                        src={currUser.imgSrc ? currUser.imgSrc : avatar}
                        class="rounded-circle profileImg"
                        alt="profile"
                      />
                    )}
                  </div>
                </div>
              </div>
              <div class="caard-header text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                <div class="d-flex justify-content-between">
                  <a href="/" class="btn btn-sm btn-info mr-4">
                    Connect
                  </a>
                  <a href="/" class="btn btn-sm btn-default float-right">
                    Message
                  </a>
                </div>
              </div>
              <div class="caard-body pt-0 pt-md-4">
                <div class="row">
                  <div class="col">
                    <div class="caard-profile-stats d-flex justify-content-center mt-md-5">
                      {/* <div>
                        <span class="heading">22</span>
                        <span class="description">Friends</span>
                      </div> */}
                      <div>
                        <span class="heading">{myProducts?.length}</span>
                        <span class="description">
                          {myProducts?.length === 1 ? "Product" : "Products"}
                        </span>
                      </div>
                      <div>
                        <span class="heading">
                          {currUser && currUser.likes.length}
                        </span>
                        <span class="description">Likes</span>
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
                  <hr class="my-4" />
                  {/* <BarChart /> */}
                </div>
              </div>
            </div>
          </div>
          {currUser && params.userid === user.user._id ? (
            <div class="col-xl-8 order-xl-1 user-ads">
              <Tabs
                defaultActiveKey="myads"
                id="uncontrolled-tab"
                className="mb-3"
              >
                <Tab eventKey="myads" title="My Ads">
                  {myProducts?.length > 0 ? (
                    <div class="caard bg-secondary shadow">
                      <Cards list={myProducts} displayBadge={true} />
                    </div>
                  ) : (
                    <div className="caard bg-secondary shadow p-4">
                      <h2>
                        Nothing here, try finding something you own but don't
                        need.
                      </h2>
                    </div>
                  )}
                </Tab>
                <Tab eventKey="likes" title="My Likes">
                  {myLikes?.length > 0 ? (
                    <div class="caard bg-secondary shadow">
                      <Cards list={myLikes} />
                    </div>
                  ) : (
                    <div className="caard bg-secondary shadow p-4">
                      <h2>No liked products, Why don't you browse more.</h2>
                    </div>
                  )}
                </Tab>
                <Tab eventKey="history" title="My History">
                  {myHistory?.length > 0 ? (
                    <div class="caard bg-secondary shadow p-2">
                      <TradeHistory list={myHistory} />
                    </div>
                  ) : (
                    <div className="caard bg-secondary shadow p-4">
                      <h2>You haven't traded any products yet</h2>
                    </div>
                  )}
                </Tab>
                <Tab eventKey="reviews" title="Reviews">
                  <div class="caard bg-secondary shadow p-4">
                    <h2>Coming Soon!</h2>
                  </div>
                </Tab>
              </Tabs>
            </div>
          ) : (
            <div class="col-xl-8 order-xl-1 user-ads">
              <Tabs
                defaultActiveKey="myads"
                id="uncontrolled-tab"
                className="mb-3"
              >
                {myProducts?.length > 0 ? (
                  <Tab eventKey="myads" title="Ads">
                    <div class="caard bg-secondary shadow">
                      <Cards list={myProducts} displayBadge={true} />
                    </div>
                  </Tab>
                ) : (
                  <div className="caard bg-secondary shadow p-4">
                    <h2>No ads yet.</h2>
                  </div>
                )}
                <Tab eventKey="myads" title="Reviews">
                  <div class="caard bg-secondary shadow">
                    <h2>Coming Soon!</h2>{" "}
                  </div>
                </Tab>
              </Tabs>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
