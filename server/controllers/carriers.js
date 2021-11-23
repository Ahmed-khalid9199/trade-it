const mongoose = require("mongoose");
const Carrier = require("../models/carrier");

const addNewCarrier = (req, res, next) => {
  const carrier = new Carrier({
    mc_number: 123,
    company_name: "ML TRUCKING INC",
    usdot_number: 2952582,
    c_satus: "unreached",
    dispatcher_fee: 250,
    phone_number: "(952) 300-7811",
    factoring: "factoring",
    insurance: "insurance",
    address: "address",
    trucks: ["truck"],
    comment: "some comment",
  });
  carrier.save().then(() => {
    res.send("<h1>Carriers added</h1>");
  });
};

module.exports = {
  addNewCarrier,
};
