import fastifyCors from 'fastify-cors'
import Fastify, { FastifyInstance } from 'fastify'
import path from 'path'
import fastifyIO from 'fastify-socket.io'
import fastifyStatic from 'fastify-static'
import { downloadRouter } from './routes/download.routes'

const app: FastifyInstance = Fastify({
    logger: true,
    maxParamLength: 200
})

app.register(fastifyIO, {
    cors: {
        origin: '*'
    }
})

app.register(fastifyStatic, {
    root: path.join(__dirname, 'public')
})

//@ts-ignore
app.register(downloadRouter, {
    prefix: '/api/downloads'
})
app.register(fastifyCors, {
    origin: '*'
})

export { app }