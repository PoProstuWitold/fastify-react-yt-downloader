import mongoose from 'mongoose'

export interface VideoDoc extends mongoose.Document {
    title: string
    file: string
    thumbnail: string
}

const videoSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        file: {
            type: String,
            required: true,
        },
        thumbnail: {
            type: String,
        },
    },
    { timestamps: true }
)

videoSchema.set('toJSON', {
    transform(doc: VideoDoc, ret: any) {
        ret.id = ret._id
        delete ret._id
        delete ret.__v
    }
})

export const Video = mongoose.model<VideoDoc>('video', videoSchema)