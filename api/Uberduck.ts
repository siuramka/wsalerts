import { ApiBase } from "./ApiBase";

class Uberduck extends ApiBase {
    private _apiCredentials: string
    private _apiHeaders: { Accept: string; 'Content-Type': string; Authorization: string; }
    constructor() {
        super("https://api.uberduck.ai")
        this._apiCredentials = "Basic " + Buffer.from(this._API_KEY + ":" + this._API_SECRET).toString('base64')
        this.setApiHeaders()
    }

    private setApiHeaders() {
        const apiHeaders = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': this._apiCredentials
          }
          this._apiHeaders = apiHeaders
    }

    async getSpeechData(message: any, voice: any) {
        const apiHeaders = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': this._apiCredentials
          }
        return this.post(`/speak`,{ speech: message, voice: voice }, apiHeaders)
    }
    async getSpeakStatus(uuid: any) {
        const apiHeaders = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': this._apiCredentials
          }
        return this.get(`speak-status?uuid=${uuid}`, {}, apiHeaders)
    }
}