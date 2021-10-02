import { FastifyInstance, FastifyRequest, RouteOptions, FastifyReply } from 'fastify'
import { Video } from '../models/video.model'
import { downloadQueue } from '../queues/download.queue'
import fs from 'fs/promises'

export const downloadRouter = (fastify: FastifyInstance, opts: RouteOptions, done: Function) => {
    fastify.get(
        '/:id', 
        opts,
        async (req: FastifyRequest, rep: FastifyReply) => {
            //@ts-ignore
            const { id } = req.params
            const video = await Video.findByIdAndDelete(id);

            if (!video) {
                return rep.status(404).send('Video not found')
            }
            const { file } = video

            rep.status(200).download(file)
        }
    )
    fastify.post(
        '/',
        opts,
        async (req: FastifyRequest, rep: FastifyReply) => {
            try {
                //@ts-ignore
                const { youtubeUrl } = req.body
                await downloadQueue.add({ youtubeUrl })
                return rep.status(200).send('Downloading')
              } catch (error) {
                throw error
              }
        }
    )
    fastify.get(
        '/',
        opts,
        async (req: FastifyRequest, rep: FastifyReply) => {
            const videos = await Video.find().sort({ createdAt: -1 })
            rep.status(200).send(videos)
        }
    )
    fastify.delete(
        '/:id',
        opts,
        async (req: FastifyRequest, rep: FastifyReply) => {
            //@ts-ignore
            const { id } = req.params;

            const video = await Video.findByIdAndDelete(id)

            if (video) {
                await fs.unlink(video.file!)
            }

            rep.status(200).send(video)
        }
    )

    done()
}