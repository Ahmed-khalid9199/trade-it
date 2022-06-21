import React from "react";
import { Card } from "react-bootstrap";

const TradeHistory = ({ list }) => {
  return (
    <div>
      {list?.map((item, index) => (
        <Card key={index}>
          <Card.Img className="cardImg" src="" />
          <Card.Img className="cardImg" src="" />
        </Card>
      ))}
    </div>
  );
};

export default TradeHistory;
