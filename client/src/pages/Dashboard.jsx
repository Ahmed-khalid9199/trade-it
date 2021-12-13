import React, { useState } from "react";
import picture from "../assets/images/trade-up.jpg";
import Cards from "../components/card/Cards";
import Footer from "../components/UI/footer";
import { Link } from "react-router-dom";
import MySelect from "../components/UI/MySelect";

const Dashboard = () => {
  const [loadMore, setLoadMore] = useState(null);
  const [showLoadMore, setShowLoadMore] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState([]);

  return (
    <>
      <div style={{ width: "100vw" }}>
        <img src={picture} alt="trade it" className="cover" />
      </div>
      <MySelect
        className="top-select"
        placeholder="my location"
        value={selectedLocation}
        // onChange={searchByFilter}
        isMulti={false}
        options={[
          { label: "Karachi ", value: "karachi" },
          { label: "Lahore ", value: "lahore" },
          { label: "Islamabad ", value: "islamabad" },
        ]}
      />
      <div style={{ margin: "6% 4%" }}>
        <h2>Top Recommendation </h2>

        <Cards loadMore={loadMore} setShowLoadMore={setShowLoadMore} />
      </div>
      {showLoadMore && (
        <div>
          <center>
            <button
              onClick={() => {
                setLoadMore(Math.random());
              }}
            >
              Load More
            </button>
          </center>
        </div>
      )}
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
        ></div>
        <div style={{ width: "33.3%" }}>
          <Link to="#">
            <h3
              style={{
                marginLeft: "50px",
                fontFamily: "TimesNewRoman",
                color: "#002f34",
              }}
            >
              GET YOUR APP TODAY
            </h3>
          </Link>
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
      <Footer />
    </>
  );
};

export default Dashboard;
