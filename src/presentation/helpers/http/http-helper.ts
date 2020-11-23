import { ServerError } from '../errors/server-error'
import { IHttpResponse } from '../protocols/http'

export const ok = (data: any): IHttpResponse => ({
  body: data,
  statusCode: 200
})

export const serverError = (error: Error): IHttpResponse => ({
  body: new ServerError(error.stack),
  statusCode: 500
})

export const noContent = (): IHttpResponse => ({
  statusCode: 204,
  body: null
})
