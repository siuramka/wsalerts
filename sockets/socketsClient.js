const {app} = require("../expressServer")
const server = require("http").createServer(app);
const {eventEmitter} = require("../events/eventsHandler")
const config = require("../configs/config")
const PORT = config.PORT;
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});


io.on("connection", function (socket) {
  console.log("Client connected to socket.io server!")
  eventEmitter.on("sendAudioUrl", (audioLink) => {
    socket.emit("data", audioLink);
  });
  eventEmitter.on("sendAudioBlob", (audioBlob) => {
    socket.emit("data", audioBlob);
  });
});


server.listen(PORT, function () {
  console.log("Running on *: " + PORT);
});

module.exports = { io }