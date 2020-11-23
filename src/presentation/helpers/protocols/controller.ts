import { IHttpRequest, IHttpResponse } from './http'

export interface IController {
  handle: (req: IHttpRequest) => Promise<IHttpResponse>
}
