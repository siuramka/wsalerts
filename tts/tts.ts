const uberduck = require("../api/uberduck-api")
const elevenlabs = require("../api/elevenlabs-api")
const { Utils } = require("../tts/Utils")


async function getSynthesizedAudioBase64(message: any, voice: any) {
    try {
        const audioBlob = await elevenlabs.generateSpeechData(message, voice)
        console.log("Synthesizing...")
        if (audioBlob) //necessary check or no?
            return audioBlob
    } catch (error) {
        console.log('Error in getting audio blob => ')
        console.log(error)
        return null
    }

}

async function getSynthesizedAudioUrl(message: any, voice: any) {
    try {
        const data = await uberduck.generateSpeech(message, voice)
        if (data == null) {
            return null;
        }
        await Utils.sleep(1000)
        console.log("Synthesizing...")
        let status = await uberduck.getSpeakStatus(data.uuid)
        while (status.path == null) {
            console.log("Synthesizing...")
            await Utils.sleep(1000)
            status = await uberduck.getSpeakStatus(data.uuid)
        }
        return status.path
    } catch (error) {
        console.log('Error in getting audio path => ')
        console.log(error)
        return null
    }

}

module.exports = { getSynthesizedAudioUrl, getSynthesizedAudioBase64 }