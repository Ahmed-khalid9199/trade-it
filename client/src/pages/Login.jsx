import React, { useState } from "react";
import { Row, Form, Button, Card, Alert } from "react-bootstrap";

import { useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userActions } from "../store/user";

import axios from "axios";
import bcrypt from "bcryptjs";

import background from "../assets/images/background1.jpg";

const Login = () => {
  const [noUser, setNoUser] = useState(false);
  const [isDeactivated, setIsDeactivated] = useState(false);
  const [username, setUsername] = useState("");
  const [usernameIsValid, setUsernameIsValid] = useState(true);
  const [password, setPassword] = useState("");
  const [passIsValid, setPassIsValid] = useState(true);
  const [passIsCorrect, setPassIsCorrect] = useState(true);

  const dispatch = useDispatch();
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  // if user is already logged in redirect
  var user = localStorage.getItem("user");
  if (user) {
    history.replace(from);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setUsernameIsValid(username ? true : false);
    setPassIsValid(password ? true : false);
    setPassIsCorrect(true);
    setNoUser(false);
    setIsDeactivated(false);

    if (username && password) {
      const { data: user } = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/login`,
        { username }
      );
      if (user) {
        if (user.status !== "active") {
          setIsDeactivated(true);
          return;
        }
        const passCheck = await bcrypt.compare(password, user.password);
        console.log(passCheck);
        setPassIsCorrect(passCheck);
        if (passCheck) {
          const { data } = await axios.post(
            `${process.env.REACT_APP_SERVER_URL}/getuser`,
            { username }
          );
          if (data) {
            dispatch(userActions.login(data));
            localStorage.setItem("user", JSON.stringify(data));
            history.replace(from);
          }
        }
      } else {
        setNoUser(true);
      }
    }
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
              Login
            </Card.Title>
            <hr />
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicUser">
                <Form.Label>Email/ Username</Form.Label>
                <Form.Control
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  className={!usernameIsValid && !username ? "is-invalid" : ""}
                  type="text"
                  placeholder="Enter email/username"
                />
                {noUser && (
                  <Form.Text className="text-danger">
                    No such user... Want to{" "}
                    <Card.Link className="alert-link" href="/register">
                      Register
                    </Card.Link>{" "}
                    ?
                  </Form.Text>
                )}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <div class="d-flex justify-content-between">
                  <Form.Label>Password</Form.Label>
                  <Card.Link className="link" href="/forgot-password">
                    Forgot Password?
                  </Card.Link>
                </div>
                <Form.Control
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  className={!passIsValid && !password ? "is-invalid" : ""}
                  type="password"
                  placeholder="Password"
                />
                {!passIsCorrect && (
                  <Form.Text style={{ color: "red" }}>
                    Password is wrong!
                  </Form.Text>
                )}
              </Form.Group>

              <div className="d-grid gap-3">
                <Button size="lg" variant="primary" type="submit">
                  Login
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
      {isDeactivated && (
        <Alert variant="danger">
          Seems like your account is banned. Please contact support.
        </Alert>
      )}
    </>
  );
};

export default Login;
