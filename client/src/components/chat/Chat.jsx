import React, { useState, useEffect, useRef } from "react";
import "./chat.css";
import {
  Col,
  Form,
  Button,
  Card,
  Row,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import Message from "./Message";
import ChatIcon from "./ChatIcon";

import { useParams, useHistory } from "react-router-dom";

import axios from "axios";

import { useSelector } from "react-redux";

import avatar from "../../assets/images/avatar.png";

import { io } from "socket.io-client";

import moment from "moment";

import Modal from "../modals/MyModal";

let socket = null;

const otherImg = "https://bootdey.com/img/Content/avatar/avatar5.png";
let backUpProducts = [];

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const params = useParams();
  const scrollRef = useRef();

  const [showModal, setShowModal] = useState(false);

  const [newMessage, setNewMessage] = useState("");

  const { user } = useSelector((state) => state.user);

  const history = useHistory();

  // recieve message
  useEffect(() => {
    socket = io(`${process.env.REACT_APP_SERVER_URL}`);
    socket.on("getMessage", (message) => {
      setNewMessage(message);
    });
  }, [user.username]);

  useEffect(() => {
    const chatOpened = currentChat?._id === newMessage.chat;

    if (newMessage && chatOpened) {
      setMessages((prev) => [...prev, newMessage]);
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
          const other = data.chat.members.find(
            (item) => item.username !== user.username
          );
          console.log(data);
          setCurrentChat({
            ...data.chat,
            title: other.username,
            imgSrc: other.imgSrc ? other.imgSrc : otherImg,
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

    // check profanity\
    // const { data } = await axios.post("http://localhost:8081/", {
    //   text,
    // });
    // const { blocked, tag } = data;
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

  // disconnect user on unmount

  useEffect(() => () => socket.emit("logout"), []);

  // get my products
  const [myProducts, setMyProducts] = useState("");
  const [searchProducts, setSearchProducts] = useState("");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/getmyproducts/${user._id}`)
      .then((result) => {
        setMyProducts(result.data);
        backUpProducts = result.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const indentifier = setTimeout(handleSearch, 500);
    return () => {
      clearTimeout(indentifier);
    };
  }, [searchProducts]);
  const handleSearch = () => {
    if (searchProducts) {
      const newList = myProducts.filter(
        (item) =>
          item.title.includes(searchProducts) ||
          item.description.includes(searchProducts)
      );
      console.log("searching my products", newList);
      setMyProducts(newList);
    } else {
      console.log("clear search");
      setMyProducts(backUpProducts);
    }
  };

  const offerAd = async (productId) => {
    const result = await axios.put(
      `${process.env.REACT_APP_SERVER_URL}/offerad/${currentChat._id}`,
      { productId }
    );
    console.log(productId);
    console.log(result);
    setCurrentChat((prev) => ({ ...prev, products: result.data }));
    setShowModal(false);
  };
  const productClickHandler = (product) => {
    if (product.owner === user._id) {
      console.log("feature coming soon");
    } else {
      history.push(`/detail/${product._id}`);
    }
  };

  return (
    <div className="test">
      <Row>
        <Col lg={params.chatid === "thread" ? 12 : 10} className="chat-col">
          <Card className="chat__body">
            <Row>
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
                      const other = item.members.find(
                        (i) => i.username !== user.username
                      );

                      return (
                        <ChatIcon
                          key={index}
                          imgSrc={other.imgSrc ? other.imgSrc : otherImg}
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
                          src={
                            currentChat && currentChat.imgSrc
                              ? currentChat.imgSrc
                              : otherImg
                          }
                          className="rounded-circle mr-1 chat-img"
                          alt={currentChat && currentChat.title}
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
                            (item) =>
                              !(user._id !== item.sender && item.blocked)
                          )
                          .map((item, index) => (
                            <div ref={scrollRef}>
                              <Message
                                key={index}
                                src={
                                  user._id === item.sender
                                    ? user.imgSrc
                                      ? user.imgSrc
                                      : avatar
                                    : currentChat.imgSrc
                                    ? currentChat.imgSrc
                                    : otherImg
                                }
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
        </Col>{" "}
        {params.chatid !== "thread" && currentChat && (
          <Col lg={2} className="chat-col">
            {currentChat.products.map((item, index) => (
              <Card
                onClick={() => {
                  productClickHandler(item);
                }}
                key={index}
                className="chat-product-card"
              >
                <Card.Img src={item.images[0]} className="chat-prod-img" />

                <Card.Body>
                  <Card.Title>{item.title}</Card.Title>
                </Card.Body>
              </Card>
            ))}

            {myProducts && currentChat.products.length === 1 && (
              <center style={{ padding: "10px" }}>
                <Button
                  onClick={() => {
                    setShowModal(true);
                  }}
                >
                  Offer an Ad for trade
                </Button>
              </center>
            )}
          </Col>
        )}
      </Row>
      <Modal
        size="lg"
        show={showModal}
        heading="Select your Ad to offer for trade"
        onClose={() => {
          setShowModal(false);
        }}
      >
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Type to search your ads"
            aria-label="Type to search your ads"
            aria-describedby="basic-addon2"
            onChange={(e) => setSearchProducts(e.target.value)}
          />
          <Button>Search </Button>
        </InputGroup>

        <div className="my-prod-modal-container">
          {myProducts &&
            myProducts.map((item, index) => (
              <Card
                onClick={() => {
                  offerAd(item._id);
                }}
                id={index}
                className="my-prod-modal"
              >
                <Row>
                  <Col>
                    <Card.Img
                      src={item.images[0]}
                      className="my-prod-modal-img"
                    />
                  </Col>
                  <Col> {item.title}</Col>
                </Row>
              </Card>
            ))}
        </div>
      </Modal>
    </div>
  );
};

export default Chat;
