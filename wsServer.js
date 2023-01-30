const express = require("express");
const app = express();
const server = require("http").createServer(app);
const eventEmitter = require("./twitch/twitchClient");
const config = require("./configs/config")
const tts = require("./tts/tts")
const PORT = config.PORT;
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.get("/", (req, res) => {
  res.send("")
});

eventEmitter.on('botMessage', message => {
  tts.getAudioUrl(message).then((resp) => {
    console.log(resp)
    eventEmitter.emit("sendAudioUrl", resp.speak_url);
  })
  .catch((resp) =>{
    console.log("Error fetching TTS API!")
    console.error(resp.json())
  })
});

io.on("connection", function (socket) {
  console.log("socket.io connnected...")
  eventEmitter.on("sendAudioUrl", (audioLink) => {
    socket.send(audioLink);
    socket.emit("data", audioLink);
  });
});

server.listen(PORT, function () {
  console.log("Socket.IO server [PORT] " + PORT);
});
