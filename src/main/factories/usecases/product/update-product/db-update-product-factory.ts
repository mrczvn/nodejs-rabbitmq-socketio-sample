import env from '../../../../config/env'
import { DbUpdateProduct } from '../../../../../data/usecases/product/update-product/db-update-product'
import { IUpdateProduct } from '../../../../../domain/protocols/product/update-product'
import { RabbitMQServer } from '../../../../../domain/services/rabbitmq-server'
import { ProductRepository } from '../../../../../infra/db/product/product-repository'

export const makeDbUpdateProduct = (): IUpdateProduct => {
  const dbRepository = new ProductRepository()
  const rabbitMQServer = new RabbitMQServer(env.RABBITMQ_URI)

  return new DbUpdateProduct(dbRepository, dbRepository, rabbitMQServer)
}
