import React, { useEffect, useState } from "react";
// import "./ProductDetail.css";
import { Card, Button, Row, Col } from "react-bootstrap";

import axios from "axios";
import { useParams } from "react-router";

import { useSelector } from "react-redux";

import { useHistory } from "react-router-dom";

import avatar from "../assets/images/avatar.png";

const ProductDetail = () => {
  const { user } = useSelector((state) => state.user);

  const params = useParams();
  const [product, setProduct] = useState(null);

  const history = useHistory();

  const openInbox = async () => {
    // create new chat with user
    const { data } = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/newchat`,
      {
        members: [user._id, product.owner],
        products: [params.productId],
      }
    );
    console.log("new chat", data);
    // redirect to inbox
    history.push(`/inbox/${data._id}`);
  };

  const openUserProfile = async () => {
    history.push(`/profile/${product.owner}`);
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/getproduct/${params.productid}`)
      .then(({ data }) => {
        console.log("get product", data);
        setProduct(data);
      })
      .catch((err) => {
        console.log("get product crashed", err);
      });
  }, []);

  return (
    <Row>
      <div class="container">
        <div class="card">
          <div class="container-fliud">
            <div class="wrapper row">
              <div class="preview col-md-6">
                <div class="preview-pic tab-content">
                  <div class="tab-pane active" id="pic-1">
                    <img src={product.images[0]} />
                  </div>
                </div>
                {product.images.length > 1 && (
                  <ul class="preview-thumbnail nav nav-tabs">
                    {product.images.map((item, index) => {
                      return (
                        <li class="active">
                          <a data-target={`#pic-${index}`} data-toggle="tab">
                            <img src={item} />
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>

              <div class="preview col-md-6">
                <Row>
                  <Col>
                    <h1 class="product-title">{product.title}</h1>

                    <span class="review-no">41 reviews</span>
                    <Col></Col>
                    <button class="add-to-cart btn btn-default" type="button">
                      <i
                        style={{ marginLeft: "-8px", marginTop: "-5px" }}
                        class="bx bxs-heart"
                      ></i>
                    </button>
                  </Col>
                </Row>
                <br />
                <Card style={{ backgroundColor: "rgb(201, 213, 224)" }}>
                  <h4 class="price">
                    current price: <span>$180</span>
                  </h4>

                  <div className="space-between">
                    <div>
                      <h6>Shah Aalam Market</h6>
                    </div>
                    <div>
                      <h6>Posted 2hours ago</h6>
                    </div>
                  </div>
                </Card>
                <br />
                <Card style={{ backgroundColor: "rgb(201, 213, 224)" }}>
                  <Row>
                    <Col>
                      <div class="tab-pane active" id="pic-1">
                        <img src={avatar} />
                      </div>
                    </Col>
                    <br />
                    <Col>
                      <h3>Faraz Irfan</h3>
                      <h4>Member Scince:</h4>
                      <h5>January 5, 2021</h5>
                      <div style={{ display: "flex" }}>
                        <Button onClick={openInbox}>Contact User</Button>
                        <Button
                          onClick={openUserProfile}
                          style={{ backgroundColor: "Red" }}
                        >
                          Go to user Profile
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Card>
              </div>
              <div>
                <br />
              </div>
              <hr
                style={{
                  width: "135vh",
                  marginLeft: "20px",
                }}
              />

              <div class="details" col-md-6>
                <p class="product-description">
                  <h2>Description:</h2>
                  {product.description}
                  {/* Suspendisse quos? Tempus cras iure temporibus? Eu laudantium
                  cubilia sem sem! Repudiandae et! Massa senectus enim minim
                  sociosqu delectus posuere. */}
                </p>

                <p class="vote">
                  <strong>91%</strong> of buyers enjoyed this product!{" "}
                  <strong>(87 votes)</strong>
                </p>
                <h2>Details:</h2>
                <h5 class="sizes">
                  sizes:
                  <span class="size" data-toggle="tooltip" title="small">
                    s
                  </span>
                  <span class="size" data-toggle="tooltip" title="medium">
                    m
                  </span>
                  <span class="size" data-toggle="tooltip" title="large">
                    l
                  </span>
                  <span class="size" data-toggle="tooltip" title="xtra large">
                    xl
                  </span>
                </h5>
              </div>

              <div class="details col-md-6"></div>
            </div>
          </div>
        </div>
      </div>
    </Row>
  );
};

export default ProductDetail;
