import { makeLogControllerDecorator } from '../../../decorators/log-controller-decorator-factory'
import { makeDbUpdateProduct } from '../../../usecases/product/update-product/db-update-product-factory'
import { UpdateProductController } from '../../../../../presentation/controllers/products/update-product/update-product-controller'
import { IController } from '../../../../../presentation/helpers/protocols'

export const makeUpdateProductController = (): IController => {
  const controller = new UpdateProductController(makeDbUpdateProduct())

  return makeLogControllerDecorator(controller)
}
