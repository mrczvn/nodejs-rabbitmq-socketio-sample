import { ProductModel } from '../../../../domain/models/product'

export interface ILoadProductByNameRepository {
  loadByName: (name: string) => ProductModel
}
