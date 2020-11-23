import { ProductModel } from '../../../../domain/models/product'

export interface IUpdateProductRepository {
  update: (data: ProductModel) => void
}
