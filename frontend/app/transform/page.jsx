'use client'

import React , {useState} from 'react'
import ImageUpload from '../../components/ImageUpload'
import { Loader } from '@mantine/core';

export default function TransformPage(){

    const [clothImage , setClothImage] = useState("")
    const [modelImage , setModelImage] = useState("")
    const [resultImage , setResultImage] = useState("https://www.nicepng.com/png/detail/802-8027356_fashion-clipart-fashion-icon-fashion-icon-png.png")
    const [loading , setLoading] = useState(false)

    const fileTypes = ["JPG", "PNG", "GIF"];

    const handleTransformClick = () =>{
        console.log(clothImage , modelImage)
        setLoading(true)

        // TODO : to make call for '/transform' endpoint 
        setInterval(()=>{
            setResultImage("https://www.nicepng.com/png/detail/249-2491703_contact-profile-user-default-female-suit-comments-default.png")
            setLoading(false)
        } , 2000)
    }

    return(
        <div className="container flex h-full flex-col md:flex-row md:space-x-1 font-sans" 
          style={{
            maxWidth: "100%",
            maxHeight: "80vh",
            }}
        >
        
            <div className="w-full border md:w-1/2 p-4 ">
                <div className="flex flex-col md:flex-row md:justify-around items-center">
                <div className="border border-gray-300  m-4">
                    <ImageUpload title ="Upload Model" setImage={setModelImage}/>
                </div>
                <div className="border border-gray-300  m-4">
                    <ImageUpload title ="Upload Cloth" setImage={setClothImage}/>
                </div>
                </div>    
                <div className="flex flex-row items-center justify-center w-full ">
                    <button 
                        className="fixed-size-button flex flex-row items-center justify-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded text-[2rem]"
                        onClick = {handleTransformClick}
                        disabled = {loading}
                    >
                        {loading ? <Loader color="white"/> : "Transform"}
                    </button>
                </div>
            </div>
            
            
            <div className="w-full md:w-1/2 p-4 border flex justify-center items-center">
                <div className="border border-gray-300 p-4 md:w-1/2 flex flex-row justify-center items-center">
                    <img src={resultImage} className="fixed-size-image"/>
                </div>
            </div>
        </div>
    
    )
}