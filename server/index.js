const { Server } = require("socket.io");

const io = new Server(8000, {
  cors: true,
});

// tracking which email id is in which room
const emailToSocketIdMap = new Map();
// to get email from the socket
const socketIdToEmailMap = new Map();

io.on("connection", (socket) => {
  console.log(`connected to Socket ${socket.id}`);
  socket.on("room:join", (data) => {
    const { email, roomId } = data;
    emailToSocketIdMap.set(email, socket.id);
    socketIdToEmailMap.set(socket.id, email);
    io.to(socket.id).emit("room:join", data);
  });
});
