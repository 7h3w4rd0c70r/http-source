
import { AxiosResponse, AxiosError } from 'axios'
import * as _ from 'lodash'

export class HttpError extends Error {
    public static ParseAxiosError(axiosError: AxiosError): HttpError {
        return new HttpError(
            _.get(axiosError, 'response.data.error.message'),
            _.get(axiosError, 'response.data.error.status'),
            _.get(axiosError, 'response'),
            _.get(axiosError, 'response.data.error.code')
        )
    }

    public readonly message: string
    public readonly status: number
    public readonly code: number = null
    public readonly response: AxiosResponse = null
    public readonly httpStatus: number

    constructor(message: string, status: number, response: AxiosResponse, code: number = null) {
        super(message)

        this.message = message
        this.status = status
        this.response = response
        this.httpStatus = _.get(response, 'status')
        this.code = code
    }
}
