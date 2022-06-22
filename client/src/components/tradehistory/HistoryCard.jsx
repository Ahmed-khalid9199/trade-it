import React from "react";
import { Image, Row, Col, Card } from "react-bootstrap";

import "./historycard.css";
import moment from "moment";

const HistoryCard = ({ item }) => {
  const { img, title, tradeProdImg, tradeProdTitle, tradedAt } = item;
  console.log(tradedAt);

  return (
    <Card className="container hcontainer">
      <Row className="wrapper">
        <Col md={5} className="image-box">
          <Row>
            <Col md={6}>
              <Image fluid className="himage" src={img} />
            </Col>
            <Col md={6}>
              <Card.Text style={{ minWidth: "100px" }}>
                {title} asd asd asd
              </Card.Text>
            </Col>
          </Row>
        </Col>
        <Col md={2} className="arrow-icon">
          <Image
            fluid
            className="image"
            src="https://www.iconpacks.net/icons/2/free-arrow-right-icon-2817-thumb.png"
          />
        </Col>
        <Col md={5} className="image-box">
          <Row>
            <Col md={6}>
              <Image fluid className="himage" src={tradeProdImg} />
            </Col>
            <Col md={6}>
              <Card.Text style={{ minWidth: "100px", paddingLeft: "0" }}>
                {tradeProdTitle}
              </Card.Text>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Card.Text style={{ marginLeft: "1%" }}>
          Traded at: {moment(new Date(item.tradedAt)).format("ll")}
        </Card.Text>
      </Row>
    </Card>
  );
};

export default HistoryCard;
