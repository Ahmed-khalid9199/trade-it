const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const mongoose = require("mongoose");
const { createServer } = require("http");
const rootRoutes = require("./routes/root");
const adminRoutes = require("./routes/admin");
const reviewRoutes = require("./routes/review");

const { Server } = require("socket.io");
const { getUser, removeUser, addUser, getUsers } = require("./util/chatUsers");

const app = express();
const httpServer = createServer(app);

mongoose
  .connect(
    "mongodb+srv://admin:jEnvTg5NyNkA3Ecq@cluster0.wqyck.mongodb.net/tradeit_db?retryWrites=true&w=majority",
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
app.use("/admin", adminRoutes);
app.use("/reviews", reviewRoutes);
app.use("/", rootRoutes);

// sockets
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});
io.on("connection", (socket) => {
  //take userId and socketId from user
  socket.on("addUser", (username) => {
    addUser(username, socket.id);
    io.emit("getUsers", getUsers());
  });

  //send and get message
  socket.on("sendMessage", ({ receiverId, message }) => {
    const user = getUser(receiverId);
    if (user) {
      io.to(user.socketId).emit("getMessage", message);
      console.log(message);
    }
  });

  //when disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", getUsers());
  });
  socket.on("logout", () => {
    console.log("a user logged out!");
    removeUser(socket.id);
    io.emit("getUsers", getUsers());
  });
});

httpServer.listen(process.env.PORT || 8800, () =>
  console.log("Api is running")
);
