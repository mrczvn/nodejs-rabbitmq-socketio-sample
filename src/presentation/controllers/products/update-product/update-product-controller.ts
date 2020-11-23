import {
  IController,
  IHttpRequest,
  IHttpResponse,
  IUpdateProduct
} from './update-product-controller-protocols'
import { noContent, serverError } from '../../../helpers/http/http-helper'

export class UpdateProductController implements IController {
  constructor(private readonly updateProduct: IUpdateProduct) {}

  async handle(req: IHttpRequest): Promise<IHttpResponse> {
    try {
      await this.updateProduct.update(req.body.product)

      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
