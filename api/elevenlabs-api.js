const config = require("../configs/config");
const axios = require('axios');
const url = "https://api.elevenlabs.io/v1"
const API_KEY = config.XI_API_KEY;

const apiHeaders = {
    'Accept': 'audio/mpeg, application/json',
    'xi-api-key': API_KEY,
    'Content-Type': 'application/json'
}

async function getUserVoices() {
    const endpoint = url + "/voices"
    const response = await axios.get(endpoint, { headers: apiHeaders })

    if (response.status > 300) {
        throw new Error(`${url} /voices Error ${response.status}`)
    }

    return response.data
}

async function generateSpeechData(message, voice) {
    const endpoint = url + "/text-to-speech/"
    const response = await axios.post(endpoint + voice, { text: message }, { responseType: 'arraybuffer', headers: apiHeaders });

    if (response.status > 300) {
        throw new Error(`${url} /text-to-speach/ Error ${response.status}`)
    }

    const audioData = Buffer.from(response.data, 'binary').toString('base64')
    return audioData
}
module.exports = {
    generateSpeechData, getUserVoices
}