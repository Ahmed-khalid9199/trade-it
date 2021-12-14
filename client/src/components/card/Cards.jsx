import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import axios from "axios";
import moment from "moment";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Cards = ({ list }) => {
  // const history = useHistory();
  // const location = useLocation();

  // const querPrams = URLSearchParams();

  // console.log(products);
  const location = useLocation();

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "auto auto auto auto",
      }}
    >
      {list &&
        list.map((product) => (
          <Link to={`/detail/${product._id}`}>
            <Card
              className={`${
                location.pathname.includes("profile")
                  ? "my-profile-card"
                  : "my-card"
              }`}
              style={{
                width: "auto",
                height: "auto",
                border: "dark",
                textDecoration: "none",
              }}
            >
              <Card.Img className="card-img" src={product.images[0]} />

              <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Title style={{ color: "grey" }}>
                  {product.category}
                </Card.Title>
                <hr />
                <Card.Text style={{ color: "black" }}>
                  {`${product.description.substring(
                    0,
                    Math.min(125, product.description.length)
                  )}...`}
                </Card.Text>
                <Card.Text
                  style={{ color: "black", fontWeight: "bold" }}
                >{`${product.owner.street}, ${product.owner.city}`}</Card.Text>
                <Card.Text style={{ color: "grey" }}>
                  {moment(product.createdAt).fromNow()}
                </Card.Text>
              </Card.Body>
            </Card>
          </Link>
        ))}
    </div>
  );
};

export default Cards;
