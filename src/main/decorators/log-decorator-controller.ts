import { ILogErrorRepository } from '../../data/protocols/db/product/log-error-repository'
import {
  IController,
  IHttpRequest,
  IHttpResponse
} from '../../presentation/helpers/protocols'

export class LogDecoratorController implements IController {
  constructor(
    private readonly controller: IController,
    private readonly logErrorRepository: ILogErrorRepository
  ) {}

  async handle(req: IHttpRequest): Promise<IHttpResponse> {
    const httpResponse = await this.controller.handle(req)

    if (httpResponse.statusCode === 500) {
      this.logErrorRepository.logError(httpResponse.body.stack)
    }
    return httpResponse
  }
}
