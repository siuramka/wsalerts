import { ElevenlabsAPI } from "../api/Elevenlabs";
import { VoiceRepository } from "../database/repository/TwitchSetting/VoiceRepository";

const voicesUberduck = require("../configs/voices_uberduck");
const voicesElevenlabs = require("../configs/voices_11labs");
const voiceRepository = new VoiceRepository();

export class UtilsVoice {
  
    static async getVoiceIdFromVoiceName(voice: any) {
      const voiceListJson = await ElevenlabsAPI.getUserVoices();
      const foundEntry = voiceListJson.voices.find((entry: { name: any; }) => {
        return entry.name === voice
      });
      return foundEntry.voice_id
    }
  
    static async getRandomVoiceUberduck() {
        const query = await voiceRepository.getProviderWithVoicesAndSelected("uberduck");
        return query?.voices?.[(Math.random() * query?.voices?.length) | 0].name
    }
  
    static getRandomVoiceElevenlabs(): string {
      return voicesElevenlabs.voiceList[(Math.random() * voicesElevenlabs.voiceList.length) | 0];
    }
  }
  