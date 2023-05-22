import { ApiConfigType, _ElevenlabsConfig } from "../configs/configs";
import { ApiBase } from "./base/ApiBase";


class Elevenlabs extends ApiBase {
    private _apiCredentials: string
    private _apiHeaders: any

    constructor() {
        super("https://api.elevenlabs.io/v1")
        this.setConfig(_ElevenlabsConfig)
        this.setCredentials(this.getConfig())
        this.setAuthHeaders()
       
    }

    private setHeaders(headers: any): void {
        this._apiHeaders = headers
    }

    private setAuthHeaders() {
        const apiHeaders = {
            Accept: "audio/mpeg, application/json",
            "xi-api-key": this._apiCredentials,
            "Content-Type": "application/json",
          };
        this.setHeaders(apiHeaders)
    }

    private setCredentials(config: ApiConfigType): void {
        //https://betterprogramming.pub/advanced-typescript-how-to-use-interface-inheritance-with-discriminated-unions-dddf77cb3836 
        //discriminated unions
        if(config.type === "elevenlabs"){
            this._apiCredentials = `${config.XI_API_KEY}` // should make config params not nullable somehow tbh
        }
    }

    async getUserVoices() {
        const response = await this.get(`/voices`,{}, this._apiHeaders)

        if (response.status > 300) {
            throw new Error(`[${this._baseUrl}] /voices Error ${response.status}`);
          }
      
        return response.data;
    }
    
    async generateSpeechData(message: any, voice: string) {
        const config = { responseType: "arraybuffer", headers: this._apiHeaders }
        
        const response = await this.post(`/text-to-speech/${voice}`,
          { text: message }, config
        );
    
        if (response.status > 300) {
          throw new Error(`[${this._baseUrl}] /text-to-speach/ Error ${response.status}`);
        }
    
        const audioData = Buffer.from(response.data, "binary").toString("base64");
        return audioData;
      }
}

export const ElevenlabsAPI = new Elevenlabs()