
// https://khalilstemmler.com/blogs/typescript/abstract-class/
// https://www.apollographql.com/docs/apollo-server/data/fetching-rest

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios"
import { config } from "../configs/config"

// this config is driving me crazy need to rewrite it tbh

export abstract class ApiBase {
    protected _baseUrl: string
    private _axiosInstance: AxiosInstance
    protected _API_KEY: string | undefined
    protected _API_SECRET: string | undefined

    constructor(baseUrl: string) {
        this._baseUrl = baseUrl
        this._axiosInstance = axios.create({})
        this._API_KEY = config.API_KEY
        this._API_SECRET = config.API_KEY

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