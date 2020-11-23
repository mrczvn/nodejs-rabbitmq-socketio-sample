import { UpdateProductController } from './update-product-controller'
import { IUpdateProduct } from './update-product-controller-protocols'
import { IHttpRequest } from '../../../helpers/protocols'
import { noContent, serverError } from '../../../helpers/http/http-helper'
import { ProductModel } from '../../../../domain/models/product'

interface ISutTypes {
  sut: UpdateProductController
  updateProductStub: IUpdateProduct
}

const makeUpdateProduct = (): IUpdateProduct => {
  class UpdateProductStub implements IUpdateProduct {
    async update(product: ProductModel): Promise<void> {}
  }

  return new UpdateProductStub()
}

const makeProduct = (): ProductModel => ({
  name: 'NASDAQ',
  value: 9121.32,
  change: 141.66,
  percentage: 1.58
})

const makeRequest = (): IHttpRequest => ({ body: { product: makeProduct() } })

const makeSut = (): ISutTypes => {
  const updateProductStub = makeUpdateProduct()

  const sut = new UpdateProductController(updateProductStub)

  return { sut, updateProductStub }
}

describe('UpdateProductController', () => {
  describe('handle', () => {
    test('Should call UpdateProduct.update with correct values', async () => {
      const { sut, updateProductStub } = makeSut()

      const updateSpy = jest.spyOn(updateProductStub, 'update')

      const httpRequest = makeRequest()

      await sut.handle(httpRequest)

      expect(updateSpy).toHaveBeenCalledWith(httpRequest.body.product)
    })

    test('Should throw if UpdateProduct.update throws', async () => {
      const { sut, updateProductStub } = makeSut()

      jest.spyOn(updateProductStub, 'update').mockImplementationOnce(() => {
        throw new Error()
      })

      expect(await sut.handle(makeRequest())).toEqual(serverError(new Error()))
    })

    test('Should 200 if UpdateProduct.update success', async () => {
      const { sut } = makeSut()

      expect(await sut.handle(makeRequest())).toEqual(noContent())
    })
  })
})
