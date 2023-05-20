import EventEmitter from "events";
import { Tts } from "../tts/Tts"
const { Utils } = require("../tts/Utils");

const provider = "uberduck"

class EventHandler extends EventEmitter {

  constructor(){
    super()
    this.setupSynthesizeListeners()
  }

  private setupSynthesizeListeners(): void {
    this.on("synthesizeUberduck" , async (message: any, voice: any) => {
      console.log(`[Uberduck] Got synthesize request "${message}"!`);
      let voiceData = voice || Utils.getRandomVoiceUberduck();
      const audioPath = await Tts.getSynthesizedAudioUrl(message, voiceData);
      if (audioPath) {
        console.log(`Synthesized "${message}" with voice "${voiceData}"`);
        this.emit("sendAudioUrl", audioPath);
      }
    });

    this.on("synthesizeElevenlabs", async (message: any, voice: any) => {
      console.log(`[Elevenlabs] Got synthesize request "${message}"!`);
      let voiceData = voice || Utils.getRandomVoiceElevenlabs();
      const audioBlob = await Tts.getSynthesizedAudioBase64(message, voiceData);
      if (audioBlob) {
        console.log(`Synthesized "${message}" with voice "${voiceData}"`);
        this.emit("sendAudioBlob", audioBlob);
      }
    });

    this.on("synthesizeStreamlabs", async (message: any, voice: any) => {
      console.log(`[Streamlabs] Got synthesize request "${message}"!`);
      const audioBlob = await Tts.getSynthesizedAudioBase64(message, voice);
      if (audioBlob) {
        console.log(`Synthesized "${message}" with voice "${voice}"`);
        this.emit("sendAudioBlob", audioBlob);
      }
    });
  }
}

export default new EventHandler();

