const voicesUberduck = require("../configs/voices_uberduck");
const voicesElevenlabs = require("../configs/voices_11labs");
const elevenlabs = require("../api/elevenlabs-api")

export class Utils {
  
  static sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  static async getVoiceIdFromVoiceName(voice: any) {
    const voiceListJson = await elevenlabs.getUserVoices();
    const foundEntry = voiceListJson.voices.find((entry: { name: any; }) => {
      return entry.name === voice
    });
    return foundEntry.voice_id
  }

  static getRandomVoiceUberduck(): string {
    return voicesUberduck.voiceList[(Math.random() * voicesUberduck.voiceList.length) | 0];
  }

  static getRandomVoiceElevenlabs(): string {
    return voicesElevenlabs.voiceList[(Math.random() * voicesElevenlabs.voiceList.length) | 0];
  }
}
