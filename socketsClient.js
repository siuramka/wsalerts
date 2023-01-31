const app = require("./expressServer")
const server = require("http").createServer(app);
const {eventEmitter} = require("./twitch/twitchClient");
const config = require("./configs/config")
const tts = require("./tts/tts")
const PORT = config.PORT;
const voices = require("./configs/voices")

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

function getRandomVoice() {
  return voices.voiceList[(Math.random() * voices.voice.length) | 0];
}

function getDataPath(message, voice) {
  return new Promise((resolve, reject) => {
    tts.generateSpeech(message, voice)
      .then(response => {
        const uuid = response.uuid
        async function retry() {
          const data = await tts.getSpeakStatus(uuid)
          if (!data || data.path === "") {
            setTimeout(retry, 500);
          } else {
            resolve(data.path);
          }
        }
        // make initial GET request
        retry();
      })
      .catch(error => {
        reject(error);
      });
  });
}

eventEmitter.on('botMessage', message => {
  getDataPath("test test test test test", "eminem").then(r => { console.log("DONE")
  eventEmitter.emit("sendAudioUrl", r);

}).catch(e => console.error("LOL"))
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
