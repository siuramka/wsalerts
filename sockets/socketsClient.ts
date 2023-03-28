const { app } = require("../expressServer");
const server = require("http").createServer(app);
const { eventEmitter } = require("../events/eventsHandler");
import { config } from "../configs/config";
const PORT = config.PORT;

export const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on(
  "connection",
  function (socket: { emit: (arg0: string, arg1: any) => void }) {
    console.log("Client connected to socket.io server!");
    eventEmitter.on("sendAudioUrl", (audioLink: any) => {
      socket.emit("data", audioLink);
    });
    eventEmitter.on("sendAudioBlob", (audioBlob: any) => {
      socket.emit("data", audioBlob);
    });
  }
);

server.listen(PORT, function () {
  console.log("Running on *: " + PORT);
});
