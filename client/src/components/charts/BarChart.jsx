import React from "react";
import Chart from "react-apexcharts";
import Rating from "react-rating";

const findAverageRating = (dataArray) => {
  if (!Array.isArray(dataArray)) {
    return 5;
  }

  var ratingArray = [];
  dataArray.map((item, index) => {
    console.log(Array(item).fill(5 - index));
    ratingArray.push(...Array(item).fill(5 - index));
  });
  let avg =
    ratingArray.reduce((partialSum, a) => partialSum + a, 0) /
    ratingArray.length;

  return Math.round(avg * 10) / 10;
};

const BarChart = ({ data }) => {
  const series = [
    {
      data: data,
    },
  ];
  const options = {
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
      enabled: true,
    },
    xaxis: {
      categories: ["5 Stars", "4 Stars", "3 Stars", "2 Stars", "1 Stars"],
    },
  };

  const avgRating = findAverageRating(data);

  return (
    <div>
      <h3>User Ratings</h3>
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
          fractions={2}
          initialRating={avgRating}
          readonly
        />
        <h4 style={{ margin: "5px" }}>{avgRating}</h4>
      </div>

      <Chart options={options} series={series} type="bar" height={250} />
    </div>
  );
};

export default BarChart;
