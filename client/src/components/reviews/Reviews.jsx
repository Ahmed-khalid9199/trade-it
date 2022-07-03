import React, { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import Rating from "react-rating";
import avatar from "../../assets/images/avatar.png";

const Review = ({ img, link, name, text, date, rating = 5 }) => {
  return (
    <>
      <div className="d-flex justify-content-center">
        <Rating
          emptySymbol={
            <i
              className="bx bx-star"
              style={{ color: "yellow", fontSize: "2rem" }}
            ></i>
          }
          fullSymbol={
            <i
              className="bx bxs-star"
              style={{ color: "yellow", fontSize: "2rem" }}
            ></i>
          }
          initialRating={rating}
          readonly
        />
        <h4 style={{ margin: "5px" }}>{rating}</h4>
      </div>
      <div className="chat-message-left pb-4">
        <div>
          <img
            src={avatar}
            className="rounded-circle mr-1 chat-img"
            // alt={name}
            width="40"
            height="40"
          />
          {/* <div className="text-muted small text-nowrap mt-2">{date}</div> */}
        </div>
        <div className="flex-shrink-1 bg-light left-message-body rounded py-2 px-3 mr-3">
          {text}
        </div>
      </div>
    </>
  );
};

const Reviews = () => {
  const [rating, setRating] = useState(0);
  return (
    <div>
      <div
        className="d-flex justify-content-start "
        style={{ margin: "0 0 20px" }}
      >
        <img
          src={avatar}
          className="rounded-circle mr-1 chat-img mr-2"
          style={{ height: "50px", width: "50px" }}
        />
        <Rating
          emptySymbol={
            <i
              className="bx bx-star"
              style={{ color: "yellow", fontSize: "2rem" }}
            ></i>
          }
          fullSymbol={
            <i
              className="bx bxs-star"
              style={{ color: "yellow", fontSize: "2rem" }}
            ></i>
          }
          onChange={(value) => {
            setRating(value);
          }}
          initialRating={rating}
        />
        <h4 style={{ margin: "5px" }}>{rating}</h4>
      </div>
      <div className="input-group chat-input ">
        <Form.Control
          as="textarea"
          placeholder="Type message here..."
          // onKeyDown={handleKeyDown}
          onChange={(e) => console.log(e.currentTarget.value)}
          // value={text}
        />
        <Button onClick={() => {}}>POST</Button>
      </div>

      {/* reviews */}
      <Card>
        <Review
          img={avatar}
          text="hello"
          name="test"
          date={new Date()}
          rating={5}
        />
      </Card>
    </div>
  );
};

export default Reviews;
