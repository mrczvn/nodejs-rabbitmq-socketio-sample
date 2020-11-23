import { makeUpdateProductController } from '../factories/controllers/product/update-product/update-product-controller-factory'
import { makeLoadProductsController } from '../factories/controllers/product/load-products/load-products-controller-factory'
import { adaptRoute } from '../adapters/express-route-adaper'
import { Router } from 'express'

export default (router: Router): void => {
  router.post('/products', adaptRoute(makeUpdateProductController()))

  router.get('/products', adaptRoute(makeLoadProductsController()))
}
