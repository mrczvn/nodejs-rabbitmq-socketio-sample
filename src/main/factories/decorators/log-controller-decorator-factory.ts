import { LogErrorRepository } from '../../../infra/db/log/log-error-repository'
import { LogDecoratorController } from '../../decorators/log-decorator-controller'
import { IController } from '../../../presentation/helpers/protocols'

export const makeLogControllerDecorator = (controller: IController): IController => {
  const logErrorRepository = new LogErrorRepository()

  return new LogDecoratorController(controller, logErrorRepository)
}
