import socket from 'socket.io'

export interface ISocketIO {
  bootstrap: () => void

  emitEvent: (eventName: string, data: any) => boolean

  onEvent: (eventName: string, callback: any) => socket.Server
}
