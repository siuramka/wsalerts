import EventEmitter from "events";
import { Tts } from "../tts/Tts";
import { TwitchSettingRepository } from "../database/repository/TwitchSetting/TwitchSettingRepository";
import { UtilsVoice } from "../tts/UtilsVoice"

const provider = "uberduck";

class TtsEventHandler extends EventEmitter {
  private twitchSettingRepository: TwitchSettingRepository;
  constructor() {
    super();
  }

  public async initialize() {
    this.twitchSettingRepository = new TwitchSettingRepository();
    await this.setupSynthesizeListeners();
  }
  
  private async setupSynthesizeListeners(): Promise<void> {
    const twitchSetting = await this.twitchSettingRepository.getFirst();
    //add voice to synthesize
    this.on("synthesizeUberduck", async (message: any, voice: any) => {
      console.log(`[Uberduck] Got synthesize request "${message}"!`);
      let voiceData = voice || await UtilsVoice.getRandomVoiceUberduck();
      const audioPath = await Tts.getSynthesizedAudioUrl(message, voiceData);
      if (audioPath) {
        console.log(`Synthesized "${message}" with voice "${voiceData}"`);
        this.emit("sendAudioUrl", audioPath);
      }
    });

    this.on("synthesizeElevenlabs", async (message: any, voice: any) => {
      console.log(`[Elevenlabs] Got synthesize request "${message}"!`);
      let voiceData = voice || UtilsVoice.getRandomVoiceElevenlabs();
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

const eventHandler = new TtsEventHandler();

(async () => {
  await eventHandler.initialize();
})();

export = eventHandler;