import React, { useState, useEffect } from "react";
import "./chat.css";
import { Col, Form, Button, Card, Row } from "react-bootstrap";
import Message from "./Message";
import ChatIcon from "./ChatIcon";

import { useParams } from "react-router-dom";

import axios from "axios";

import { useSelector } from "react-redux";

import avatar from "../../assets/images/avatar.png";

// const chats = [
//   {
//     imgSrc: "https://bootdey.com/img/Content/avatar/avatar5.png",
//     title: "Vanessa Tucker",
//     badge: 5,
//     _id: "123",
//   },
//   {
//     imgSrc: "https://bootdey.com/img/Content/avatar/avatar3.png",
//     title: "Sharon Lessman",
//     badge: 0,
//     _id: "124",
//   },
// ];

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState();
  console.log(currentChat);
  const params = useParams();

  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (params.chatid !== "thread") {
      setCurrentChat({
        selfImgSrc: "https://bootdey.com/img/Content/avatar/avatar1.png",
        otherImgSrc: "https://bootdey.com/img/Content/avatar/avatar3.png",
        self: "Chris Wood",
      });
      setMessages([
        {
          text: "Hello",
          from: "Chris Wood",
          createdAt: "2:33 am",
        },
        {
          text: "Hi! How are you?",
          from: "Sharon Lessman",
          createdAt: "2:34 am",
        },
      ]);
    }
  }, [params.chatid]);

  //run on mount
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/getchats/${user._id}`)
      .then((result) => {
        const newChats = result.data.map((item) => ({
          title: item.user2.username,
          imgSrc: avatar,
          badge: item.unRead,
          _id: item._id,
        }));
        setChats(newChats);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user._id]);

  const sendMessage = async () => {
    if (!text) {
      return;
    }
    const message = {
      text: text,
      from: "Chris Wood",
      createdAt: "2:33 am",
    };
    setText("");
    setMessages((prev) => [...prev, message]);
    // send req (save in database) and emit on socket.
    const result = await axios.post(`${process.env}/sendmessage`, { message });
    console.log("message", result);
  };

  return (
    <div className="test">
      <Card className="chat__body">
        <Row className="g-0">
          <Col className="col-3 chat__sidebar border-right">
            <div className="px-4 d-none d-md-block">
              <div className="d-flex align-items-center">
                <div className="flex-grow-1">
                  <input
                    type="text"
                    className="form-control my-3"
                    placeholder="Search..."
                  />
                </div>
              </div>
            </div>

            <div className="current-chats">
              {chats &&
                chats.map((item, index) => {
                  return (
                    <ChatIcon
                      key={index}
                      imgSrc={item.imgSrc}
                      title={item.title}
                      badge={item.badge}
                      chatId={item._id}
                      active={item._id === params.chatid}
                    />
                  );
                })}
            </div>
          </Col>

          {params.chatid !== "thread" && (
            <Col className="col-9">
              <div className=" py-2 px-4 border-bottom d-none d-lg-block">
                <div className=" d-flex align-items-center py-1">
                  <div className="position-relative">
                    <img
                      src="https://bootdey.com/img/Content/avatar/avatar3.png"
                      className="rounded-circle mr-1"
                      alt="Sharon Lessman"
                      width="40"
                      height="40"
                    />
                  </div>
                  <div className="flex-grow-1 pl-3">
                    <strong style={{ paddingLeft: "5px" }}>
                      {/* {currentChat && currentChat.other} */}
                      Sharon Lessman
                    </strong>
                    {/* <div className="text-muted small">
                    <em>Typing...</em>
                  </div> */}
                  </div>
                </div>
              </div>
              <div className="position-relative">
                <div className="chat-messages p-4">
                  {messages &&
                    messages.map((item, index) => (
                      <Message
                        key={index}
                        src={
                          currentChat.self === item.from
                            ? currentChat.selfImgSrc
                            : currentChat.otherImgSrc
                        }
                        from={item.from}
                        time={item.createdAt}
                        text={item.text}
                        self={currentChat.self === item.from ? true : false}
                      />
                    ))}
                </div>
              </div>

              <div className="flex-grow-0 py-3 px-4 border-top ">
                <div className="input-group chat-input">
                  <Form.Control
                    as="textarea"
                    placeholder="Type message here..."
                    onChange={(e) => setText(e.currentTarget.value)}
                    value={text}
                  />
                  <Button onClick={sendMessage}>Send</Button>
                </div>
              </div>
            </Col>
          )}

          {params.chatid === "thread" && (
            <Col className="col-9">
              <div className="welcome-box py-2 px-4 d-none d-lg-block">
                <center>
                  <h1 className="welcome-chat">Welcom to your Inbox</h1>
                </center>
              </div>
            </Col>
          )}
        </Row>
      </Card>
    </div>
  );
};

export default Chat;
