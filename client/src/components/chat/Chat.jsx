import React, { useState, useEffect, useRef } from "react";
import "./chat.css";
import { Col, Form, Button, Card, Row } from "react-bootstrap";
import Message from "./Message";
import ChatIcon from "./ChatIcon";

import { useParams } from "react-router-dom";

import axios from "axios";

import { useSelector } from "react-redux";

import avatar from "../../assets/images/avatar.png";

import { io } from "socket.io-client";

import moment from "moment";

let socket = null;

const otherImg = "https://bootdey.com/img/Content/avatar/avatar5.png";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const params = useParams();
  const scrollRef = useRef();

  const [newMessage, setNewMessage] = useState("");

  const { user } = useSelector((state) => state.user);
  // recieve message
  useEffect(() => {
    socket = io(`${process.env.REACT_APP_SERVER_URL}`);
    socket.on("getMessage", (message) => {
      setNewMessage(message);
    });
  }, [user.username]);

  useEffect(() => {
    const chatOpened = currentChat?.members.some(
      (item) => item._id === newMessage.sender
    );
    if (newMessage && chatOpened) {
      setMessages((prev) => [...prev, newMessage]);
    } else {
      // set unread chats
      // setChats((prev) =>
      //   prev.map((item) => {
      //     const targetChat = item.members.some(
      //       (item) => item._id === newMessage.sender
      //     );
      //     if (targetChat) {
      //       axios.put(
      //         `${process.env.REACT_APP_SERVER_URL}/updatechat/${item._id}`,
      //         { unRead: item.unRead + 1 }
      //       );
      //       return { ...item, unRead: item.unRead + 1 };
      //     } else {
      //       return item;
      //     }
      //   })
      // );
    }
  }, [newMessage, currentChat]);
  useEffect(() => {
    socket.emit("addUser", user.username);
    socket.on("getUsers", (users) => {
      setOnlineUsers(users.map((item) => item.username));
    });
  }, [user]);

  // current chat
  useEffect(() => {
    if (params.chatid !== "thread") {
      // get chat
      axios
        .get(`${process.env.REACT_APP_SERVER_URL}/getchat/${params.chatid}`)
        .then(({ data }) => {
          setCurrentChat({
            ...data.chat,
            title: data.chat.members.find(
              (item) => item.uername !== user.username
            ).username,
          });
          setMessages(data.messages);
        })
        .catch((err) => console.log(err));
    }
  }, [params.chatid]);

  //run on mount get chats
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/getchats/${user._id}`)
      .then((result) => {
        const newChats = result.data.map((item) => ({
          title: item.members.find((item) => item.username !== user.username)
            .username,
          imgSrc: avatar,
          ...item,
        }));
        setChats(newChats);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user._id, user.username]);

  const sendMessage = async () => {
    if (!text) {
      return;
    }

    // check profanity
    // const profanity = axios.post("", text);
    const { blocked, tag } = { blocked: false, tag: "not offensive" };
    
    const tempMessage = {
      text: text,
      sender: user._id,
      chat: currentChat._id,
      blocked,
      tag,
    };
    // send req (save in database) and emit on socket.
    axios.post(`${process.env.REACT_APP_SERVER_URL}/sendmessage`, tempMessage);
    setText("");
    setMessages((prev) => [...prev, tempMessage]);
    if (!blocked) {
      socket.emit("sendMessage", {
        receiverId: currentChat.members.find((member) => {
          return member._id !== user._id;
        }).username,
        // message: result.data,
        message: tempMessage,
      });
    }
  };

  // scroll to bottom
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // send text on enter
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
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
            <hr />

            <div key={onlineUsers} className="current-chats">
              {chats &&
                chats.map((item, index) => {
                  return (
                    <ChatIcon
                      key={index}
                      imgSrc={otherImg}
                      title={item.title}
                      badge={0}
                      chatId={item._id}
                      active={item._id === params.chatid}
                      online={onlineUsers.includes(item.title)}
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
                      src="https://bootdey.com/img/Content/avatar/avatar5.png"
                      className="rounded-circle mr-1"
                      alt="Sharon Lessman"
                      width="40"
                      height="40"
                    />
                  </div>
                  <div className="flex-grow-1 pl-3">
                    <strong style={{ paddingLeft: "5px" }}>
                      {currentChat &&
                        currentChat.members.find((member) => {
                          return member._id !== user._id;
                        }).username}
                    </strong>
                  </div>
                </div>
              </div>
              <div className="position-relative">
                <div className="chat-messages p-4">
                  {messages &&
                    messages
                      .filter(
                        (item) => !(user._id !== item.sender && item.blocked)
                      )
                      .map((item, index) => (
                        <div ref={scrollRef}>
                          <Message
                            key={index}
                            src={user._id === item.sender ? avatar : otherImg}
                            sender={item.sender}
                            time={moment(item.createdAt).format("h:mm")}
                            text={item.text}
                            self={user._id === item.sender}
                            blocked={item.blocked ? item.tag : ""}
                          />
                        </div>
                      ))}
                </div>
              </div>

              <div className="flex-grow-0 py-3 px-4 border-top ">
                <div className="input-group chat-input">
                  <Form.Control
                    as="textarea"
                    placeholder="Type message here..."
                    onKeyDown={handleKeyDown}
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
