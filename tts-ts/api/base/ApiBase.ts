
// https://khalilstemmler.com/blogs/typescript/abstract-class/
// https://www.apollographql.com/d  ocs/apollo-server/data/fetching-rest
// https://github.com/apollographql/datasource-rest/blob/main/src/RESTDataSource.ts

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios"
import { ApiConfigType } from "../../configs/configs"



export abstract class ApiBase {
    protected _baseUrl: string
    private _config: ApiConfigType
    private _axiosInstance: AxiosInstance

    constructor(baseUrl: string) {
        this._baseUrl = baseUrl
        this._axiosInstance = axios.create({})
    } 
    /**
     * 
     * Since I have multiple api providers, each has different config parameters for authorization mainly
     * I wanted to create a protected variable so that I have reusable code of this where I need it and how I need to config it
     */
    protected setConfig(config: ApiConfigType) {
      this._config = config
    }
    protected getConfig(): ApiConfigType {
      return this._config
    }

    private getAxiosInstance(config: AxiosRequestConfig): Promise<AxiosResponse> {
        return this._axiosInstance(config)
    }

    protected post(url: string, data?: any, headers?: any): Promise<AxiosResponse> {
        return this.getAxiosInstance({
            method: 'POST',
            url: `${this._baseUrl}${url}`,
            data: data ? data : null,
            headers: headers ? headers : null
          })
    }

    protected get (url: string, data?: any, headers?: any): Promise<AxiosResponse> {
        return this.getAxiosInstance({
          method: 'GET',
          url: `${this._baseUrl}${url}`,
          data: data ? data : null,
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