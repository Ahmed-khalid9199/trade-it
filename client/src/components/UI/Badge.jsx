import React from "react";
import "./badge.css";
const Badge = ({ type, text, className }) => {
  return (
    <div className={`badge ${type ? type : "bdg-default"} ${className}`}>
      <center>{`${text}`}</center>
    </div>
  );
};

export default Badge;
