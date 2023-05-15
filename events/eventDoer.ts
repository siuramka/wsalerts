import { Tts } from "../tts/Tts"
const { Utils } = require("../tts/Utils");

async function handleSynthesizeAudioUberduck(message: any, voice: any) {
  console.log(`[Uberduck] Got synthesize request "${message}"!`);
  let voiceData = voice || Utils.getRandomVoiceUberduck();
  const audioPath = await Tts.getSynthesizedAudioUrl(message, voiceData);
}


