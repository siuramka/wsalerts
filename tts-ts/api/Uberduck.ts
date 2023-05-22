import { ApiConfigType } from "../configs/configs";
import { _UberduckConfig } from "../configs/configs";
import { ApiBase } from "./base/ApiBase";


class Uberduck extends ApiBase {
    private _apiCredentials: string
    private _apiHeaders: any

    constructor() {
        super("https://api.uberduck.ai")
        this.setConfig(_UberduckConfig)
        this.setCredentials(this.getConfig())
        this.setAuthHeaders()
       
    }

    private setHeaders(headers: any): void {
        this._apiHeaders = headers
    }

    private setAuthHeaders() {
        const apiHeaders = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': this._apiCredentials
          }
        this.setHeaders(apiHeaders)
    }

    private setCredentials(config: ApiConfigType): void {
        //https://betterprogramming.pub/advanced-typescript-how-to-use-interface-inheritance-with-discriminated-unions-dddf77cb3836 
        //discriminated unions
        if(config.type === "uberduck"){
            this._apiCredentials = "Basic " + Buffer.from(config.API_KEY + ":" + config.API_SECRET).toString('base64')
        }
    }

    async getSpeechData(message: any, voice: any) {
        const response = await this.post(`/speak`,{ speech: message, voice: voice }, this._apiHeaders )

        if (response.status > 300) {
            throw new Error(`/speak Error ${response.status}`)
        }
        
        return response.data
    }

    async getSpeakStatus(uuid: any) {
        const response = await this.get(`/speak-status?uuid=${uuid}`, {}, this._apiHeaders)

        if (response.status > 300) {
            throw new Error(`/speak-status Error ${response.status}`)
        }
        return response.data
    }
}

export const UberduckAPI = new Uberduck()