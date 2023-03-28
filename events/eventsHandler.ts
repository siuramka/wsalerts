const EventEmitter = require("events");
export const eventEmitter = new EventEmitter();
import { Tts } from "../tts/tts"
const { Utils } = require("../tts/Utils");

eventEmitter.on("synthesizeAudioUberduck", async (message: any, voice: any) => {
  console.log(`[Uberduck] Got synthesize request "${message}"!`);
  let voiceData = voice || Utils.getRandomVoiceUberduck();
  const audioPath = await Tts.getSynthesizedAudioUrl(message, voiceData);
  if (audioPath) {
    console.log(`Synthesized "${message}" with voice "${voiceData}"`);
    eventEmitter.emit("sendAudioUrl", audioPath);
  }
});

eventEmitter.on("synthesizeAudio11", async (message: any, voice: any) => {
  console.log(`[Elevenlabs] Got synthesize request "${message}"!`);
  let voiceData = voice || Utils.getRandomVoiceElevenlabs();
  const audioBlob = await Tts.getSynthesizedAudioBase64(message, voiceData);
  if (audioBlob) {
    console.log(`Synthesized "${message}" with voice "${voiceData}"`);
    eventEmitter.emit("sendAudioBlob", audioBlob);
  }
});
