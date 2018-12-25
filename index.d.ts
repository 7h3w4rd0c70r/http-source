
import { AxiosInstance, AxiosResponse, AxiosError } from 'axios'
import { jSignal } from 'jsignal'

export declare class HttpError extends Error {
    message: string
    status: number
    code?: number
    response?: AxiosResponse
    httpStatus: number
}

export interface HttpHeaders {
    [key: string]: string
}

export interface HttpQueryParams {
    [key: string]: string|number|boolean
}

export interface HttpSourceOptions<ErrorInstance extends Error = HttpError> {
    request?: {
        contentType?: string
    }
    error?: {
        parse?: (error: AxiosError) => ErrorInstance
    }
}

declare module 'http-source' {
    export class HttpSource<ErrorInstance extends Error = HttpError> {
        public ErrorParser: (error: AxiosError) => ErrorInstance

        constructor(baseUrl: string, options?: HttpSourceOptions)

        public setGlobalHeader(name: string, value: string): void
        public removeGlobalHeader(name: string): void

        public listenToHttpErrors(listener: (error: ErrorInstance) => any): void
        public unlistenToHttpErrors(listener: (error: ErrorInstance) => any): void

        public httpGet<ResponseBody>(urlPath: string, queryParams: HttpQueryParams, headers?: HttpHeaders): Promise<ResponseBody>
        public httpPost<ResponseBody>(urlPath: string, body: any, headers?: HttpHeaders): Promise<ResponseBody>
        public httpPut<ResponseBody>(urlPath: string, body: any, headers?: HttpHeaders): Promise<ResponseBody>
        public httpDelete<ResponseBody>(urlPath: string, queryParams: HttpQueryParams, headers?: HttpHeaders): Promise<ResponseBody>
        public httpPatch<ResponseBody>(urlPath: string, body: any, headers?: HttpHeaders): Promise<ResponseBody>
    }
}
