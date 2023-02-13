const EventEmitter = require('events');
const eventEmitter = new EventEmitter();
const { getSynthesizedAudioUrl, getSynthesizedAudioBase64 } = require('../tts/tts')
const { sleep, getRandomVoice } = require("../tts/helpers")


eventEmitter.on('synthesizeAudioUberduck', async (message, voice) => {
    console.log(`[Uberduck] Got synthesize request "${message}"!`)
    let voiceData = voice || getRandomVoice();
    const audioPath = await getSynthesizedAudioUrl(message, voiceData)
    if (audioPath) {
        console.log(`Synthesized "${message}" with voice "${voiceData}"`)
        eventEmitter.emit("sendAudioUrl", audioPath);
    }
})

eventEmitter.on('synthesizeAudio11', async (message, voice) => {
    console.log(`[Elevenlabs] Got synthesize request "${message}"!`)
    let voiceData = voice || getRandomVoice();
    const audioBlob = await getSynthesizedAudioBase64(message, voiceData)
    if (audioBlob) {
        console.log(`Synthesized "${message}" with voice "${voiceData}"`)
        eventEmitter.emit("sendAudioBlob", audioBlob);
    }

})
module.exports = { eventEmitter }