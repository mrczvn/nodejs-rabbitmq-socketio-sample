import { ProductRepository } from './product-repository'
import stockData from '../../static-data'
import { ProductModel } from '../../../domain/models/product'

const makeSut = (): ProductRepository => new ProductRepository()

const makeProduct = (): ProductModel => ({
  name: 'NASDAQ',
  value: 9121.32,
  change: 141.66,
  percentage: 1.55
})

describe('ProductRepository', () => {
  describe('update', () => {
    test('Should update the product on success', () => {
      const sut = makeSut()

      const productToUpdate = makeProduct()

      sut.update(productToUpdate)

      const [productFound] = stockData.data.filter(
        (prod) => prod.name === productToUpdate.name
      )

      expect(productFound).toEqual(productToUpdate)
    })

    test('Should update the product on fails', () => {
      const sut = makeSut()

      const productToUpdate = makeProduct()

      productToUpdate.name = 'hjbkn'

      sut.update(productToUpdate)

      const [productFound] = stockData.data.filter(
        (prod) => prod.name === productToUpdate.name
      )
      expect(productFound).toBeUndefined()
    })
  })

  describe('loadByName', () => {
    test('Should returns an product on success', () => {
      const sut = makeSut()

      const productToFind = makeProduct()

      const productFound = sut.loadByName(productToFind.name)

      expect(productFound).toEqual(productToFind)
    })

    test('Should return undefined if loadByName fails', () => {
      const sut = makeSut()

      const productToFind = makeProduct()

      productToFind.name = 'hvkjb'

      const productFound = sut.loadByName(productToFind.name)

      expect(productFound).toBeUndefined()
    })
  })

  describe('load', () => {
    test('Should returns an product list on success', () => {
      const sut = makeSut()

      const listOfProductsFound = sut.load()

      expect(listOfProductsFound).toEqual(stockData.data)
    })
  })
})
