import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Row, Form, Button, Card } from "react-bootstrap";
import axios from "axios";
import bcrypt from "bcryptjs";
import background from "../assets/images/background1.jpg";

const Register = () => {
  const [username, setUsername] = useState("");
  const [usernameIsValid, setUsernameIsValid] = useState(null);

  const [email, setEmail] = useState("");
  const [validated, setValidated] = useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passIsValid, setPassIsValid] = useState(true);

  let history = useHistory();

  useEffect(() => {
    const indentifier = setTimeout(async () => {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/getuser`,
        { username }
      );
      console.log("checking username");
      setUsernameIsValid(response.data.length === 0);
    }, 500);
    return () => {
      clearTimeout(indentifier);
    };
  }, [username]);

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    setValidated(true);
    event.preventDefault();

    if (form.checkValidity() === false) {
      event.stopPropagation();
      return;
    }
    // send req
    if (passIsValid && usernameIsValid) {
      const hash = await bcrypt.hash(password, 8);
      const USER = {
        username,
        email,
        password: hash,
        type: "customer",
      };
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/register`,
        USER
      );
      history.replace("/login");
      console.log("response", response);
    }
  };
  return (
    <>
      <div
        style={{ backgroundImage: `url(${background})` }}
        className="background"
      ></div>
      <Row className="justify-content-center align-items-center vh-100 vw-100">
        <Card className="form" style={{ width: "25rem" }}>
          <Card.Body>
            <Card.Title as="h2" className="text-center">
              Register
            </Card.Title>
            <hr />
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>UserName</Form.Label>
                <Form.Control
                  className={`${
                    username && !usernameIsValid ? "invalid is-invalid" : ""
                  } no__feedback shadow-none`}
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  type="text"
                  placeholder="Enter username"
                />
                {usernameIsValid && username && (
                  <Form.Text style={{ color: "green" }}>
                    Username is available!
                  </Form.Text>
                )}
                {usernameIsValid === false && username && (
                  <Form.Text style={{ color: "red" }}>
                    Whoops! username already exists.
                  </Form.Text>
                )}
              </Form.Group>

              <Form.Group className="mb-3" controlId="customEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  type="email"
                  placeholder="Enter email"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword1">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  type="password"
                  placeholder="Password"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword2">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  required
                  value={confirmPassword}
                  className={`${
                    confirmPassword && !passIsValid ? "invalid is-invalid" : ""
                  } no__feedback shadow-none`}
                  onChange={(e) => {
                    setPassIsValid(e.target.value === password);
                    setConfirmPassword(e.target.value);
                  }}
                  type="password"
                  placeholder="Password"
                />
                {!passIsValid && (
                  <Form.Text style={{ color: "red" }}>
                    passwords do not match
                  </Form.Text>
                )}
              </Form.Group>

              <div className="d-grid gap-3">
                <Button size="lg" variant="primary" type="submit">
                  Register
                </Button>
                <Card.Subtitle className="mb-2 text-muted">
                  Already have an account?{" "}
                  <Card.Link className="link" href="/login">
                    login
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

export default Register;
