import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Row, Form, Button, Card } from "react-bootstrap";
import axios from "axios";
import bcrypt from "bcryptjs";
import background from "../assets/images/background1.jpg";
import "./register.css";
import { toast } from "react-toastify";

const Register = () => {
  const [username, setUsername] = useState("");
  const [usernameIsValid, setUsernameIsValid] = useState(null);

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passIsValid, setPassIsValid] = useState(true);

  const [validated, setValidated] = useState(false);

  const [flip, setFlip] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  // if user is already logged in redirect
  var user = localStorage.getItem("user");
  if (user) {
    history.replace(from);
  }

  useEffect(() => {
    const indentifier = setTimeout(async () => {
      if (username) {
        const { data: user } = await axios.post(
          `${process.env.REACT_APP_SERVER_URL}/getuser`,
          { username }
        );
        setUsernameIsValid(user ? false : true);
      }
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
      };
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/register`,
        USER
      );
      history.replace("/login");
      console.log("response", response);
    }
  };

  const handleEmailVerification = () => {
    if (!isEmailSent) {
      // send email
      sendEmail();
      return;
    }
    // verify
    setCodeError(false);
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/verify`, { email, code })
      .then((res) => {
        verify();
      })
      .catch((err) => {
        setCodeError(true);
        console.log(err);
      });
  };
  const verify = () => {
    setFlip(true);
    setTimeout(() => {
      setIsEmailVerified(true);
    }, 500);
  };

  const sendEmail = () => {
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/sendemail`, { email })
      .then(({ data: isUser }) => {
        if (isUser) {
          toast.info("A user already exists with this email. Try logging in.");
          history.push("/login");
        } else {
          setIsEmailSent(true);
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
        <Card
          className={`form ${flip ? "flip" : ""} `}
          style={{ width: "25rem" }}
        >
          <Card.Body>
            <Card.Title as="h2" className="text-center">
              Register
            </Card.Title>
            <hr />
            {!isEmailVerified ? (
              <Form noValidate validated={validated}>
                <Form.Group className="mb-3">
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
                  <Form.Label>Code</Form.Label>
                  <Form.Control
                    value={code}
                    onChange={(e) => {
                      setCode(e.target.value);
                    }}
                    type="number"
                    placeholder="XXXX"
                    disabled={!isEmailSent}
                  />
                  {codeError && (
                    <Form.Text style={{ color: "red" }}>
                      Invalid code. Please try copy pasting it from the email.
                    </Form.Text>
                  )}
                </Form.Group>
                {isEmailSent && (
                  <Card.Subtitle
                    className="mb-2 text-muted "
                    style={{ fontSize: "13px" }}
                  >
                    Didn't recieve an email?{" "}
                    <Button
                      onClick={sendEmail}
                      variant="link"
                      style={{
                        padding: "0",
                        color: "red",
                      }}
                    >
                      Resend
                    </Button>
                  </Card.Subtitle>
                )}
                <div className="d-grid gap-3">
                  <Button
                    size="lg"
                    variant="primary"
                    onClick={handleEmailVerification}
                    disabled={(isEmailSent && !code) || !email}
                  >
                    {isEmailSent ? "Verify" : "Send Email"}
                  </Button>
                </div>
              </Form>
            ) : (
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
                      confirmPassword && !passIsValid
                        ? "invalid is-invalid"
                        : ""
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

                <div className="d-grid">
                  <Button size="lg" variant="primary" type="submit">
                    Register
                  </Button>
                </div>
              </Form>
            )}

            <Card.Subtitle
              className="mb-2 text-muted pt-2"
              style={{ fontSize: "13px" }}
            >
              Already have an account?
              <Card.Link className="link" href="/login">
                {` login`}
              </Card.Link>
            </Card.Subtitle>
          </Card.Body>
        </Card>
      </Row>
    </>
  );
};

export default Register;
