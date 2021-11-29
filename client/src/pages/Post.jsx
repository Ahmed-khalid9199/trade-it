import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import logo from "../assets/images/olx-logo.png";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import { Form, Button, Card, Row, Col } from "react-bootstrap";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
}));

const style = {
  margin: "3% 20%",
  padding: "25px",
};
const select = {
  fontSize: "18px",
  padding: "5px",
};
function Post() {
  const classes = useStyles();
  return (
    <>
      <div>
        <AppBar>
          <Toolbar position="static" style={{ backgroundColor: "#eeeeee" }}>
            <Link to="/">
              {" "}
              <IconButton edge="start" color="inherit" aria-label="menu">
                <img src={logo} width="68px" height="48px" alt="olx-logo" />
              </IconButton>
            </Link>
          </Toolbar>
        </AppBar>
      </div>
      <div style={style}>
        <center>
          <h1></h1>
        </center>
        <Card>
          <Card.Body>
            <Form>
              <center>
                <h3>POST YOUR ADD</h3>
              </center>
              <hr />
              <Card.Title>Product Info</Card.Title>

              <Form.Group className="mb-3" controlId="title">
                <Form.Label>Add title *</Form.Label>
                <Form.Control type="email" placeholder="Enter Product title" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="description">
                <Form.Label>Discription *</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Describe your product..."
                  style={{ height: "100px" }}
                />
              </Form.Group>
              <Form.Group controlId="producImages" className="mb-3">
                <Form.Label>Product Images</Form.Label>
                <Form.Control type="file" multiple />
              </Form.Group>
              <hr />
              <Card.Title>REVIEW YOUR DETAILS</Card.Title>

              <Row>
                <Col md>
                  <Form.Group controlId="userName" className="mb-3">
                    <Form.Label>Dislay Name</Form.Label>
                    <Form.Control type="text" />
                  </Form.Group>
                </Col>
                <Col md>
                  <Form.Group controlId="phoneNumber" className="mb-3">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control type="text" />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md>
                  <Form.Group controlId="streetAddress" className="mb-3">
                    <Form.Label>Street</Form.Label>
                    <Form.Control type="text" />
                  </Form.Group>
                </Col>
                <Col md>
                  <Form.Group controlId="city" className="mb-3">
                    <Form.Label>City</Form.Label>
                    <Form.Control type="text" />
                  </Form.Group>
                </Col>
              </Row>
              <hr />
              <Row className="d-flex justify-content-end">
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Row>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}

export default Post;
