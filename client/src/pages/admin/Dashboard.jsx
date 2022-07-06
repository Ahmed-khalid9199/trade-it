import axios from "axios";
import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { Row, Col, Card } from "react-bootstrap";
import StatusCard from "../../components/status-card/StatusCard";

const Dashboard = () => {
  const [statusCards, setStatusCards] = useState({ products: 0, users: 0 });
  const [pieChart, setPieChart] = useState({
    series: [],
    options: {
      labels: [],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  });
  const [lineChart, setLineChart] = useState({
    productsByMonth: [],
    usersByMonth: [],
    months: [],
  });
  const lineSeries = [
    {
      name: "Products",
      data: lineChart.productsByMonth,
    },
    {
      name: "users",
      data: lineChart.usersByMonth,
    },
  ];
  const lineOptions = {
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
  const [barChart, setBarChart] = useState({
    series: [
      {
        data: [],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true,
          labled: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      title: {
        text: "Top cities",
        align: "left",
      },
      xaxis: {
        categories: [],
      },
    },
  });

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

    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/admin/topfivetags`)
      .then(({ data }) =>
        setPieChart((prev) => ({
          series: data.series,
          options: { ...prev.options, labels: data.tags },
        }))
      );

    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/admin/productsperlocation`)
      .then(({ data }) =>
        setBarChart((prev) => ({
          series: [
            {
              data: data.series,
            },
          ],
          options: {
            ...prev.options,
            xaxis: {
              categories: data.labels,
            },
          },
        }))
      );
  }, []);

  return (
    <div className="container-fliud">
      <Row>
        <Col lg="6" md="12">
          <Card className="bx-shadow">
            <Card.Body>
              <Chart
                options={lineOptions}
                series={lineSeries}
                type="line"
                height={350}
              />
            </Card.Body>
          </Card>
        </Col>
        <Col lg="6" md="12">
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
          <Row>
            <Col>
              <Card className="bx-shadow">
                <Card.Header>
                  <center>Top Tags</center>
                </Card.Header>
                <Chart
                  options={pieChart.options}
                  series={pieChart.series}
                  type="pie"
                  width={380}
                  // height={170}
                />
              </Card>
            </Col>
            <Col></Col>
          </Row>
        </Col>
        <Col>
          <Card className="bx-shadow" style={{ marginTop: "-20px" }}>
            <Card.Body>
              <Chart
                options={barChart.options}
                series={barChart.series}
                type="bar"
                width={500}
                height={200}
              />
            </Card.Body>
          </Card>
        </Col>
        <Col></Col>
      </Row>
    </div>
  );
};

export default Dashboard;
