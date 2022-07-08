import moment from "moment";
import React, { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import Rating from "react-rating";
import avatar from "../../assets/images/avatar.png";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router";

const Review = ({ img, link, name, text, date, rating = 5 }) => {
  return (
    <Card className="p-2">
      <div className="d-flex justify-content-start">
        <div>
          <img
            src={img}
            className="rounded-circle mr-1 chat-img"
            width="40"
            height="40"
          />
        </div>
        <h4 className="m-1 ml-2">{name}</h4>
        <i
          className="bx bxs-star ml-2"
          style={{ color: "yellow", fontSize: "2rem" }}
        ></i>
        <h4 style={{ margin: "5px" }}>{rating}</h4>
        <div className="text-muted small text-nowrap m-1 ml-2">{date}</div>
      </div>

      <p className="ml-10">{text}</p>
    </Card>
  );
};

const Reviews = ({ setRefresh }) => {
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");

  const [reviews, setReviews] = useState([]);
  const [canReview, setCanReview] = useState(false);
  const params = useParams();

  const user = useSelector((state) => state.user);
  const handleSubmit = async () => {
    if (!canReview) {
      toast.error("Looks like you have already posted a review on this user.");
      return;
    }
    // post review
    const res = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/reviews`,
      { user: user.user._id, reviewee: params.userid, text, rating }
    );
    if (res.status === 201) {
      toast.success("Review posted sucessfully");
      setReviews((prev) => [{ ...res.data, user: user.user }, ...prev]);
      setCanReview(false);
      setText("");
      setRating(0);
      setRefresh((prev) => prev + 1);
    } else {
      toast.error(res.data.message);
    }
  };
  useEffect(() => {
    // fetch reviews
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/reviews/10000/0`, {
        reviewee: params.userid,
      })
      .then(({ data }) => {
        const tempReview = data.data;
        setReviews(tempReview);
        setCanReview(!tempReview.some((r) => r.user._id === user?.user._id));
      });
  }, []);
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };
  return (
    <div>
      {user?.user._id !== params.userid && (
        <>
          <div
            className="d-flex justify-content-start "
            style={{ margin: "0 0 20px" }}
          >
            <img
              src={avatar}
              className="rounded-circle mr-1 chat-img mr-2"
              style={{ height: "50px", width: "50px" }}
            />
            <h4 className="m-1 ml-2">{user?.user.username}</h4>

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
          <div className="input-group chat-input ml-2">
            <Form.Control
              as="textarea"
              placeholder="Type message here..."
              onKeyDown={handleKeyDown}
              onChange={(e) => setText(e.currentTarget.value)}
              value={text}
            />
            <Button disabled={rating === 0} onClick={handleSubmit}>
              POST
            </Button>
          </div>
        </>
      )}
      {/* reviews */}
      {reviews.map((item, index) => {
        return (
          <Review
            img={item.user.imgSrc ? item.user.imgSrc : avatar}
            text={item.text}
            name={item.user.username}
            date={moment(item.createdAt).format("YYYY-MM-DD")}
            rating={item.rating}
          />
        );
      })}
      {reviews.length === 0 && <h2>No reviews yet.</h2>}
    </div>
  );
};

export default Reviews;
