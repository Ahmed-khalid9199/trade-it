import React from "react";
// import Card from "./card";
import { Card } from "react-bootstrap";

// import { Link } from 'react-router-dom';
// import {store} from '../store/action';
//generates random id;
let guid = () => {
  let s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  };
  //return id of format 'aaaaaaaa'-'aaaa'-'aaaa'-'aaaa'-'aaaaaaaaaaaa'
  return (
    s4() +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    s4() +
    s4()
  );
};

// console.log(guid());
//"c2181edf-041b-0a61-3651-79d671fa3db7"

var cas = [
  {
    id: guid(),
    title: "iphone 12",
    subtitle: "iphone 12 installments",
    shot: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/refurb-iphoneX-spacegray_FMT_WHH?wid=400&hei=400&fmt=jpeg&qlt=80&op_usm=0.5,0.5&.v=1546626271267",
    location: "korangi karachi",
  },
  {
    id: guid(),
    title: "iphone 12",
    subtitle: "iphone 12 installments",
    shot: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/refurb-iphoneX-spacegray_FMT_WHH?wid=400&hei=400&fmt=jpeg&qlt=80&op_usm=0.5,0.5&.v=1546626271267",
    location: "korangi karachi",
  },
  {
    id: guid(),
    title: "iphone 12",
    subtitle: "iphone 12 installments",
    shot: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/refurb-iphoneX-spacegray_FMT_WHH?wid=400&hei=400&fmt=jpeg&qlt=80&op_usm=0.5,0.5&.v=1546626271267",
    location: "korangi karachi",
  },
  {
    id: guid(),
    title: "iphone 12",
    subtitle: "iphone 12 installments",
    shot: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/refurb-iphoneX-spacegray_FMT_WHH?wid=400&hei=400&fmt=jpeg&qlt=80&op_usm=0.5,0.5&.v=1546626271267",
    location: "korangi karachi",
  },
  {
    id: guid(),
    title: "iphone 12",
    subtitle: "iphone 12 installments",
    shot: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/refurb-iphoneX-spacegray_FMT_WHH?wid=400&hei=400&fmt=jpeg&qlt=80&op_usm=0.5,0.5&.v=1546626271267",
    location: "korangi karachi",
  },
  {
    id: guid(),
    title: "iphone 12",
    subtitle: "iphone 12 installments",
    shot: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/refurb-iphoneX-spacegray_FMT_WHH?wid=400&hei=400&fmt=jpeg&qlt=80&op_usm=0.5,0.5&.v=1546626271267",
    location: "korangi karachi",
  },
  {
    id: guid(),
    title: "iphone 12",
    subtitle: "iphone 12 installments",
    shot: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/refurb-iphoneX-spacegray_FMT_WHH?wid=400&hei=400&fmt=jpeg&qlt=80&op_usm=0.5,0.5&.v=1546626271267",
    location: "korangi karachi",
  },
  {
    id: guid(),
    title: "iphone 12",
    subtitle: "iphone 12 installments",
    shot: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/refurb-iphoneX-spacegray_FMT_WHH?wid=400&hei=400&fmt=jpeg&qlt=80&op_usm=0.5,0.5&.v=1546626271267",
    location: "korangi karachi",
  },
  {
    id: guid(),
    title: "iphone 12",
    subtitle: "iphone 12 installments",
    shot: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/refurb-iphoneX-spacegray_FMT_WHH?wid=400&hei=400&fmt=jpeg&qlt=80&op_usm=0.5,0.5&.v=1546626271267",
    location: "korangi karachi",
  },
  {
    id: guid(),
    title: "iphone 12",
    subtitle: "iphone 12 installments",
    shot: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/refurb-iphoneX-spacegray_FMT_WHH?wid=400&hei=400&fmt=jpeg&qlt=80&op_usm=0.5,0.5&.v=1546626271267",
    location: "korangi karachi",
  },
  {
    id: guid(),
    title: "iphone 12",
    subtitle: "iphone 12 installments",
    shot: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/refurb-iphoneX-spacegray_FMT_WHH?wid=400&hei=400&fmt=jpeg&qlt=80&op_usm=0.5,0.5&.v=1546626271267",
    location: "korangi karachi",
  },
];

function cs() {
  return (
    <div
      style={{ display: "grid", gridTemplateColumns: "auto auto auto auto" }}
    >
      {cas.map((cas) => (
        // <Card tit={cas.title} subtit={cas.subtitle} pic={cas.shot} loc={cas.location} key={cas.id}/>
        <Card
          className="my-card"
          style={{
            width: "auto",
            height: "auto",
            border: "dark",
          }}
        >
          <Card.Img className="card-img" src={cas.shot} />

          <Card.Body>
            <Card.Title>{cas.title}</Card.Title>
            <hr />
            <Card.Text className="">{cas.location}</Card.Text>
            <Card.Text className="">{cas.subtitle}</Card.Text>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default cs;
