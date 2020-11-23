export interface IRabbitMQServer {
  bootstrap: () => Promise<void>

  publisherInQueue: (queue: string, data: string) => Promise<boolean>

  consume: (queue: string, callback: any) => Promise<void>

  closeConnection: () => Promise<void>
}
