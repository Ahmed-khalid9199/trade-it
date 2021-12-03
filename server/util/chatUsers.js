let onlineUsers = [];

const addUser = (username, socketId) => {
  !onlineUsers.some((user) => user.username === username) &&
    onlineUsers.push({ username, socketId });
  console.log("onlineUsers", onlineUsers);
};

const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

const getUser = (username) => {
  return onlineUsers.find((user) => user.username === username);
};

const getUsers = () => {
  return onlineUsers;
};

module.exports = {
  getUser,
  removeUser,
  addUser,
  getUsers,
};
