const app = require("./expressServer")
const server = require("http").createServer(app);
const eventEmitter = require("./twitch/twitchClient");
const config = require("./configs/config")
const tts = require("./tts/tts")
const PORT = config.PORT;
const { voices } = require("./configs/voices")

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

function getRandomVoice() {
  return voices[(Math.random() * voices.length) | 0];
}

eventEmitter.on('botMessage', message => {
  tts.getAudioUrl(message).then((resp) => {
    console.log(resp)
    eventEmitter.emit("sendAudioUrl", resp.speak_url);
  })
  .catch((resp) =>{
    console.error("Error fetching TTS API!")
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
