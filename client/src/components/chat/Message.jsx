import React from "react";

const Message = (props) => {
  return (
    <div
      className={`${
        props.self ? "chat-message-right" : "chat-message-left"
      }  pb-4`}
    >
      <div>
        <img
          src={props.src}
          className="rounded-circle mr-1"
          alt={props.from}
          width="40"
          height="40"
        />
        <div className="text-muted small text-nowrap mt-2">{props.time}</div>
      </div>
      <div
        className={`flex-shrink-1 bg-light ${
          props.self ? "right-message-body" : "left-message-body"
        } ${props.blocked ? "offensive-message" : ""} rounded py-2 px-3 mr-3`}
      >
        {props.text}
      </div>
      {props.blocked && <p className="offensive-warning">{props.blocked}</p>}
    </div>
  );
};

export default Message;
