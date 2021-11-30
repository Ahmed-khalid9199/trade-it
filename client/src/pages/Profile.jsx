import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { userActions } from "../store/user";
import { Row, Col, Button, Form, InputGroup, Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import Message from "../components/UI/Message";
import MyModal from "../components/modals/MyModal";
import moment from "moment";
import "./Profile.css";

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [validated, setValidated] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [firstName, setFirstName] = useState(user ? user.first_name : "");
  const [lastName, setLastName] = useState(user ? user.last_name : "");
  const [dateOfBirth, setDateOfBirth] = useState(
    user.date_of_birth ? moment(user.date_of_birth).format("YYYY-MM-DD") : ""
  );
  const [phone, setPhone] = useState(user ? user.phone_number : "");
  const [street, setStreet] = useState(user ? user.street : "");
  const [province, setProvince] = useState(user ? user.province : "");
  const [city, setCity] = useState(user ? user.city : "");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    setValidated(true);
    if (form.checkValidity() === true) {
      if (user) {
        console.log("value", firstName, lastName, dateOfBirth, phone);
        setShowModal(false);
        await axios
          .post(`${process.env.REACT_APP_BACKEND_URL}/updateuser`, {
            id: user._id,
            first_name: firstName,
            last_name: lastName,
            date_of_birth: dateOfBirth,
            phone_number: phone,
            street: street,
            province: province,
            city: city,
          })
          .then((response) => {
            let data = response.data;
            dispatch(userActions.login(data));
            localStorage.setItem("user", JSON.stringify(data));
            console.log("updated User", response.data);
          });
        console.log("edit submit");
      }
    }
  };
  const closeCloseModel = () => {
    setShowModal(false);
  };

  return (
    <>
      <Row>
        <h2> Edit Profile </h2>
        <br />
        <Col>
          <Card>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Row className="m-3">
                <h3>Personal Info</h3>
                <Form.Group as={Col} md="6">
                  <Form.Label>First Name</Form.Label>
                  <InputGroup hasValidation>
                    <Form.Control
                      type="text"
                      placeholder="First Name"
                      aria-describedby="inputGroupPrepend"
                      // value={firstName}
                      // onChange={(e) => setFirstName(e.target.value)}
                      // onBlur={() => onChangeHandler()}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please choose a username.
                    </Form.Control.Feedback>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
                <Form.Group as={Col} md="6">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Last Name"
                    //   value={lastName}
                    //   onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid password.
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row className="m-3">
                <Form.Group as={Col} md="6">
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Control
                    type="date"
                    //   value={dateOfBirth}
                    //   onChange={(e) => setDateOfBirth(e.target.value)}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid password.
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <hr />

              <Row className="m-3">
                <h3>Contact Info</h3>
                <Form.Group as={Col} md="6">
                  <Form.Label>Phone #</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Phone"
                    //   value={phone}
                    //   onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid Email.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="6">
                  <Form.Label>Street</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Street"
                    //   value={address}
                    //   onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid Street.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="6">
                  <Form.Label>Province</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Province"
                    //   value={address}
                    //   onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid Province.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="6">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="City"
                    //   value={address}
                    //   onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid City.
                  </Form.Control.Feedback>
                </Form.Group>

                <Row className="justify-content-center mt-5">
                  <Col md={3}>
                    <p
                      style={{
                        color: "blue",
                        textDecoration: "underline",
                        cursor: "pointer",
                      }}
                      // onClick={() => setShowModal(true)}
                    >
                      Change Password
                    </p>
                  </Col>
                  <MyModal
                    size="md"
                    show={showModal}
                    heading="Change Password"
                    onClose={closeCloseModel}
                    style={{ width: "auto" }}
                  >
                    <Row className="justify-content-center">
                      <Row className="mt-3">
                        {error && <Message>{error}</Message>}
                        <Form.Group as={Col}>
                          <Form.Label>Old Password</Form.Label>
                          <Form.Control
                            type="password"
                            placeholder="Old Password"
                            //   value={oldPassword}
                            //   onChange={(e) => setOldPassword(e.target.value)}
                            required
                          />
                          <Form.Control.Feedback type="invalid">
                            Please provide a valid Email.
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Row>
                      <Row className="mt-3">
                        <Form.Group as={Col}>
                          <Form.Label>New Password</Form.Label>
                          <Form.Control
                            type="password"
                            placeholder="New Password"
                            //   value={newPassword}
                            //   onChange={(e) => setNewPassword(e.target.value)}
                            required
                          />
                          <Form.Control.Feedback type="invalid">
                            Please provide a valid Email.
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Row>
                      <Row className="mt-3">
                        <Form.Group as={Col}>
                          <Form.Label>Confirm Password</Form.Label>
                          <Form.Control
                            type="password"
                            placeholder="Confirm Password"
                            //   value={confirmPassword}
                            //   onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                          />
                          <Form.Control.Feedback type="invalid">
                            Please provide a valid Email.
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Row>
                    </Row>
                    <Row className="mx-5 mt-3">
                      <Button>Change Password</Button>
                    </Row>
                  </MyModal>
                </Row>
              </Row>
              <hr />
              <hr />
              <div className="edit-button">
                <Button type="submit" className="edit-button-1">
                  Edit form
                </Button>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Profile;
