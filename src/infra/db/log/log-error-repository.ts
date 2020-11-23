import { ILogErrorRepository } from '../../../data/protocols/db/product/log-error-repository'

export class LogErrorRepository implements ILogErrorRepository {
  logError(stack: string): void {
    console.log(stack)
  }
}
