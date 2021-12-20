import React, { useEffect, useState } from "react";
import "./ProductDetail.css";
import { Card, Button, Row, Col } from "react-bootstrap";

import axios from "axios";
import { useParams } from "react-router";

import { useSelector } from "react-redux";

import { useHistory } from "react-router-dom";

import avatar from "../assets/images/avatar.png";

import moment from "moment";
import { Link } from "react-router-dom";

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
        members: [user._id, product.owner._id],
        products: [params.productid],
      }
    );
    // redirect to inbox
    history.push(`/inbox/${data._id}`);
  };

  const openUserProfile = async () => {
    history.push(`/profile/${product.owner._id}`);
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
  }, [params.productid]);

  const likeHandler = async () => {
    const result = await axios.put(
      `${process.env.REACT_APP_SERVER_URL}/likeproduct/${product._id}/${user._id}`
    );
    console.log(result);
    setProduct((prev) => ({ ...prev, likes: result.data.likes }));
  };

  return (
    <Row>
      <div class="container">
        <div class="product_card">
          <div class="container-fliud">
            <div class="wrapper row">
              <div class="preview col-md-6">
                <div class="preview-pic tab-content">
                  <div class="tab-pane active" id="pic-1">
                    <img src={product && product.images[0]} alt="product" />
                  </div>
                </div>
                {product && product.images.length > 1 && (
                  <ul class="preview-thumbnail nav nav-tabs">
                    {product.images.map((item, index) => {
                      return (
                        <li class="active">
                          <div data-target={`#pic-${index}`} data-toggle="tab">
                            <img src={item} alt="item" />
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>

              <div class="preview col-md-6">
                <Card
                  style={{
                    backgroundColor: "rgb(201, 213, 224)",
                    padding: "10px",
                  }}
                >
                  <div>
                    <Row>
                      <Col className="space-between">
                        <h1 class="product-title">
                          {product && product.title}
                        </h1>
                        <div>
                          <button class="btn like-btn" onClick={likeHandler}>
                            {product && product.likes.includes(user._id) ? (
                              <i class="bx bxs-heart like-icon"></i>
                            ) : (
                              <i class="bx bx-heart like-icon"></i>
                            )}
                          </button>
                          {product && (
                            <span class="review-no">
                              {product.likes.length}
                              {product.likes.length === 1 ? " like" : " likes"}
                            </span>
                          )}

                          <h6>
                            {product &&
                              moment(product.createdAt).format("MMMM D, YYYY")}
                          </h6>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Card>
                <br />
                <Card
                  style={{
                    backgroundColor: "rgb(201, 213, 224)",
                    padding: "10px",
                  }}
                >
                  <Row>
                    <Col>
                      <div
                        class="tab-pane active product-owner-img-container"
                        id="pic-1"
                      >
                        <img
                          className="product-owner-img"
                          src={
                            product && product.owner.imgSrc
                              ? product.owner.imgSrc
                              : avatar
                          }
                          alt="profile"
                        />
                      </div>
                    </Col>
                    <br />
                    <Col>
                      {product && (
                        <div>
                          {product.owner.firstName ? (
                            <h1>
                              {`${product.owner.firstName} ${product.owner.lastName}`}
                            </h1>
                          ) : (
                            <h1>{product.owner.username}</h1>
                          )}
                        </div>
                      )}

                      <h2>Member Since:</h2>
                      <h2>
                        {product &&
                          moment(product.owner.createdAt).format(
                            "MMMM D, YYYY"
                          )}
                      </h2>
                      <div style={{ display: "flex" }}>
                        {product && product.owner._id !== user._id && (
                          <>
                            <Button
                              onClick={openUserProfile}
                              style={{ backgroundColor: "Red" }}
                            >
                              Go to user Profile
                            </Button>{" "}
                            <Button onClick={openInbox}>Contact User</Button>
                          </>
                        )}

                        {product && product.owner._id === user._id && (
                          <>
                            <Link to={`/editproduct/${product && product._id}`}>
                              <Button
                                // onClick={openUserProfile}
                                style={{ backgroundColor: "orange" }}
                              >
                                Edit Product
                              </Button>
                            </Link>
                            <Button style={{ backgroundColor: "Brown" }}>
                              Delete Product
                            </Button>
                          </>
                        )}
                      </div>
                    </Col>
                    <Col></Col>
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
                  {product && product.description}
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
