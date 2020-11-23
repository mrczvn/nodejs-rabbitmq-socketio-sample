import stockData from '../../static-data'
import { IUpdateProductRepository } from '../../../data/protocols/db/product/update-product-repository'
import { ProductModel } from '../../../domain/models/product'
import { ILoadProductByNameRepository } from '../../../data/protocols/db/product/load-product-by-name'
import { ILoadProductsRepository } from 'data/protocols/db/product/load-products'

export class ProductRepository
  implements
    IUpdateProductRepository,
    ILoadProductByNameRepository,
    ILoadProductsRepository {
  update(data: ProductModel): void {
    const findStockIndex = stockData.data.findIndex(
      (product) => product.name === data.name
    )

    if (findStockIndex >= 0) {
      stockData.data.splice(findStockIndex, 1, data)
    }
  }

  loadByName(name: string): ProductModel {
    const [product] = stockData.data.filter((product) => product.name === name)

    return product
  }

  load(): ProductModel[] {
    return stockData.data
  }
}
