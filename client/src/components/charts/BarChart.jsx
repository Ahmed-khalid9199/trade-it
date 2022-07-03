import React from "react";
import { useState } from "react";
import Chart from "react-apexcharts";

const BarChart = () => {
  const [series, setSeries] = useState([
    {
      data: [500, 20, 21, 30, 3],
    },
  ]);
  const [options, setOptions] = useState({
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: ["5 Stars", "4 Stars", "3 Stars", "2 Stars", "1 Stars"],
    },
  });

  return (
    <div>
      <h3>User Ratings</h3>
      <Chart options={options} series={series} type="bar" height={250} />
    </div>
  );
};

export default BarChart;
