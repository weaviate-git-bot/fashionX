'use client'

import React , {useState , useEffect} from 'react'
import ImageUpload from './ImageUpload'
import { Loader } from '@mantine/core';

export default function TransformPage({clothImageUrl}){

    const [modelImageUrl , setModelImageUrl] = useState("")
    const [resultImage , setResultImage] = useState("https://www.nicepng.com/png/detail/802-8027356_fashion-clipart-fashion-icon-fashion-icon-png.png")
    const [loading , setLoading] = useState(false)
    const [selectedModel , setSelectedModel] = useState(-1)
    const [models , setModels] = useState(
        [
            {url : "https://st.depositphotos.com/55979218/61403/v/450/depositphotos_614033362-stock-illustration-short-sleeve-shirt-vector-illustration.jpg"} , 
            {url : "https://st.depositphotos.com/55979218/61403/v/450/depositphotos_614033362-stock-illustration-short-sleeve-shirt-vector-illustration.jpg"} , 
            {url : "https://st.depositphotos.com/55979218/61403/v/450/depositphotos_614033362-stock-illustration-short-sleeve-shirt-vector-illustration.jpg"} , 
            {url : "https://st.depositphotos.com/55979218/61403/v/450/depositphotos_614033362-stock-illustration-short-sleeve-shirt-vector-illustration.jpg"} , 
            {url : "https://st.depositphotos.com/55979218/61403/v/450/depositphotos_614033362-stock-illustration-short-sleeve-shirt-vector-illustration.jpg"} , 
            {url : "https://st.depositphotos.com/55979218/61403/v/450/depositphotos_614033362-stock-illustration-short-sleeve-shirt-vector-illustration.jpg"} , 
            {url : "https://st.depositphotos.com/55979218/61403/v/450/depositphotos_614033362-stock-illustration-short-sleeve-shirt-vector-illustration.jpg"} 
        ]
    )

    useEffect(()=>{
        // TODO : Call to backend to fetch the list of model images
        // setModels(response.data)
    } , [])

    const handleSelectModelClick = (id , url) => {
        setSelectedModel(id)
        setModelImageUrl(url)

    }

    const handleTransformClick = () =>{
        console.log(clothImageUrl)
        console.log(modelImageUrl)
        setLoading(true)

        // TODO : to make call for '/transform' endpoint 
        setInterval(()=>{
            setResultImage(models[0].url)
            setLoading(false)
        } , 2000)
    }


    return(
        <div className="container h-full md:space-x-1 font-sans" 
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            }}
        >
            <div className="container flex h-full flex-col md:flex-row md:space-x-1 font-sans">
                <div className="w-full border md:w-1/2 p-4 ">
                    <div className="m-4 max-h-[60vh] flex flex-wrap w-full overflow-y-scroll ">
                        {models.map((m , i) => {
                            return (
                                <div key={i} 
                                    className= {`h-[180px] w-fit max-w-[45%] m-[5px] flex overflow-hidden cursor-pointer border-[3px] ${i==selectedModel ? 'border-blue-500' :'border-transparent'}`}
                                    onClick={() => handleSelectModelClick(i , m.url)}
                                 >
                                    <img className='h-[180px] w-auto' src = {m.url} />
                                </div>
                            )
                        })}
                    </div>
                </div>
            
                <div className="w-full md:w-1/2 p-4 border flex justify-center items-center">
                    <div className="md:w-[80%] h-full flex flex-row justify-center items-center">
                        <img src={resultImage} className='h-full' />
                    </div>
                </div>
            </div>

            <div className="flex flex-row items-center justify-center w-full ">
                <button 
                    className="fixed-size-button flex flex-row items-center justify-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 my-4 rounded text-[1.2rem]"
                    onClick = {handleTransformClick}
                    disabled = {loading}
                >
                    {loading ? <Loader color="white"/> : "Transform"}
                </button>
            </div>
        </div>
    
    )
}