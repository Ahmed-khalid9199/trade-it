import React, { useState } from "react";
import { Row, Form, Button, Card } from "react-bootstrap";

import { useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userActions } from "../store/user";

import axios from "axios";
import bcrypt from "bcryptjs";

const Login = () => {
  const [noUser, setNoUser] = useState(false);
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

    if (username && password) {
      const result = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/login`,
        { username }
      );
      if (result.data[0]) {
        const passCheck = await bcrypt.compare(
          password,
          result.data[0].password
        );
        console.log(passCheck);
        setPassIsCorrect(passCheck);
        if (passCheck) {
          const { data } = await axios.post(
            `${process.env.REACT_APP_SERVER_URL}/getuser`,
            { username }
          );
          if (data[0]) {
            dispatch(userActions.login(data[0]));
            localStorage.setItem("user", JSON.stringify(data[0]));
            history.replace(from);
          }
        }
      } else {
        setNoUser(true);
      }
    }
  };
  return (
    <Row className="justify-content-center align-items-center vh-100 vw-100">
      <Card style={{ width: "25rem" }}>
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
                <Form.Text style={{ color: "red" }}>
                  No such user exists!
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
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
              <Card.Subtitle className="mb-2 text-muted">
                New User? <Card.Link href="/register">register</Card.Link>
              </Card.Subtitle>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Row>
  );
};

export default Login;
