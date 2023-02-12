const config = require("../configs/config");
const axios = require('axios');
const url = "https://api.elevenlabs.io/v1"
const API_KEY = config.XI_API_KEY;

const apiHeaders = {
    'Accept': 'audio/mpeg',
    'xi-api-key': API_KEY,
    'Content-Type': 'application/json'
}

async function generateSpeechData(message, voice) {
    voice = "21m00Tcm4TlvDq8ikWAM"
    const response = await axios.post(url + "/text-to-speech/" + voice, { text: "Whats up guys!" }, {responseType: 'arraybuffer',headers: apiHeaders });
    if (response.status > 300) {
        throw new Error(`${url} /speak Error ${response.status}`)
    }
    const audioData = Buffer.from(response.data, 'binary').toString('base64')
    return audioData
}
module.exports = {
    generateSpeechData
  }