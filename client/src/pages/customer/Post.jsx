import React, { useState, useEffect } from "react";
import { Form, Button, Card, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import axios from "axios";
import ImageUploader from "react-images-upload";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/user";
import MySelect from "../../components/UI/MySelect";
import CreatableSelect from "react-select/creatable";

import TAGS from "../../assets/JsonData/tags.json";

const style = {
  margin: "3% 20%",
  padding: "25px",
};

const makeStrArr = (valueArr) => {
  return valueArr.map((item) => item.value);
};

const makeValue = (string) => {
  if (string) {
    return {
      value: string.toLowerCase(),
      label: string.charAt(0).toUpperCase() + string.slice(1),
    };
  }
  return null;
};

function Post() {
  const [title, setTitle] = useState("");
  const [pcity, setPCity] = useState(null);
  const [description, setDescription] = useState("");
  const [validated, setValidated] = useState(false);
  const [pictures, setPictures] = useState([]);
  const [tags, setTags] = useState("");
  const [tagOptions, setTagOptions] = useState(TAGS);

  const dispatch = useDispatch();

  let history = useHistory();

  const { user } = useSelector((state) => state.user);
  const [phone, setPhone] = useState(user ? user.phoneNumber : "");
  const [street, setStreet] = useState(user ? user.street : "");

  const onDrop = (picture) => {
    setPictures((prev) => {
      return prev.concat(picture);
    });
  };

  useEffect(() => {
    setPCity(makeValue(user.city));
  }, [user]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/gettags`)
      .then(({ data }) => {
        setTagOptions(data);
      });
  }, []);

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

    if (form.checkValidity() === false || !tags) {
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
      city: pcity.value,
      tags: makeStrArr(tags),
    };
    await axios.post(`${process.env.REACT_APP_SERVER_URL}/post`, Product);

    await axios
      .put(`${process.env.REACT_APP_SERVER_URL}/updateuser/${user._id}`, {
        phoneNumber: phone,
        street: street,
        city: pcity.value,
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
  const handleTagsChange = async (newValue, actionMeta) => {
    console.log(newValue, actionMeta.action);
    setTags(newValue);
    if (actionMeta.action === "create-option") {
      setTagOptions((prev) => [...prev, newValue[newValue.length - 1]]);
      await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/newtag`,
        newValue[newValue.length - 1]
      );
    }
  };
  console.log(tagOptions);
  return (
    <>
      <div style={style}>
        <Card>
          <Card.Body>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <center>
                <h2>POST YOUR ADD</h2>
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
                  required
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
                  required
                />
              </Form.Group>

              <Form.Label>Tags *</Form.Label>
              <CreatableSelect
                options={tagOptions}
                value={tags}
                onChange={handleTagsChange}
                isSearchable={true}
                isMulti={true}
              />
              <br />
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
                <Form.Group as={Col} md="6">
                  <Form.Label>City</Form.Label>

                  <div style={{ marginTop: "-10px" }}>
                    <MySelect
                      isMulti={false}
                      value={pcity}
                      onChange={setPCity}
                      options={[
                        { label: "Lahore ", value: "lahore" },
                        { label: "Karachi ", value: "karachi" },
                        { label: "Islamabad ", value: "islamabad" },
                      ]}
                    />
                  </div>
                </Form.Group>
              </Row>
              <Row>
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
