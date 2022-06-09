const User = require("../models/user");
const Product = require("../models/product");

const allMonths = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const productsAndUsersByMonth = async (req, res, next) => {
  try {
    console.log("productsAndUsersByMonth");
    const today = new Date();

    const users = await User.aggregate([
      { $addFields: { year: { $year: "$createdAt" } } },
      { $match: { year: today.getFullYear() } },
      {
        $group: {
          _id: { month: { $month: "$createdAt" } },
          count: { $count: {} },
        },
      },
      {
        $project: {
          _id: 0,
          month: "$_id.month",
          count: "$count",
        },
      },
    ]);

    const products = await Product.aggregate([
      { $addFields: { year: { $year: "$createdAt" } } },
      { $match: { year: new Date().getFullYear() } },
      {
        $group: {
          _id: { month: { $month: "$createdAt" } },
          count: { $count: {} },
        },
      },
      {
        $project: {
          _id: 0,
          month: "$_id.month",
          count: "$count",
        },
      },
    ]);

    const month = today.getMonth();
    let usersByMonth = new Array(month + 1).fill(0);
    let productsByMonth = new Array(month + 1).fill(0);
    users.forEach((u) => (usersByMonth[u.month - 1] = u.count));
    products.forEach((p) => (productsByMonth[p.month - 1] = p.count));
    const months = allMonths.slice(0, productsByMonth.length);

    res.status(200).send({ usersByMonth, productsByMonth, months });
  } catch (err) {
    res.status(500).send({ msg: err.message });
  }
};

module.exports = { productsAndUsersByMonth };
