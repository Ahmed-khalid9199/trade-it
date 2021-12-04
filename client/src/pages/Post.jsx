import React, { useState, useEffect, Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Form, Button, Card, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import axios from "axios";
import FileBase64 from "react-file-base64";
import ImageUploader from "react-images-upload";

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

function Post() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [usernameIsValid, setUsernameIsValid] = useState(null);

  const [email, setEmail] = useState("");
  const [validated, setValidated] = useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passIsValid, setPassIsValid] = useState(true);
  const [pictures, setPictures] = useState([]);
  let history = useHistory();

  const onDrop = (picture) => {
    setPictures((prev) => {
      return prev.concat(picture);
    });
  };

  const uploadImages = async (files) => {
    var urls = [];
    for (const file of Object.entries(files)) {
      console.log("file", file[1]);
      var avatarData = new FormData();
      avatarData.append("file", file[1]);
      avatarData.append("upload_preset", "czwbybpu");
      var data = await axios.post(
        "https://api.cloudinary.com/v1_1/dmwkic1oe/image/upload",
        avatarData
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
    };
    const response = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/post`,
      Product
    );
    // history.replace("/");
    console.log("response", response);
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
