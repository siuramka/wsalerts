const app = require("./expressServer")
const server = require("http").createServer(app);
const { eventEmitter } = require("./twitch/twitchClient");
const config = require("./configs/config")
const tts = require("./tts/tts")
const PORT = config.PORT;
const voices = require("./configs/voices");
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

function getRandomVoice() {
  return voices.voiceList[(Math.random() * voices.voiceList.length) | 0];
}
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function getDataPathPromise(message, voice) {
  try {
    const data = await tts.generateSpeech(message, voice)
    if (data == null) {
      return null;
    }
    await sleep(1000)

    let status = await tts.getSpeakStatus(data.uuid)

    while (status.path == null) {
      console.log("Synthesizing...")
      await sleep(1000)
      status = await tts.getSpeakStatus(data.uuid)
    }
    return status.path
  } catch (error) {
    console.log('Error in getting audio path => ')
    console.log(error)
    return null
  }

}

eventEmitter.on('botMessage', async (message) => {
  const voice = getRandomVoice()
  const audioPath = await getDataPathPromise(message, voice)
  if(audioPath){
    console.log(`Synthesized "${message}" with voice "${voice}"`)
  }
  eventEmitter.emit("sendAudioUrl", audioPath);
  
})

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
