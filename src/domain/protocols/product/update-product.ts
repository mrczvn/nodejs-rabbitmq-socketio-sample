import { ProductModel } from '../../models/product'

export interface IUpdateProduct {
  update: (data: ProductModel) => Promise<void>
}
