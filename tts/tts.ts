import { ElevenlabsAPI } from '../api/Elevenlabs'
import { UberduckAPI } from '../api/Uberduck'
const { Utils } = require("../tts/Utils")

export class Tts {
    static async getSynthesizedAudioBase64(message: any, voice: any) {
        try {
            const audioBlob = await ElevenlabsAPI.generateSpeechData(message, voice)
            console.log("Synthesizing...")
            if (audioBlob) //necessary check or no?
                return audioBlob
        } catch (error) {
            console.log('Error in getting audio blob => ')
            console.log(error)
            return null
        }
    
    }
    
    static async getSynthesizedAudioUrl(message: any, voice: any) {
        try {
            const data = await UberduckAPI.getSpeechData(message, voice)
            if (data == null) {
                return null;
            }
            await Utils.sleep(1000)
            console.log("Synthesizing...")
            let status = await UberduckAPI.getSpeakStatus(data.uuid)
            while (status.path == null) {
                console.log("Synthesizing...")
                await Utils.sleep(1000)
                status = await UberduckAPI.getSpeakStatus(data.uuid)
            }
            return status.path
        } catch (error) {
            console.log('Error in getting audio path => ')
            console.log(error)
            return null
        }
    }
}
