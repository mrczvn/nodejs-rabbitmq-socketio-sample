export class ServerError extends Error {
  constructor(stack: string) {
    super('Internal Server Error')

    this.stack = stack
    this.name = 'ServerError'
  }
}
