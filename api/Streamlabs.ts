import { ApiBase } from "./ApiBase";

class Streamlabs extends ApiBase {
    private _apiHeaders: any

    constructor(){
        super("https://us-central1-sunlit-context-217400.cloudfunctions.net")
        this.initHeaders()
    }

    private initHeaders() {
        const apiHeaders = {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          };
        this.setHeaders(apiHeaders)
    }

    private setHeaders(headers: any): void {
        this._apiHeaders = headers
    }

    async getSpeechData(message: string, voice: string = "Brian") {
        const response = await this.post("/streamlabs-tts", { text: message, voice }, this._apiHeaders)
        return response.data.speak_url
    }
}

export const StreamlabsAPI = new Streamlabs()