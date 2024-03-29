import { ApiBase } from "./base/ApiBase";

class Streamlabs extends ApiBase {
    private _apiHeaders: any

    constructor(){
        super("https://streamlabs.com/")
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
        const response = await this.post("/polly/speak", { text: message, voice }, this._apiHeaders)
        return response.data.speak_url
    }
}

export const StreamlabsAPI = new Streamlabs()