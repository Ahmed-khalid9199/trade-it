import React, { useEffect, useState } from "react";
import "./ProductDetail.css";
import { Card, Button, Row, Col } from "react-bootstrap";

import axios from "axios";
import { useParams } from "react-router";

import { useSelector } from "react-redux";

import { useHistory } from "react-router-dom";

import avatar from "../../assets/images/avatar.png";

import moment from "moment";
import { Link } from "react-router-dom";

const ProductDetail = () => {
  const { user } = useSelector((state) => state.user);

  const params = useParams();
  const [product, setProduct] = useState(null);
  const [activeImg, setActiveImg] = useState(0);

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

  const removeProductHandler = () => {
    axios
      .put(
        `${process.env.REACT_APP_SERVER_URL}/updateproduct/${params.productid}`,
        {
          activityStatus:
            product.activityStatus === "active"
              ? "removed"
              : product.activityStatus === "removed"
              ? "active"
              : product.activityStatus,
        }
      )
      .then(({ data }) => {
        history.replace("/products");
      })
      .catch((err) => {
        console.log("update product crashed", err);
      });
  };
  return (
    <Row>
      <div className="container">
        <div className="product_card">
          {user.type === "admin" && (
            <div className="d-flex justify-content-end pb-2">
              <Button
                onClick={removeProductHandler}
                variant={
                  product?.activityStatus === "active" ? "danger" : "success"
                }
              >
                {product?.activityStatus === "active"
                  ? "Remove this product"
                  : "Allow this product"}
              </Button>
            </div>
          )}

          <div className="container-fliud">
            <div className="wrapper row">
              <div className="preview col-md-6">
                <div className="preview-pic tab-content">
                  <div className="tab-pane active" id="pic-1">
                    <img
                      src={product && product.images[activeImg]}
                      className="previewImg"
                      alt="product"
                    />
                  </div>
                </div>
                {product && product.images.length > 1 && (
                  <ul className="preview-thumbnail nav nav-tabs">
                    {product.images.map((item, index) => {
                      return (
                        <li
                          onClick={() => {
                            setActiveImg(index);
                          }}
                        >
                          <div data-target={`#pic-${index}`} data-toggle="tab">
                            <img
                              className={`${
                                activeImg === index ? "active-preview" : ""
                              }`}
                              src={item}
                              alt="item"
                            />
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>

              <div className="preview col-md-6">
                <Card
                  style={{
                    backgroundColor: "rgb(201, 213, 224)",
                    padding: "10px",
                  }}
                >
                  <div>
                    <Row>
                      <Col className="space-between">
                        <h1 className="product-title">
                          {product && product.title}
                        </h1>
                        <div>
                          <button
                            className="btn like-btn"
                            onClick={likeHandler}
                            disabled={user.type === "admin"}
                          >
                            {product && product.likes.includes(user._id) ? (
                              <i className="bx bxs-heart like-icon"></i>
                            ) : (
                              <i className="bx bx-heart like-icon"></i>
                            )}
                          </button>
                          {product && (
                            <span className="review-no">
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
                        className="tab-pane active product-owner-img-container"
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
                              disabled={user.type === "admin"}
                            >
                              Go to user Profile
                            </Button>
                            <Button
                              onClick={openInbox}
                              disabled={user.type === "admin"}
                            >
                              Contact User
                            </Button>
                          </>
                        )}

                        {product && product.owner._id === user._id && (
                          <>
                            <Link
                              style={{ marginRight: "5px" }}
                              to={`/editproduct/${product && product._id}`}
                            >
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

              <div className="details" col-md-6>
                <p className="product-description">
                  <h2>Description:</h2>
                  {product && product.description}
                  {/* Suspendisse quos? Tempus cras iure temporibus? Eu laudantium
                  cubilia sem sem! Repudiandae et! Massa senectus enim minim
                  sociosqu delectus posuere. */}
                </p>

                <p className="vote">
                  <strong>91%</strong> of buyers enjoyed this product!{" "}
                  <strong>(87 votes)</strong>
                </p>
                <h2>Tags:</h2>
                {product && (
                  <h5 className="tag-box">
                    {product.tags.map((item, index) => {
                      if ((index % 10 === 0) & (index !== 0)) {
                        return (
                          <>
                            <span key={index} className="tag">
                              {item}
                            </span>
                            <br />
                          </>
                        );
                      } else {
                        return (
                          <span key={index} className="tag">
                            {item}
                          </span>
                        );
                      }
                    })}
                  </h5>
                )}
              </div>

              <div className="details col-md-6"></div>
            </div>
          </div>
        </div>
      </div>
    </Row>
  );
};

export default ProductDetail;
