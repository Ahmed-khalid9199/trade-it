import React from "react";
import { Card } from "react-bootstrap";

import HistoryCard from "./HistoryCard";

const TradeHistory = ({ list }) => {
  console.log("list", list);
  return (
    <div>
      {list?.map((item, index) => (
        <HistoryCard item={item} />
      ))}
    </div>
  );
};

export default TradeHistory;
