const app = require("../expressServer")
const server = require("http").createServer(app.app);
const events = require("../events/eventsHandler")
const config = require("../configs/config")
const uberduck = require("../api/uberduck-api")
const elevenlabs = require("../api/11labs-api")


const PORT = config.PORT;
const voices = require("../configs/voices_uberduck");
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

async function getSynthesizedAudioUrl11(message, voice) {
  try {
    const audioBlob = await elevenlabs.generateSpeechData(message,voice)
    if(audioBlob) //necessary check or no?
      return audioBlob
  } catch (error) {
    console.log('Error in getting audio blob => ')
    console.log(error)
    return null
  }

}

async function getSynthesizedAudioUrl(message, voice) {
  try {
    const data = await uberduck.generateSpeech(message, voice)
    if (data == null) {
      return null;
    }
    await sleep(1000)
    console.log("Synthesizing...")
    let status = await uberduck.getSpeakStatus(data.uuid)
    while (status.path == null) {
      console.log("Synthesizing...")
      await sleep(1000)
      status = await uberduck.getSpeakStatus(data.uuid)
    }
    return status.path
  } catch (error) {
    console.log('Error in getting audio path => ')
    console.log(error)
    return null
  }

}

events.eventEmitter.on('synthesizeAudio', async (message, voice) => {
  console.log(`Got synthesize request "${message}"!`)
  let voiceData = voice || getRandomVoice();
  const audioPath = await getSynthesizedAudioUrl(message, voiceData)
  if(audioPath){
    console.log(`Synthesized "${message}" with voice "${voiceData}"`)
    events.eventEmitter.emit("sendAudioUrl", audioPath);
  }
})

events.eventEmitter.on('synthesizeAudio11', async (message, voice) => {
  console.log(`Got synthesize request 11labs "${message}"!`)
  let voiceData = voice || getRandomVoice();
  const audioBlob = await getSynthesizedAudioUrl11(message, voiceData)
  if(audioBlob){
    console.log(`Synthesized "${message}" with voice "${voiceData}"`)
    events.eventEmitter.emit("sendAudioBlob", audioBlob);
  }
  
})

io.on("connection", function (socket) {
  console.log("Client connected to socket.io server!")
  events.eventEmitter.on("sendAudioUrl", (audioLink) => {
    socket.emit("data", audioLink);
  });
  events.eventEmitter.on("sendAudioBlob", (audioBlob) => {
    console.log("emiting blob")
    socket.emit("audio_blob", audioBlob);
  });
});


server.listen(PORT, function () {
  console.log("Running on *: " + PORT);
});

module.exports = { io }