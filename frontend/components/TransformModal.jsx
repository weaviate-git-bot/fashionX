'use client'

import React, { useState, useEffect } from 'react'
import ImageUpload from './ImageUpload'
import { Loader } from '@mantine/core';
import axios from "axios"

export default function TransformPage({ clothImageUrl }) {

    const [modelImageUrl, setModelImageUrl] = useState("")
    const [resultImage, setResultImage] = useState(clothImageUrl)
    const [loading, setLoading] = useState(false)
    const [selectedModel, setSelectedModel] = useState(-1)
    const [models, setModels] = useState(
        [
            { url: "/placeholder.gif" },
            { url: "/placeholder.gif" },
            { url: "/placeholder.gif" },
            { url: "/placeholder.gif" },
            { url: "/placeholder.gif" },
            { url: "/placeholder.gif" },
        ]
    )

    useEffect(() => {
        axios.get("http://localhost:8080/models").then(({ data }) => {
            setModels(data)
        })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    const handleSelectModelClick = (id, url) => {

        setSelectedModel(id)
        setModelImageUrl(url)
        setResultImage(url)

    }

    const handleTransformClick = () => {
        setLoading(true)

        if (selectedModel === -1) {
            return
        }

        console.log(selectedModel, clothImageUrl)

        axios.post("http://localhost:8080/virtual-try-on", {
            modelID: selectedModel,
            imageURL: clothImageUrl
        }).then(({ data }) => {
            console.log(data)
            setResultImage(data)
            setLoading(false)
        }
        ).catch((err) => {
            console.log(err)
            setLoading(false)
        })
    }


    return (
        <div className="container h-full md:space-x-1 font-sans"
            style={{
                maxWidth: "100%",
                maxHeight: "100%",
            }}
        >
            <div className="container flex h-full flex-col md:flex-row md:space-x-2 font-sans">
                <div className="w-full md:w-1/2 p-4 ">
                    <div className="m-4 max-h-[60vh] flex flex-wrap w-full overflow-y-scroll ">
                        {models.map((m, i) => {
                            return (
                                <div key={i}
                                    className={`h-[180px] w-fit max-w-[45%] m-[5px] flex overflow-hidden cursor-pointer border-[3px] ${m.model_id == selectedModel ? 'border-blue-500' : 'border-transparent'}`}
                                    onClick={() => handleSelectModelClick(m.model_id, m.url)}
                                >
                                    <img className='h-[180px] w-auto' src={m.url} />
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div className="w-full md:w-1/2 p-4 flex justify-center items-center">
                    <div className="md:w-[80%] h-full flex flex-row justify-center items-center">
                        <img src={resultImage} className='h-full' />
                    </div>
                </div>
            </div>

            <div className="flex flex-row items-center justify-center w-full ">
                <button
                    className="fixed-size-button flex flex-row items-center justify-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 my-4 rounded text-[1.2rem]"
                    onClick={handleTransformClick}
                    disabled={loading}
                >
                    {loading ? <Loader color="white" /> : "Transform"}
                </button>
            </div>
        </div>

    )
}