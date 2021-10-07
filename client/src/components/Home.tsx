/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import Videos from './Videos'

interface notifyOptions {
    success: boolean
}


const notify = (message: string, { success }: notifyOptions) => {
    if (success) {
      return toast.success(message)
    }
    return toast.error(message)
}

interface HomeProps {

}

const socket = io('http://localhost:3000/')

const Home: React.FC<HomeProps> = () => {

    const [videos, setVideos] = useState([])
    const [isDownloading, setIsDownloading] = useState<boolean>(false)

    useEffect(() => {
        socket.on("VIDEO_DOWNLOADED", (data) => {
            notify(`${data} Downloaded`, { success: true })
            setIsDownloading(false)
            window.location.reload()
        });
    
        socket.on("VIDEO_STARTED", (data) => {
          notify(`Download Started ${data}`, { success: true });
        });
    
        socket.on("VIDEO_DOWNLOADING", () => {
            if(!isDownloading) {
                console.log('GOWNO')
                setIsDownloading(true)
            }
        })

        axios
            .get('http://localhost:3000/api/downloads')
            .then((res) => {
                setVideos(res.data)
            })
            .catch((error) => {
                console.log(error)
            })
      }, [])

    const downloadVideo = (event: any) => {
        event.preventDefault()
    
        const youtubeUrl = event.target.elements.youtubeUrl.value
    
        axios
            .post('http://localhost:3000/api/downloads', { youtubeUrl })
            .then((res) => {
                notify('Fetching video details...', { success: true })
            })
            .catch((error) => {
                notify('Something went wrong', { success: false })
            })
      }

    return (
        <div>
        <div className="p-5 mb-4 bg-light rounded-3">
            <div className="container-fluid py-5">
            <h1 className="display-5 fw-bold">
                Download your favorite Youtube videos
            </h1>
            </div>
            <form onSubmit={downloadVideo}>
            <div>
                <label htmlFor="youtubeUrl" className="form-label">
                Enter link
                </label>
                <input type="url" id="youtubeUrl" className="form-control" required />
                <div id="urlHelpBlock" className="form-text">
                E.g. https://www.youtube.com/watch?v=PCicKydX5GE
                </div>
                <br />
                <button type="submit" className="btn btn-primary btn-lg">
                Download
                </button>
                {isDownloading ?
                    toast.loading('Downloading...', {
                        duration: 1000000
                    }) : null
                }
                <Toaster />
            </div>
            </form>
        </div>
        <h3>Downloaded videos</h3>
        <div style={{ margin: 10 }} className="row">
            {videos.map((video, index) => {
                return <Videos video={video} key={index} />
            })}
        </div>
        </div>
    )
}

export default Home