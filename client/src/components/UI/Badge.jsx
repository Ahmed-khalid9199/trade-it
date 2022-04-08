import React from "react";
import "./badge.css";
const Badge = ({ type, text }) => {
  return (
    <div className={`badge ${type ? type : "bdg-default"}`}>
      <center>{`${text}`}</center>
    </div>
  );
};

export default Badge;
