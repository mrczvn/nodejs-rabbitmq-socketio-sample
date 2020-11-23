import { DbUpdateProduct } from './db-update-product'
import { ILoadProductByNameRepository } from '../../../protocols/db/product/load-product-by-name'
import { IUpdateProductRepository } from '../../../protocols/db/product/update-product-repository'
import { ProductModel } from '../../../../domain/models/product'
import { IRabbitMQServer } from '../../../../domain/protocols/rabbitmq/rabbitmq-server'

interface ISutTypes {
  sut: DbUpdateProduct
  loadProductByNameRepositoryStub: ILoadProductByNameRepository
  updateProductRepositoryStub: IUpdateProductRepository
  rabbitMQServerStub: IRabbitMQServer
}

const makeLoadProductByNameRepository = (): ILoadProductByNameRepository => {
  class LoadProductByNameRepositoryStub implements ILoadProductByNameRepository {
    loadByName(name: string): ProductModel {
      return makeProduct()
    }
  }
  return new LoadProductByNameRepositoryStub()
}

const makeUpdateProductRepository = (): IUpdateProductRepository => {
  class UpdateProductRepositoryStub implements IUpdateProductRepository {
    update(data: ProductModel): void {}
  }
  return new UpdateProductRepositoryStub()
}

const makeRabbiMQServer = (): IRabbitMQServer => {
  class RabbitMQServerStub implements IRabbitMQServer {
    async bootstrap(): Promise<void> {}

    async publisherInQueue(queue: string, data: string): Promise<boolean> {
      return true
    }

    async consume(queue: string, callback: any): Promise<void> {}

    async closeConnection(): Promise<void> {}
  }
  return new RabbitMQServerStub()
}

const makeProduct = (): ProductModel => ({
  name: 'NASDAQ',
  value: 9121.32,
  change: 141.66,
  percentage: 1.58
})

const makeSut = (): ISutTypes => {
  const loadProductByNameRepositoryStub = makeLoadProductByNameRepository()
  const updateProductRepositoryStub = makeUpdateProductRepository()
  const rabbitMQServerStub = makeRabbiMQServer()

  const sut = new DbUpdateProduct(
    loadProductByNameRepositoryStub,
    updateProductRepositoryStub,
    rabbitMQServerStub
  )
  return {
    sut,
    loadProductByNameRepositoryStub,
    updateProductRepositoryStub,
    rabbitMQServerStub
  }
}

describe('DbUpdateProduct', () => {
  describe('update', () => {
    test('Should call LoadProductByNameRepository with correct values', async () => {
      const { sut, loadProductByNameRepositoryStub } = makeSut()

      const loadByNameSpy = jest.spyOn(loadProductByNameRepositoryStub, 'loadByName')

      const product = makeProduct()

      await sut.update(product)

      expect(loadByNameSpy).toHaveBeenCalledWith(product.name)
    })

    test('Should call UpdateProductRepository with correct values', async () => {
      const { sut, updateProductRepositoryStub } = makeSut()

      const updateSpy = jest.spyOn(updateProductRepositoryStub, 'update')

      const product = makeProduct()

      await sut.update(product)

      expect(updateSpy).toHaveBeenCalledWith(product)
    })

    test('Should call RabbitMQServer with correct values', async () => {
      const { sut, rabbitMQServerStub } = makeSut()

      const publisherInQueueSpy = jest.spyOn(rabbitMQServerStub, 'publisherInQueue')

      const product = makeProduct()

      await sut.update(product)

      expect(publisherInQueueSpy).toHaveBeenCalledWith(
        'updateProduct',
        JSON.stringify(product)
      )
    })

    test('Should throw if RabbitMQServer throws', async () => {
      const { sut, rabbitMQServerStub } = makeSut()

      jest.spyOn(rabbitMQServerStub, 'publisherInQueue').mockImplementationOnce(() => {
        throw new Error()
      })

      await expect(sut.update(makeProduct())).rejects.toThrow()
    })
  })
})
