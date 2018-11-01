
import axios, { AxiosInstance, AxiosError } from 'axios'
import * as _ from 'lodash'
import { jSignal } from 'jsignal'

import { HttpError } from './errors'
import {
    HttpHeaders,
    HttpQueryParams,
    HttpSourceOptions,
} from '..'

export class HttpSource<ErrorInstance extends Error = HttpError> {
    private remote: AxiosInstance
    private globalHeaders: HttpHeaders = {}
    private onHttpError: jSignal<ErrorInstance> = new jSignal<ErrorInstance>()

    private defaultContentType: string

    private _ErrorParser: (error: AxiosError) => ErrorInstance = <any>HttpError.ParseAxiosError
    public get ErrorParser() { return this._ErrorParser }
    public set ErrorParser(ErrorParser: (error: AxiosError) => ErrorInstance) {
        if (typeof ErrorParser === 'function') {
            this._ErrorParser = ErrorParser
        }
    }

    constructor(
        baseUrl: string,
        options: HttpSourceOptions<ErrorInstance> = {
            request: {
                contentType: 'application/json',
            },
        }
    ) {
        this.remote = axios.create({ baseURL: baseUrl })

        if (options.request) {
            if (typeof options.request.contentType === 'string') {
                this.defaultContentType = options.request.contentType
            }
        }

        if (options.error) {
            if (typeof options.error.parse === 'function') {
                this.ErrorParser = <any>options.error.parse
            }
        }
    }

    public setGlobalHeader = (name: string, value: string): void => {
        this.globalHeaders[name] = value
    }
    
    public removeGlobalHeader = (name: string): void => {
        delete this.globalHeaders[name]
    }
    
    public listenToHttpErrors = (listener: (error: ErrorInstance) => any): void => {
        this.onHttpError.listen(listener)
    }
    
    public unlistenToHttpErrors = (listener: (error: ErrorInstance) => any): void => {
        this.onHttpError.unlisten(listener)
    }

    public httpGet = async <ResponseBody>(urlPath: string, queryParams: HttpQueryParams, headers: HttpHeaders = {}): Promise<ResponseBody> => {
        try {
            const response = await this.remote.get(urlPath, { params: queryParams, headers: _.merge({}, { 'Content-Type': this.defaultContentType }, this.globalHeaders, headers) })
            return response.data
        } catch (err) {
            const error = this.ErrorParser(err)
            this.onHttpError.dispatch(error)
            throw error
        }
    }

    public httpPost = async <ResponseBody>(urlPath: string, body: any, headers: HttpHeaders = {}): Promise<ResponseBody> => {
        try {
            const response = await this.remote.post(urlPath, body, { headers: _.merge({}, { 'Content-Type': this.defaultContentType }, this.globalHeaders, headers) })
            return response.data
        } catch (err) {
            const error = this.ErrorParser(err)
            this.onHttpError.dispatch(error)
            throw error
        }
    }

    public httpPut = async <ResponseBody>(urlPath: string, body: any, headers: HttpHeaders = {}): Promise<ResponseBody> => {
        try {
            const response = await this.remote.put(urlPath, body, { headers: _.merge({}, { 'Content-Type': this.defaultContentType }, this.globalHeaders, headers) })
            return response.data
        } catch (err) {
            const error = this.ErrorParser(err)
            this.onHttpError.dispatch(error)
            throw error
        }
    }

    public httpDelete = async <ResponseBody>(urlPath: string, queryParams: HttpQueryParams, headers: HttpHeaders = {}): Promise<ResponseBody> => {
        try {
            const response = await this.remote.delete(urlPath, { params: queryParams, headers: _.merge({}, { 'Content-Type': this.defaultContentType }, this.globalHeaders, headers) })
            return response.data
        } catch (err) {
            const error = this.ErrorParser(err)
            this.onHttpError.dispatch(error)
            throw error
        }
    }
}
