import { ProductModel } from '../../models/product'

export interface ILoadProducts {
  load: () => ProductModel[]
}
