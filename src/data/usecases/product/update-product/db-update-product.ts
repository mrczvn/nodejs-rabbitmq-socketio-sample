import { ILoadProductByNameRepository } from 'data/protocols/db/product/load-product-by-name'
import { IUpdateProductRepository } from '../../../protocols/db/product/update-product-repository'
import { ProductModel } from '../../../../domain/models/product'
import { IRabbitMQServer } from '../../../../domain/protocols/rabbitmq/rabbitmq-server'
import { IUpdateProduct } from '../../../../domain/protocols/product/update-product'

export class DbUpdateProduct implements IUpdateProduct {
  constructor(
    private readonly loadProductByNameRepository: ILoadProductByNameRepository,
    private readonly updateProductRepository: IUpdateProductRepository,
    private readonly rabbitMQServer: IRabbitMQServer
  ) {}

  async update(data: ProductModel): Promise<void> {
    const product = this.loadProductByNameRepository.loadByName(data.name)

    if (product) {
      this.updateProductRepository.update(data)

      await this.rabbitMQServer.bootstrap()

      await this.rabbitMQServer.publisherInQueue('updateProduct', JSON.stringify(data))
    }
  }
}
