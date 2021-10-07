import Queue from 'bull'
import ytdl from 'ytdl-core'
import fs from 'fs'
import { Video } from '../models/video.model'
import { Events } from '../types/events.enum'
import { app } from '../app'

const downloadQueue = new Queue('download queue', process.env.REDIS_URL!, {
    redis: {
        password: process.env.REDIS_PASSWORD
    }
})


downloadQueue.process((job, done) => {
    return new Promise(async (resolve, reject) => {
        const { youtubeUrl } = job.data

        const info = await ytdl.getBasicInfo(youtubeUrl)
        const thumbnail = info.videoDetails.thumbnails[0].url

        const title =
        info.videoDetails.title +
        ' by ' +
        info.videoDetails.author.name +
        '-' +
        new Date().getTime().toString()

    ytdl(youtubeUrl)
        .pipe(fs.createWriteStream(`${process.cwd()}/downloads/${title}.mp4`))
        .on('finish', async () => {
            app.io.emit(Events.VIDEO_DOWNLOADED, title)

            console.log('Download complete')

            const file = `${process.cwd()}/downloads/${title}.mp4`
            const video = new Video({
                title,
                file,
                thumbnail
            })

            await video.save()

            done()

            resolve({ title })
        })
        .on('ready', () => {
            console.log('Download started')
            app.io.emit(Events.VIDEO_STARTED, title)
        })
        .on('error', (error) => {
            app.io.emit(Events.VIDEO_ERROR, error)
            done(error)
            reject(error)
        })
        .on('open', () => {
            app.io.emit(Events.VIDEO_DOWNLOADING)
        })
        .on('pipe', () => {
            console.log('pipe')
        })
        .on('unpipe', () => {
            console.log('unpipe')
        })
    })
})

export { downloadQueue }