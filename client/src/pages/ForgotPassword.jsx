import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Row, Form, Button, Card } from "react-bootstrap";
import axios from "axios";
import background from "../assets/images/background1.jpg";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);

  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  // if user is already logged in redirect
  var user = localStorage.getItem("user");
  if (user) {
    history.replace(from);
  }

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();

    if (form.checkValidity() === false) {
      event.stopPropagation();
      return;
    }

    setValidated(true);
    if (!isEmailSent) {
      // send email
      sendEmail();
      return;
    }
    history.replace("/login");
  };

  const sendEmail = () => {
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/resetpassword`, { email })
      .then(({ data }) => {
        if (data.user) {
          toast.info("A recovary email has been sent. Please use it to login.");
          history.push("/login");
          setIsEmailSent(true);
        } else {
          toast.info("No such user. Please register.");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div
        style={{ backgroundImage: `url(${background})` }}
        className="background"
      ></div>
      <div className="slogan">
        <h1>
          <span style={{ color: "white" }}>Trade what you have, </span>
          for what you need.
        </h1>
      </div>
      <Row className="justify-content-center align-items-center vh-100 vw-100">
        <Card className="form" style={{ width: "25rem" }}>
          <Card.Body>
            <Card.Title as="h2" className="text-center">
              Reset your Password
            </Card.Title>
            <hr />
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>
                  Enter your user account's verified email address and we will
                  send you a temporary password.
                </Form.Label>
                <Form.Control
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  type="email"
                  placeholder="Enter email"
                />
                <Form.Control.Feedback type="invalid">
                  Please type in a valid email.
                </Form.Control.Feedback>
              </Form.Group>
              <div className="d-grid gap-3">
                <Button
                  size="lg"
                  variant="primary"
                  //   onClick={handleSubmit}
                  type="submit"
                  disabled={!email}
                >
                  {isEmailSent ? "Login" : "Send Email"}
                </Button>
                <Card.Subtitle
                  className="mb-2 text-muted"
                  style={{ fontSize: "13px" }}
                >
                  New User?{" "}
                  <Card.Link className="link" href="/register">
                    register
                  </Card.Link>
                </Card.Subtitle>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Row>
    </>
  );
};

export default ForgotPassword;
