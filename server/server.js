const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const mongoose = require("mongoose");
const { createServer } = require("http");
const rootRoutes = require("./routes/root");

const app = express();
const httpServer = createServer(app);

mongoose
  .connect(
    "mongodb://admin:9FzZrhjv5U9cWFP@cluster0-shard-00-00.fcfh0.mongodb.net:27017,cluster0-shard-00-01.fcfh0.mongodb.net:27017,cluster0-shard-00-02.fcfh0.mongodb.net:27017/dispatch_db?ssl=true&replicaSet=atlas-hj3cly-shard-0&authSource=admin&retryWrites=true&w=majority",
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .then((result) => {
    console.log("databse is connected");
  })
  .catch((err) => {
    throw err;
  });

app.use(multer({ storage: storage }).array("file"));

// middlewares
app.use(express.json());
app.use(helmet());
app.use(compression());
app.use(
  cors({
    origin: "*",
  })
);

// routes
app.use("/", rootRoutes);

httpServer.listen(process.env.PORT || 8800, () =>
  console.log("Api is running")
);
