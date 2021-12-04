import React, { useState } from "react";
import {
  Row,
  Col,
  Button,
  Form,
  InputGroup,
  Card,
  Image,
} from "react-bootstrap";
import TextArea from "../components/UI/TextArea";

const EditProduct = () => {
  const [validated, setValidated] = useState(false);
  const handleSubmit = async (event) => {};

  return (
    <Row>
      <h2> Edit Product </h2>
      <br />
      <Col>
        <Card>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="m-3">
              <h3>Images</h3>

              <Form.Group as={Col} md="6">
                <Form.Label>Ad Image:</Form.Label>
                <Form.Control
                  type="file"
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

            <hr />

            <Row className="m-3">
              <h3>Details</h3>

              <Form.Group as={Col} md="6">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="textarea"
                  placeholder="Title"
                  //   defaultValue={province}
                  //   value={province}
                  //   onChange={(e) => setProvince(e.target.value)}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid Province.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="6">
                <Form.Label>Secondary Title:</Form.Label>
                <Form.Control
                  type="textarea"
                  placeholder="Secondary Title:"
                  //   defaultValue={city}
                  //   value={city}
                  //   onChange={(e) => setCity(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group as={Col} md="6">
                <Form.Label>Details:</Form.Label>

                <TextArea
                  placeholder="Product Details.."
                  // value={comment}
                  // defaultValue={data.dispatcher_comment}
                  // onChange={(e) => setDispatcherComment(e.target.value)}
                  // ref={dispatcherCommentRef}
                />
              </Form.Group>
            </Row>
            <hr />
            <div className="edit-button">
              <Button type="submit" className="edit-button-1">
                Edit Product
              </Button>
            </div>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default EditProduct;
