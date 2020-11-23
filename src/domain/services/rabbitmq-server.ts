import { Channel, connect, Connection, Message } from 'amqplib'
import { IRabbitMQServer } from '../protocols/rabbitmq/rabbitmq-server'

export class RabbitMQServer implements IRabbitMQServer {
  conn: Connection
  channel: Channel

  constructor(private readonly uri: string) {}

  async bootstrap(): Promise<void> {
    this.conn = await connect(this.uri)

    this.channel = await this.conn.createChannel()
  }

  async publisherInQueue(queue: string, data: string): Promise<boolean> {
    await this.channel.assertQueue(queue, { durable: false })

    return this.channel.sendToQueue(queue, Buffer.from(data))
  }

  async consume(queue: string, callback: (message: Message) => void): Promise<void> {
    await this.channel.consume(queue, (message) => {
      callback(message)

      this.channel.ack(message)
    })
  }

  async closeConnection(): Promise<void> {
    await this.conn.close()
  }
}
