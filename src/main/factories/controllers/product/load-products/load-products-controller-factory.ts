import { makeLogControllerDecorator } from '../../../decorators/log-controller-decorator-factory'
import { makeDbLoadProducts } from '../../../usecases/product/load-products/db-load-products-factory'
import { LoadProductsController } from '../../../../../presentation/controllers/products/load-products/load-products-controller'
import { IController } from '../../../../../presentation/helpers/protocols'

export const makeLoadProductsController = (): IController => {
  const controller = new LoadProductsController(makeDbLoadProducts())

  return makeLogControllerDecorator(controller)
}
