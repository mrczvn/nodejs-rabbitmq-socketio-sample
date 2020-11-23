import amqplib from 'amqplib'
import env from '../../main/config/env'
import { RabbitMQServer } from './rabbitmq-server'

const connectSpy = jest.spyOn(amqplib, 'connect')

const makeSut = (): RabbitMQServer => new RabbitMQServer(env.RABBITMQ_URI)

const makeData = (): any => ({ prop: 'any_value' })

describe('RabbitMQServer', () => {
  const sut = makeSut()

  beforeAll(async () => await sut.bootstrap())

  afterAll(async () => await sut.closeConnection())

  describe('bootstrap', () => {
    test('Should connect is rabbitMQ', () => {
      expect(connectSpy).toHaveBeenCalledWith(env.RABBITMQ_URI)
      expect(sut.conn).toBeTruthy()
      expect(sut.channel).toBeTruthy()
    })
  })

  describe('publisherInQueue', () => {
    test('Should call publisherInQueue with correct values', async () => {
      const assertQueueSpy = jest.spyOn(sut.channel, 'assertQueue')
      const sendToQueueSpy = jest.spyOn(sut.channel, 'sendToQueue')

      const data = makeData()

      await sut.publisherInQueue('any_queue', JSON.stringify(data))

      expect(assertQueueSpy).toHaveBeenCalledWith('any_queue', { durable: false })
      expect(sendToQueueSpy).toHaveBeenCalledWith(
        'any_queue',
        Buffer.from(JSON.stringify(data))
      )
    })
  })
})
