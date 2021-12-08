import React, { useState } from "react";
import { Form, Button, Card, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import axios from "axios";
import ImageUploader from "react-images-upload";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { userActions } from "../store/user";

const style = {
  margin: "3% 20%",
  padding: "25px",
};

function Post() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [validated, setValidated] = useState(false);
  const [pictures, setPictures] = useState([]);

  const dispatch = useDispatch();

  let history = useHistory();

  const { user } = useSelector((state) => state.user);
  const [firstName, setFirstName] = useState(user ? user.firstName : "");
  const [phone, setPhone] = useState(user ? user.phoneNumber : "");
  const [city, setCity] = useState(user ? user.city : "");
  const [street, setStreet] = useState(user ? user.street : "");

  const onDrop = (picture) => {
    setPictures((prev) => {
      return prev.concat(picture);
    });
  };

  const uploadImages = async (files) => {
    var urls = [];
    for (const file of Object.entries(files)) {
      console.log("file", file[1]);
      var productImages = new FormData();
      productImages.append("file", file[1]);
      productImages.append("upload_preset", "czwbybpu");
      var data = await axios.post(
        "https://api.cloudinary.com/v1_1/dmwkic1oe/image/upload",
        productImages
      );
      urls = [...urls, data.data.secure_url];
    }
    return urls;
  };

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    setValidated(true);
    event.preventDefault();

    if (form.checkValidity() === false) {
      event.stopPropagation();
      return;
    }

    console.log("picture", pictures);
    const urls = await uploadImages(pictures);
    console.log("urls", urls);

    // send req
    const Product = {
      title,
      description,
      images: urls,
      owner: user._id,
    };
    await axios.post(`${process.env.REACT_APP_SERVER_URL}/post`, Product);

    await axios
      .post(`${process.env.REACT_APP_SERVER_URL}/updateuser`, {
        id: user._id,
        firstName: firstName,
        phoneNumber: phone,
        street: street,
        city: city,
      })
      .then((response) => {
        let data = response.data;
        dispatch(userActions.login(data));
        localStorage.setItem("user", JSON.stringify(data));
        console.log("updated User", response.data);
      });
    console.log("edit submit");
    history.replace("/");
  };

  return (
    <>
      <div style={style}>
        <Card>
          <Card.Body>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <center>
                <h3>POST YOUR ADD</h3>
              </center>
              <hr />
              <Card.Title>Product Info</Card.Title>

              <Form.Group className="mb-3" controlId="title">
                <Form.Label>Add title *</Form.Label>
                <Form.Control
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                  type="text"
                  placeholder="Enter Title"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="description">
                <Form.Label>Discription *</Form.Label>
                <Form.Control
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  type="text"
                  placeholder="Enter Description"
                  style={{ height: "100px" }}
                />
              </Form.Group>
              <Form.Group controlId="producImages" className="mb-3">
                <Form.Label>Product Images</Form.Label>
                <ImageUploader
                  withIcon={true}
                  buttonText="Choose images"
                  onChange={onDrop}
                  imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                  maxFileSize={5242880}
                  withPreview={true}
                />
              </Form.Group>
              <hr />
              <Card.Title>REVIEW YOUR DETAILS</Card.Title>

              <Row>
                <Col md>
                  <Form.Group as={Col} md="6">
                    <Form.Label>First Name </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="First Name"
                      aria-describedby="inputGroupPrepend"
                      value={firstName}
                      defaultValue={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please choose a username.
                    </Form.Control.Feedback>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md>
                  <Form.Group as={Col} md="6">
                    <Form.Label>Phone #</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid Email.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md>
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
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid Street.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md>
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
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid City.
                    </Form.Control.Feedback>
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
