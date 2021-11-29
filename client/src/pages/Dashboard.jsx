import React from "react";
import picture from "../assets/images/trade-up.jpg";
// import Fouter from "./comps/footer";
import Cas from "../components/card/Cards";
import Fouter from "../components/UI/footer";
import "../app.css";

const Dashboard = () => {
  return (
    <>
      {" "}
      <div>
        <center>
          {" "}
          <img
            src={picture}
            alt="trade up"
            className="cover"
            // height="250"
            // width="1600"
          />
        </center>
      </div>
      <div style={{ margin: "6% 4%" }}>
        <h2>Top Recommendation </h2>
        <Cas />
      </div>
      <div>
        <center>
          <button id="loadmore">Load More</button>
        </center>
      </div>
      <div style={{ display: "flex" }}>
        <div colSpan="2" style={{ width: "33.3%" }}>
          <img
            src="https://statics.olx.com.pk/external/base/img/phone-app.png"
            alt=""
          />
        </div>
        <div
          colSpan="2"
          style={{
            width: "33.3%",
            color: "#002f34",
            fontFamily: "timesNewRoman",
            borderRight: "2px solid #ddd",
          }}
        >
          <h1>Trade up by FALCON</h1>
          <h3>Trade What You Have For What You Want!!!</h3>
        </div>
        <div style={{ width: "33.3%" }}>
          <h3
            style={{
              marginLeft: "50px",
              fontFamily: "TimesNewRoman",
              color: "#002f34",
            }}
          >
            GET YOUR APP TODAY
          </h3>
          <img
            src="https://statics.olx.com.pk/external/base/img/appstore_2x.png"
            alt=""
            style={{ marginRight: "10px", marginLeft: "30px" }}
          />
          <img
            src="https://statics.olx.com.pk/external/base/img/playstore_2x.png"
            alt=""
          />
        </div>
      </div>
      <Fouter />
    </>
  );
};

export default Dashboard;
