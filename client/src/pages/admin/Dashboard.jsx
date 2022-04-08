import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { Row, Col, Card } from "react-bootstrap";
import StatusCard from "../../components/status-card/StatusCard";

const Dashboard = () => {
  const [series, setSeries] = useState([
    {
      name: "Posts",
      data: [10, 41, 35, 51, 49, 62, 69, 91, 100],
    },
    {
      name: "users",
      data: [15, 50, 30, 51, 49, 70, 80, 100, 150],
    },
  ]);
  const [options, setOptions] = useState({
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
      text: "Product Trends by Month",
      align: "left",
    },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
      ],
    },
  });

  useEffect(() => {}, []);

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
                count={50}
              />
            </Col>
            <Col>
              <StatusCard
                title="Total Products"
                icon="bx bxs-package"
                count={100}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
