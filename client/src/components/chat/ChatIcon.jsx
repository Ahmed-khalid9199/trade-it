import React from "react";

const ChatIcon = (props) => {
  return (
    <a href="#" className="list-group-item list-group-item-action border-0">
      <div className="d-flex align-items-start">
        <img
          src={props.imgSrc}
          className="rounded-circle mr-1"
          alt={props.title}
          width="40"
          height="40"
        />

        <div style={{ paddingLeft: "5px" }} className="flex-grow-1 ml-3">
          {props.title}
          {/* <div className="small">
              <span className="fas fa-circle chat-offline"></span> Offline
            </div> */}
        </div>

        {props.badge > 0 ? (
          <div className="badge bg-success float-right">{props.badge}</div>
        ) : (
          ""
        )}
      </div>
    </a>
  );
};

export default ChatIcon;
