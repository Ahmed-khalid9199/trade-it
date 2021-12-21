import React, { useEffect, useState } from "react";
import "./EditProduct.css";
import { Form, Button, Card, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import axios from "axios";
import MySelect from "../components/UI/MySelect";
import { useParams } from "react-router";

const makeValue = (string) => {
  if (string) {
    return {
      value: string,
      label: string.charAt(0).toUpperCase() + string.slice(1),
    };
  }
  return null;
};

const EditProduct = () => {
  const style = {
    margin: "3% 20%",
    padding: "25px",
  };
  const [product, setProduct] = useState("");

  const [pcity, setPCity] = useState(null);
  const [validated, setValidated] = useState(false);
  const params = useParams();

  let history = useHistory();

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    setValidated(true);
    event.preventDefault();

    if (form.checkValidity() === false) {
      event.stopPropagation();
      console.log("issue", pcity);
      return;
    }
    const formData = new FormData(event.currentTarget);
    const formDataObj = Object.fromEntries(formData.entries());
    console.log({ ...formDataObj, city: pcity.value });

    await axios
      .post(
        `${process.env.REACT_APP_SERVER_URL}/updateproduct/${params.productid}`,
        { ...formDataObj, city: pcity.value }
      )
      .then((response) => {
        console.log("updated product", response.data);
      });
    console.log("edit submit");
    history.replace("/");
  };
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/getproduct/${params.productid}`)
      .then(({ data }) => {
        console.log("get data", data);
        setProduct(data);
        setPCity(makeValue(data.city));
      })
      .catch((err) => {
        console.log("get product crashed", err);
      });
  }, [params.productid]);
  console.log("prodct", product);
  return (
    <div style={style}>
      <Card>
        <Card.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <center>
              <h2>EDIT PRODUCT</h2>
            </center>
            <hr />
            <Card.Title>Product Info</Card.Title>
            <h5> Add product location:</h5>
            <div style={{ marginLeft: "-30px" }}>
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

            <Form.Group className="mb-3" controlId="title">
              <Form.Label>Add title *</Form.Label>
              <Form.Control
                defaultValue={product && product.title}
                type="text"
                placeholder="Enter Title"
                name="title"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Discription *</Form.Label>
              <Form.Control
                defaultValue={product && product.description}
                type="text"
                placeholder="Enter Description"
                style={{ height: "100px" }}
                name="description"
              />
            </Form.Group>

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
  );
};

export default EditProduct;
