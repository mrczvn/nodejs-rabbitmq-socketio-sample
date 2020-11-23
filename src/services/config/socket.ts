import { SocketIO } from '../../domain/services/socket-io'

export default (io: SocketIO): void => {
  io.bootstrap()
  io.onEvent('connection', () => console.log('user connected'))
}
