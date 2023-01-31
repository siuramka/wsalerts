const e = require("express");
const config = require("../configs/config");

const API_KEY = config.API_KEY;
const API_SECRET = config.API_SECRET;

const apiCredentials = "Basic " + Buffer.from(API_KEY + ":" + API_SECRET).toString('base64')
const apiHeaders = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'Authorization': apiCredentials
}

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
    headers: apiHeaders,
    method: 'POST',
    body: JSON.stringify({ speech: message, voice: voice })
  });
  if (!response.ok) {
    throw new Error(`/speak-status Error ${response.status}`)
  }
  return response.json()
}

async function getSpeakStatus(uuid) {
  const endpoint = `https://api.uberduck.ai/speak-status?uuid=${uuid}`
  const response = await fetch(endpoint, {
    headers: apiHeaders,
    method: 'GET'
  });
  if (!response.ok) {
    throw new Error(`/speak-status Error ${response.status}`)
  }
  return response.json()
}

module.exports = {
  generateSpeech, getSpeakStatus
}