import { ProductModel } from '../../../../domain/models/product'
import { ILoadProducts } from '../../../../domain/protocols/product/load-products'
import { ok } from '../../../helpers/http/http-helper'
import { IHttpRequest } from '../update-product/update-product-controller-protocols'
import { LoadProductsController } from './load-products-controller'

interface ISutTypes {
  sut: LoadProductsController
  loadProductsStub: ILoadProducts
}

const makeLoadProducts = (): ILoadProducts => {
  class LoadProductsStub implements ILoadProducts {
    load(): ProductModel[] {
      return [makeProduct()]
    }
  }
  return new LoadProductsStub()
}

const makeProduct = (): ProductModel => ({
  name: 'NASDAQ',
  value: 9121.32,
  change: 141.66,
  percentage: 1.58
})

const makeRequest = (): IHttpRequest => ({ body: null })

const makeSut = (): ISutTypes => {
  const loadProductsStub = makeLoadProducts()

  const sut = new LoadProductsController(loadProductsStub)

  return { sut, loadProductsStub }
}

describe('LoadProductsController', () => {
  describe('handle', () => {
    test('Should call LoadProducts', async () => {
      const { sut, loadProductsStub } = makeSut()

      const loadSpy = jest.spyOn(loadProductsStub, 'load')

      await sut.handle(makeRequest())

      expect(loadSpy).toHaveBeenCalledTimes(1)
    })

    test('Should 200 if LoadProducts returns product list', async () => {
      const { sut } = makeSut()

      expect(await sut.handle(makeRequest())).toEqual(ok([makeProduct()]))
    })
  })
})
