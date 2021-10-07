/* eslint-disable no-restricted-globals */
import React from 'react'
import axios from 'axios'
import FileDownload from 'js-file-download'

interface VideosProps {
    video: {
        id: string | undefined
        title: string
        thumbnail: string
    }
}

const Videos: React.FC<VideosProps> = ({ video }) => {
    const { id, title, thumbnail } = video

    const downloadVideo = async (event: any) => {
        const videoId = event.target.id
        const filename = event.target.title
        axios
            .get(`http://localhost:3000/api/downloads/${videoId}`, {
                responseType: "blob",
            })
            .then((response) => {
                FileDownload(response.data, `${filename}.mp4`)
            })
    }
    
    const removeVideo = async (event: any) => {
        const videoId = event.target.title
        axios
          .delete(`http://localhost:3000/api/downloads/${videoId}`)
          .then((respsonse) => {
                window.location.reload()
          })
    }

    return (
        <div className="card" style={{ width: "18rem" }}>
        <img src={thumbnail} className="card-img-top" alt="thumbnail" />
        <div className="card-body">
            <h6 className="card-text">{title}</h6>
            <button
                id={id}
                className="btn btn-success rounded"
                style={{ width: "100px" }}
                onClick={downloadVideo}
                title={title}
            >
            Download
            </button>
            <button
                title={id}
                className="btn btn-danger rounded"
                onClick={removeVideo}
            >
            Delete
            </button>
        </div>
        </div>
    )
}

export default Videos