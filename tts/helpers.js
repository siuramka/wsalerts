const voicesUberduck = require("../configs/voices_uberduck");
const voicesElevenlabs = require("../configs/voices_11labs");
const elevenlabs = require("../api/elevenlabs-api")
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
async function getVoiceIdFromVoiceName(voice) {
  const voiceListJson = await elevenlabs.getUserVoices();
  const foundEntry = voiceListJson.voices.find(entry => {
    return entry.name === voice
  });
  return foundEntry.voice_id
}

function getRandomVoiceUberduck() {
  return voicesUberduck.voiceList[(Math.random() * voicesUberduck.voiceList.length) | 0];
}
function getRandomVoiceElevenlabs() {
  return voicesElevenlabs.voiceList[(Math.random() * voicesElevenlabs.voiceList.length) | 0];
}

module.exports = { sleep, getRandomVoiceUberduck, getRandomVoiceElevenlabs, getVoiceIdFromVoiceName}