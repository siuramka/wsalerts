
// https://khalilstemmler.com/blogs/typescript/abstract-class/
// https://www.apollographql.com/docs/apollo-server/data/fetching-rest

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios"
import { config } from "../configs/config"

// this config is driving me crazy need to rewrite it tbh
const API_KEY = config.API_KEY;
const API_SECRET = config.API_SECRET;

abstract class ApiBase {
    protected _baseUrl: string
    private _axiosInstance: AxiosInstance

    constructor(baseUrl: string) {
        this._baseUrl = baseUrl
        this._axiosInstance = axios.create({})

    }

    private getAxiosInstance(config: AxiosRequestConfig): Promise<AxiosResponse> {
        return this._axiosInstance(config)
    }

    protected post(url: string, params?: any, headers?: any): Promise<AxiosResponse> {
        return this.getAxiosInstance({
            method: 'POST',
            url: `${this._baseUrl}${url}`,
            params: params ? params : null,
            headers: headers ? headers : null
          })
    }

    protected get (url: string, params?: any, headers?: any): Promise<AxiosResponse> {
        return this.getAxiosInstance({
          method: 'GET',
          url: `${this._baseUrl}${url}`,
          params: params ? params : null,
          headers: headers ? headers : null
        })
      }
    

}

class Uberduck extends ApiBase {
    private _apiCredentials: string
    private _apiHeaders: { Accept: string; 'Content-Type': string; Authorization: string; }
    constructor() {
        super("https://api.uberduck.ai")
        this._apiCredentials = "Basic " + Buffer.from(API_KEY + ":" + API_SECRET).toString('base64')
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

/**
 * 
 * https://fakeyou.com/video
 */

/**
 * 
 * https://github.com/axios/axios#typescript
 * 
 * Because axios dual publishes with an ESM default export and a CJS module.exports, there are some caveats. The recommended setting is to use "moduleResolution": "node16" (this is implied by "module": "node16"). Note that this requires TypeScript 4.7 or greater. If use ESM, your settings should be fine. If you compile TypeScript to CJS and you can’t use "moduleResolution": "node 16", you have to enable esModuleInterop. If you use TypeScript to type check CJS JavaScript code, your only option is to use "moduleResolution": "node16".
 */