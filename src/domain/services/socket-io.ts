import socket from 'socket.io'
import { Server } from 'http'
import { ISocketIO } from '../protocols/socket/socket-io'

export class SocketIO implements ISocketIO {
  io: socket.Server

  constructor(private readonly httpServer: Server, private readonly opts?: any) {}

  bootstrap(): void {
    this.io = new socket.Server(this.httpServer, this.opts)
  }

  emitEvent(eventName: string, data: any): boolean {
    return this.io.emit(eventName, data)
  }

  onEvent(eventName: string, callback: (...agrs: any[]) => void): socket.Server {
    return this.io.on(eventName, callback)
  }
}
