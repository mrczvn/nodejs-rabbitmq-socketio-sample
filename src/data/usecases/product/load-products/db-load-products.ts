import { ProductModel } from '../../../../domain/models/product'
import { ILoadProductsRepository } from '../../../protocols/db/product/load-products'
import { ILoadProducts } from '../../../../domain/protocols/product/load-products'

export class DbLoadProducts implements ILoadProducts {
  constructor(private readonly loadProductsRepository: ILoadProductsRepository) {}

  load(): ProductModel[] {
    const products = this.loadProductsRepository.load()

    if (!products[0]) return null

    return products
  }
}
