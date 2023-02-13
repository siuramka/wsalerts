const voices = require("../configs/voices_uberduck");

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  function getRandomVoice() {
    return voices.voiceList[(Math.random() * voices.voiceList.length) | 0];
  }
  
  module.exports = { sleep, getRandomVoice }