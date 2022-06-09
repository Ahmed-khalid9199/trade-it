import axios from "axios";
import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { Row, Col, Card } from "react-bootstrap";
import StatusCard from "../../components/status-card/StatusCard";

const Dashboard = () => {
  const [statusCards, setStatusCards] = useState({ products: 0, users: 0 });
  const [lineChart, setLineChart] = useState({
    productsByMonth: [],
    usersByMonth: [],
    months: [],
  });
  const series = [
    {
      name: "Products",
      data: lineChart.productsByMonth,
    },
    {
      name: "users",
      data: lineChart.usersByMonth,
    },
  ];
  const options = {
    chart: {
      height: 350,
      type: "line",
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
    },
    title: {
      text: "Trends by Month",
      align: "left",
    },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: lineChart.months,
    },
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/products/gettotal`)
      .then((res) =>
        setStatusCards((prev) => ({ ...prev, products: res.data.total }))
      );

    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/users/gettotal`)
      .then((res) =>
        setStatusCards((prev) => ({ ...prev, users: res.data.total }))
      );

    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/admin/linechart`)
      .then(({ data }) => setLineChart(data));
    // setLineChart({
    //   productsByMonth: [10, 41, 35, 51, 49, 62, 69, 91, 100, 110, 109, 120],
    //   usersByMonth: [15, 50, 30, 51, 49, 70, 80, 100, 150, 200, 210, 200],
    //   months: [
    //     "Jan",
    //     "Feb",
    //     "Mar",
    //     "Apr",
    //     "May",
    //     "Jun",
    //     "Jul",
    //     "Aug",
    //     "Sep",
    //     "Oct",
    //     "Nov",
    //     "Dec",
    //   ],
    // });
  }, []);

  return (
    <div className="container-fliud">
      <Row>
        <Col lg="6">
          <Card className="bx-shadow">
            <Card.Body>
              <Chart
                options={options}
                series={series}
                type="line"
                height={350}
              />
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Row>
            <Col>
              <StatusCard
                title="Total Users"
                icon="bx bxs-user-pin"
                count={statusCards.users}
              />
            </Col>
            <Col>
              <StatusCard
                title="Total Products"
                icon="bx bxs-package"
                count={statusCards.products}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
