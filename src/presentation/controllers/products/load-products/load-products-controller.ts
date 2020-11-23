import {
  IController,
  IHttpRequest,
  IHttpResponse,
  ILoadProducts
} from './load-products-controller-protocols'
import { ok, serverError } from '../../../helpers/http/http-helper'

export class LoadProductsController implements IController {
  constructor(private readonly loadProducts: ILoadProducts) {}

  async handle(req: IHttpRequest): Promise<IHttpResponse> {
    try {
      return ok(this.loadProducts.load())
    } catch (error) {
      return serverError(error)
    }
  }
}
