import { RabbitMQServer } from 'domain/services/rabbitmq-server'

export default async (rabbiMQServer: RabbitMQServer): Promise<void> => {
  await rabbiMQServer.bootstrap()
  await rabbiMQServer.consume('updateProduct', (data) => {
    console.log(JSON.parse(data.content.toString()))
  })
}
