import { DbLoadProducts } from '../../../../../data/usecases/product/load-products/db-load-products'
import { ProductRepository } from '../../../../../infra/db/product/product-repository'
import { ILoadProducts } from 'domain/protocols/product/load-products'

export const makeDbLoadProducts = (): ILoadProducts => {
  const dbRepository = new ProductRepository()

  return new DbLoadProducts(dbRepository)
}
