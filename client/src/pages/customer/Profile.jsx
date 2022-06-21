import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/user";
import { Row, Col, Button, Form, InputGroup, Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import Message from "../../components/UI/Message";
import MyModal from "../../components/modals/MyModal";
import moment from "moment";
import "./Profile.css";
import bcrypt from "bcryptjs";
import PreviewImage from "../../components/preview/PreviewImage";

import { toast } from "react-toastify";

import { useHistory } from "react-router";

import Select from "react-select";
import TAGS from "../../assets/JsonData/tags.json";

const makeStrArr = (valueArr) => {
  if (valueArr) {
    return valueArr.map((item) => item.value);
  }
  return [];
};

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [validated, setValidated] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [firstName, setFirstName] = useState(user ? user.firstName : "");
  const [lastName, setLastName] = useState(user ? user.lastName : "");
  const [dateOfBirth, setDateOfBirth] = useState(
    user.dob ? moment(user.dob).format("YYYY-MM-DD") : ""
  );
  const [phone, setPhone] = useState(user ? user.phoneNumber : "");
  const [street, setStreet] = useState(user ? user.street : "");
  const [province, setProvince] = useState(user ? user.province : "");
  const [city, setCity] = useState(user ? user.city : "");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(false);

  const [tags, setTags] = useState("");
  const [tagOptions, setTagOptions] = useState(TAGS);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/gettags`)
      .then(({ data }) => {
        setTagOptions(data);
      });
  }, []);

  const [uploadImg, setUploadImg] = useState(
    user && user.imgSrc ? user.imgSrc : null
  );

  const history = useHistory();

  const passwordChangeHandler = async (e) => {
    e.preventDefault();
    const passCheck = await bcrypt.compare(oldPassword, user.password);
    if (!oldPassword && !newPassword && !confirmPassword) {
      setError("Please fill all fields");
    } else if (!passCheck) {
      setError("Old Password is Not Correct");
    } else if (newPassword !== confirmPassword) {
      setError("Confirm Password is not same as new password");
    } else {
      setShowModal(false);
      const hash = await bcrypt.hash(newPassword, 8);
      await axios
        .put(`${process.env.REACT_APP_SERVER_URL}/updateuser/${user._id}`, {
          password: hash,
        })
        .then((response) => {
          let data = response.data;
          dispatch(userActions.login(data));
          localStorage.setItem("user", JSON.stringify(data));
          console.log("updated User", response);
        });
    }
  };

  const uploadImgHandler = async () => {
    if (!uploadImg) {
      return "";
    } else if (uploadImg === user.imgSrc) {
      return user.imgSrc;
    }
    var url = "";
    console.log("file", uploadImg);
    var profileImages = new FormData();
    profileImages.append("file", uploadImg);
    profileImages.append("upload_preset", "czwbybpu");
    var data = await axios.post(
      "https://api.cloudinary.com/v1_1/dmwkic1oe/image/upload",
      profileImages
    );
    url = data.data.secure_url;
    return url;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    setValidated(true);
    if (form.checkValidity() === true) {
      console.log("value", firstName, lastName, dateOfBirth, phone);
      const imgSrc = await uploadImgHandler();
      await axios
        .put(`${process.env.REACT_APP_SERVER_URL}/updateuser/${user._id}`, {
          firstName: firstName,
          lastName: lastName,
          dob: dateOfBirth,
          phoneNumber: phone,
          street: street,
          province: province,
          city: city,
          imgSrc,
          preferences: makeStrArr(tags),
        })
        .then((response) => {
          let data = response.data;
          dispatch(userActions.login(data));
          localStorage.setItem("user", JSON.stringify(data));
          console.log("updated User", response.data);
          toast.success("User updated");
          history.push("/");
        });
    }
  };
  const closeCloseModel = () => {
    setShowModal(false);
  };

  return (
    <>
      <Row>
        <Col>
          <h2 style={{ paddingLeft: "10%" }}> Edit Profile </h2>
          <br />
          <Card className="edit-profile">
            <Card.Body>
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row className="m-3">
                  <h3>Personal Info</h3>
                  <PreviewImage setUploadImg={setUploadImg} img={user.imgSrc} />
                  <Form.Group as={Col} md="6">
                    <Form.Label>First Name </Form.Label>
                    <InputGroup hasValidation>
                      <Form.Control
                        type="text"
                        placeholder="First Name"
                        aria-describedby="inputGroupPrepend"
                        value={firstName}
                        defaultValue={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                      />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group as={Col} md="6">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Last Name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                  </Form.Group>
                </Row>
                <Row className="m-3">
                  <Form.Group as={Col} md="6">
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control
                      type="date"
                      value={dateOfBirth}
                      onChange={(e) => setDateOfBirth(e.target.value)}
                      required
                    />
                  </Form.Group>
                </Row>
                {user.type === "customer" && (
                  <Row style={{ paddingLeft: "30px" }}>
                    <Form.Group as={Col} md="5">
                      <Form.Label>Preferences</Form.Label>

                      <Select
                        options={tagOptions}
                        value={tags}
                        onChange={setTags}
                        isSearchable={true}
                        isMulti={true}
                      />
                    </Form.Group>
                  </Row>
                )}
                <hr />

                <Row className="m-3">
                  <h3>Contact Info</h3>
                  <Form.Group as={Col} md="6">
                    <Form.Label>Phone #</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group as={Col} md="6">
                    <Form.Label>Street</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Street"
                      defaultValue={street}
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group as={Col} md="6">
                    <Form.Label>Province</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Province"
                      defaultValue={province}
                      value={province}
                      onChange={(e) => setProvince(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group as={Col} md="6">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="City"
                      defaultValue={city}
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Row className="justify-content-center mt-5">
                    <Col md={3}>
                      <p
                        style={{
                          color: "blue",
                          textDecoration: "underline",
                          cursor: "pointer",
                        }}
                        onClick={() => setShowModal(true)}
                      >
                        Change Password
                      </p>
                    </Col>
                    <MyModal
                      size="md"
                      show={showModal}
                      heading="Change Password"
                      onClose={closeCloseModel}
                    >
                      <Row className="justify-content-center">
                        <Row className="mt-3">
                          {error && <Message>{error}</Message>}
                          <Form.Group as={Col}>
                            <Form.Label>Old Password</Form.Label>
                            <Form.Control
                              type="password"
                              placeholder="Old Password"
                              value={oldPassword}
                              onChange={(e) => setOldPassword(e.target.value)}
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
                              value={newPassword}
                              onChange={(e) => setNewPassword(e.target.value)}
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
                              value={confirmPassword}
                              onChange={(e) =>
                                setConfirmPassword(e.target.value)
                              }
                              required
                            />
                            <Form.Control.Feedback type="invalid">
                              Please provide a valid Email.
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Row>
                      </Row>
                      <Row className="mx-5 mt-3">
                        <Button onClick={passwordChangeHandler}>
                          Change Password
                        </Button>
                      </Row>
                    </MyModal>
                  </Row>
                </Row>
                <hr />
                <Row className="edit-button">
                  <Button type="submit">Edit Profile</Button>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Profile;
