import React from "react";
import { Card } from "react-bootstrap";
import moment from "moment";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./card.css";

const Cards = ({ list }) => {
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
            >
              <Card.Img className="cardImg" src={product.images[0]} />

              <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Title style={{ color: "grey" }}>
                  {product.category}
                </Card.Title>
                <hr />
                <Card.Text style={{ color: "black" }}>
                  {location.pathname.includes("profile")
                    ? `${product.description.substring(
                        0,
                        Math.min(20, product.description.length)
                      )}...`
                    : `${product.description.substring(
                        0,
                        Math.min(70, product.description.length)
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
