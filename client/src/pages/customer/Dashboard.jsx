import React, { useState, useEffect } from "react";
import axios from "axios";
import picture from "../../assets/images/trade-up.jpg";
import Cards from "../../components/card/Cards";
import Footer from "../../components/UI/footer";
import { Link } from "react-router-dom";
import MySelect from "../../components/UI/MySelect";
import { useSelector, useDispatch } from "react-redux";
import { productsActions } from "../../store/products";
import { useHistory, useLocation } from "react-router-dom";
import qs from "query-string";
import { Button } from "react-bootstrap";

const Dashboard = () => {
  const [loadMore, setLoadMore] = useState(null);
  const [showLoadMore, setShowLoadMore] = useState(false);
  const products = useSelector((state) => state.products);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const makeValue = (string) => {
    if (string) {
      return {
        value: string,
        label: string.charAt(0).toUpperCase() + string.slice(1),
      };
    }
    return null;
  };

  const searchByLocation = (value) => {
    if (value) {
      const queryParams = qs.parse(location.search);
      const newQuery = { ...queryParams, location: value.value };
      history.push(`/?${qs.stringify(newQuery)}`);
    } else {
      const queryParams = qs.parse(location.search);
      delete queryParams.location;
      history.push(`/?${qs.stringify(queryParams)}`);
    }
    setSelectedLocation(value);
  };

  const queryParams = new URLSearchParams(location.search);
  const locationFilter = queryParams.get("location");
  const searchQuery = queryParams.get("search");

  const [selectedLocation, setSelectedLocation] = useState(
    makeValue(queryParams.get("location"))
  );
  useEffect(() => {
    if (locationFilter || searchQuery) {
      axios
        .get(
          `${process.env.REACT_APP_SERVER_URL}/gettestfilter/${
            locationFilter ? locationFilter : "null"
          }/${searchQuery ? searchQuery : "null"} `
        )
        .then((result) => {
          console.log("data", result.data);
          console.log("locationFilter", locationFilter);
          dispatch(productsActions.setProducts(result.data));
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .get(
          `${process.env.REACT_APP_SERVER_URL}/getrec/${user.user._id}/${
            loadMore ? products.length : 0
          }`
        )
        .then((result) => {
          if (loadMore) {
            dispatch(productsActions.appendProducts(result.data.products));
          } else {
            dispatch(productsActions.setProducts(result.data.products));
          }
          setShowLoadMore(result.data.remainingProducts !== 0);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loadMore, locationFilter, searchQuery]);

  return (
    <>
      <div style={{ width: "100vw" }}>
        <img src={picture} alt="trade it" className="cover" />
      </div>
      <MySelect
        className="top-select"
        placeholder="my location"
        value={selectedLocation}
        onChange={searchByLocation}
        isMulti={false}
        options={[
          { label: "Karachi ", value: "karachi" },
          { label: "Lahore ", value: "lahore" },
          { label: "Islamabad ", value: "islamabad" },
        ]}
      />
      <div style={{ margin: "2% 4%" }}>
        <h2>Top Recommendation </h2>

        <Cards list={products} />
      </div>
      {showLoadMore && !(locationFilter || searchQuery) && (
        <div>
          <center>
            <Button
              variant="secondary"
              onClick={() => {
                setLoadMore((prev) => (prev ? prev + 1 : 1));
              }}
            >
              Load More
            </Button>
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
