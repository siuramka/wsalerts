import { ElevenlabsAPI } from "../api/Elevenlabs";
import { VoiceRepository } from "../database/repository/TwitchSetting/VoiceRepository";
type provider = "uberduck" | "elevenlabs" | "streamlabs";

const voiceRepository = new VoiceRepository();

export class UtilsVoice {

    static async getVoiceIdFromVoiceName(voice: any) {
      const voiceListJson = await ElevenlabsAPI.getUserVoices();
      const foundEntry = voiceListJson.voices.find((entry: { name: any; }) => {
        return entry.name === voice
      });
      return foundEntry.voice_id
    }
  
    static async getRandomVoice(provider: provider): Promise<string | undefined> {
      const query = await voiceRepository.getProviderWithVoicesAndSelected(provider);
      return query?.voices?.[(Math.random() * query?.voices?.length) | 0].name
    }
  }
  