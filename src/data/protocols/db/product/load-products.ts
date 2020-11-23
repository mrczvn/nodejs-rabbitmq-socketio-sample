import { ProductModel } from '../../../../domain/models/product'

export interface ILoadProductsRepository {
  load: () => ProductModel[]
}
