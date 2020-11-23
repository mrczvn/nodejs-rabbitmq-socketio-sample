import { ILoadProductsRepository } from '../../../protocols/db/product/load-products'
import { ProductModel } from '../../../../domain/models/product'
import { ILoadProducts } from '../../../../domain/protocols/product/load-products'
import { DbLoadProducts } from './db-load-products'

interface ISutTypes {
  sut: DbLoadProducts
  loadProductsRepositoryStub: ILoadProductsRepository
}

const makeLoadProductsRepository = (): ILoadProducts => {
  class LoadProductsRepositoryStub implements ILoadProducts {
    load(): ProductModel[] {
      return [makeProduct(), makeProduct()]
    }
  }
  return new LoadProductsRepositoryStub()
}

const makeProduct = (): ProductModel => ({
  name: 'NASDAQ',
  value: 9121.32,
  change: 141.66,
  percentage: 1.58
})

const makeSut = (): ISutTypes => {
  const loadProductsRepositoryStub = makeLoadProductsRepository()

  const sut = new DbLoadProducts(loadProductsRepositoryStub)

  return { sut, loadProductsRepositoryStub }
}

describe('DbLoadProducts', () => {
  describe('load', () => {
    test('Should call with LoadProductsRepository', () => {
      const { sut, loadProductsRepositoryStub } = makeSut()

      const loadSpy = jest.spyOn(loadProductsRepositoryStub, 'load')

      sut.load()

      expect(loadSpy).toHaveBeenCalledTimes(1)
    })

    test('Should return product list if LoadProductsRepository success', () => {
      const { sut } = makeSut()

      expect(sut.load()).toEqual([makeProduct(), makeProduct()])
    })

    test('Should return null if LoadProductsRepository fails', () => {
      const { sut, loadProductsRepositoryStub } = makeSut()

      jest.spyOn(loadProductsRepositoryStub, 'load').mockReturnValueOnce([])

      expect(sut.load()).toBeNull()
    })
  })
})
