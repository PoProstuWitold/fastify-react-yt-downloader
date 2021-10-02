import 'reflect-metadata'
import { config } from 'dotenv'
config()
import { app } from './app'
import mongoose from 'mongoose'

const { 
    REDIS_URL,
    REDIS_PASSWORD,
    YTDL_NO_UPDATE, 
    MONGO_DB_URI 
} = process.env

const bootstrap = async () => {

    if(!REDIS_URL) {
        throw new Error('REDIS_HOST must be provided')
    }

    if(!REDIS_PASSWORD) {
        throw new Error('REDIS_PASSWORD must be provided')
    }

    if(!MONGO_DB_URI) {
        throw new Error('MONGO_DB_URI  must be provided')
    }

    try {
        await mongoose.connect(MONGO_DB_URI, {
            authSource: 'admin',
            user: 'root',
            pass: 'example'
        })
        console.log(`Connected to MongoDB with URI: ${MONGO_DB_URI}`)

        app.listen(3000, async (err, address) => {
            if(err) {
                app.log.error(err)
                console.log(err)
                process.exit(1)
            }
        })

        

    } catch (err) {
        app.log.error(err)
        return
    }

    
}

void bootstrap()