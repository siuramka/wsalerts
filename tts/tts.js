const config = require("../configs/config");

const API_KEY = config.API_KEY;
const API_SECRET = config.API_SECRET;

async function getAudioUrlStreamlabs(message) {
  const response = await fetch("https://us-central1-sunlit-context-217400.cloudfunctions.net/streamlabs-tts", {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({ text: message, voice: "Brian" })
  });
  return response.json()
}

async function generateSpeech(message, voice) {
  const endpoint = "https://api.uberduck.ai/speak"
  const response = await fetch(endpoint, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + Buffer.from(API_KEY + ":" + API_SECRET).toString('base64')
    },
    method: 'POST',
    body: JSON.stringify({ speech: message, voice: voice })
  });
  return response.json()
}

async function getSpeakStatus(uuid) {
  const endpoint = `https://api.uberduck.ai/speak-status?uuid=${uuid}`
  const response = await fetch(endpoint, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + Buffer.from(API_KEY + ":" + API_SECRET).toString('base64')
    },
    method: 'GET'
  });
  return response.json()
}

module.exports = {
  generateSpeech, getSpeakStatus
}