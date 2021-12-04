import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import axios from "axios";
var cas = [
  {
    id: 1,
    title: "iphone 12",
    subtitle: "iphone 12 installments",
    shot: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/refurb-iphoneX-spacegray_FMT_WHH?wid=400&hei=400&fmt=jpeg&qlt=80&op_usm=0.5,0.5&.v=1546626271267",
    location: "korangi karachi",
  },
  {
    id: 2,
    title: "iphone 12",
    subtitle: "iphone 12 installments",
    shot: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/refurb-iphoneX-spacegray_FMT_WHH?wid=400&hei=400&fmt=jpeg&qlt=80&op_usm=0.5,0.5&.v=1546626271267",
    location: "korangi karachi",
  },
  {
    id: 3,
    title: "iphone 12",
    subtitle: "iphone 12 installments",
    shot: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/refurb-iphoneX-spacegray_FMT_WHH?wid=400&hei=400&fmt=jpeg&qlt=80&op_usm=0.5,0.5&.v=1546626271267",
    location: "korangi karachi",
  },
  {
    id: 4,
    title: "iphone 12",
    subtitle: "iphone 12 installments",
    shot: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/refurb-iphoneX-spacegray_FMT_WHH?wid=400&hei=400&fmt=jpeg&qlt=80&op_usm=0.5,0.5&.v=1546626271267",
    location: "korangi karachi",
  },
  {
    id: 5,
    title: "iphone 12",
    subtitle: "iphone 12 installments",
    shot: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/refurb-iphoneX-spacegray_FMT_WHH?wid=400&hei=400&fmt=jpeg&qlt=80&op_usm=0.5,0.5&.v=1546626271267",
    location: "korangi karachi",
  },
  {
    id: 6,
    title: "iphone 12",
    subtitle: "iphone 12 installments",
    shot: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/refurb-iphoneX-spacegray_FMT_WHH?wid=400&hei=400&fmt=jpeg&qlt=80&op_usm=0.5,0.5&.v=1546626271267",
    location: "korangi karachi",
  },
  {
    id: 7,
    title: "iphone 12",
    subtitle: "iphone 12 installments",
    shot: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/refurb-iphoneX-spacegray_FMT_WHH?wid=400&hei=400&fmt=jpeg&qlt=80&op_usm=0.5,0.5&.v=1546626271267",
    location: "korangi karachi",
  },
  {
    id: 8,
    title: "iphone 12",
    subtitle: "iphone 12 installments",
    shot: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/refurb-iphoneX-spacegray_FMT_WHH?wid=400&hei=400&fmt=jpeg&qlt=80&op_usm=0.5,0.5&.v=1546626271267",
    location: "korangi karachi",
  },
  {
    id: 9,
    title: "iphone 12",
    subtitle: "iphone 12 installments",
    shot: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/refurb-iphoneX-spacegray_FMT_WHH?wid=400&hei=400&fmt=jpeg&qlt=80&op_usm=0.5,0.5&.v=1546626271267",
    location: "korangi karachi",
  },
  {
    id: 10,
    title: "iphone 12",
    subtitle: "iphone 12 installments",
    shot: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/refurb-iphoneX-spacegray_FMT_WHH?wid=400&hei=400&fmt=jpeg&qlt=80&op_usm=0.5,0.5&.v=1546626271267",
    location: "korangi karachi",
  },
  {
    id: 11,
    title: "iphone 12",
    subtitle: "iphone 12 installments",
    shot: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/refurb-iphoneX-spacegray_FMT_WHH?wid=400&hei=400&fmt=jpeg&qlt=80&op_usm=0.5,0.5&.v=1546626271267",
    location: "korangi karachi",
  },
];

const Cards = ({ loadMore, setShowLoadMore }) => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/getproducts/${products.length}`)
      .then((result) => {
        console.log("data", result.data);
        setProducts((prev) => [...prev, ...result.data.products]);
        setShowLoadMore(result.data.remainingProducts !== 0);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [loadMore]);
  console.log(products);
  return (
    <div
      style={{ display: "grid", gridTemplateColumns: "auto auto auto auto" }}
    >
      {products.map((product) => (
        <Card
          className="my-card"
          style={{
            width: "auto",
            height: "auto",
            border: "dark",
          }}
        >
          <Card.Img className="card-img" src={product.images[0]} />

          <Card.Body>
            <Card.Title>{product.title}</Card.Title>
            <hr />
            <Card.Text className="">{product.description}</Card.Text>
            <Card.Text className="">{product.subtitle}</Card.Text>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default Cards;
