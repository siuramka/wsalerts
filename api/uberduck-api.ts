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

/**
 * Synthezation request
 * @param {string} message - message for synthezation
 * @param {string} voice - voice name for synthezation
 * @returns 
 */
export async function generateSpeech(message: any, voice: any) {
  const endpoint = "https://api.uberduck.ai/speak"
  const response = await axios.post(endpoint, { speech: message, voice: voice }, { headers: apiHeaders });
  if (response.status > 300) {
    throw new Error(`/speak Error ${response.status}`)
  }
  return response.data
}


export async function getSpeakStatus(uuid: any) {
  const endpoint = `https://api.uberduck.ai/speak-status?uuid=${uuid}`
  const response = await axios.get(endpoint, { headers: apiHeaders});
  if (response.status > 300) {
    throw new Error(`/speak-status Error ${response.status}`)
  }
  return response.data
}
