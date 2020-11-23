import express from 'express'
import http from 'http'
import setupSocketIO from '../config/socket'
import setupRabbitMQServer from '../config/rabbit-mq'
import env from '../../main/config/env'
import { RabbitMQServer } from '../../domain/services/rabbitmq-server'
import { SocketIO } from '../../domain/services/socket-io'

const app = express()
const httpServer = http.createServer(app)

const io = new SocketIO(httpServer)
const rabbitMQServer = new RabbitMQServer(env.RABBITMQ_URI)

setupSocketIO(io)
setupRabbitMQServer(rabbitMQServer)

httpServer.listen(9000)

export default io
