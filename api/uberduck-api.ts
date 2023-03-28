import { config } from "../configs/config";
const axios = require('axios');

const API_KEY = config.API_KEY;
const API_SECRET = config.API_SECRET;

const apiCredentials = "Basic " + Buffer.from(API_KEY + ":" + API_SECRET).toString('base64')
const apiHeaders = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'Authorization': apiCredentials
}

export class Uberduck {
  static async generateSpeech(message: any, voice: any) {
    const endpoint = "https://api.uberduck.ai/speak"
    const response = await axios.post(endpoint, { speech: message, voice: voice }, { headers: apiHeaders });
    if (response.status > 300) {
      throw new Error(`/speak Error ${response.status}`)
    }
    return response.data
  }
  
  
  static async getSpeakStatus(uuid: any) {
    const endpoint = `https://api.uberduck.ai/speak-status?uuid=${uuid}`
    const response = await axios.get(endpoint, { headers: apiHeaders});
    if (response.status > 300) {
      throw new Error(`/speak-status Error ${response.status}`)
    }
    return response.data
  }
  
}

