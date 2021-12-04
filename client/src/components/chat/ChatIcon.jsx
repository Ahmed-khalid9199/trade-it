import React from "react";
import { Link } from "react-router-dom";
const ChatIcon = (props) => {
  return (
    <Link
      to={`/inbox/${props.chatId}`}
      className={`list-group-item list-group-item-action border-0 ${
        props.active ? "active-chat" : ""
      }`}
    >
      <div className="d-flex align-items-start ">
        <img
          src={props.imgSrc}
          className="rounded-circle mr-1"
          alt={props.title}
          width="40"
          height="40"
        />

        <div style={{ paddingLeft: "5px" }} className="flex-grow-1 ml-3">
          {props.title}
          {props.online && <div className="chat-online"></div>}
        </div>

        {props.badge > 0 ? (
          <div className="badge bg-success float-right">{props.badge}</div>
        ) : (
          ""
        )}
      </div>
    </Link>
  );
};

export default ChatIcon;
