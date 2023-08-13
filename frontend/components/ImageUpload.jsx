import { useState } from "react";

const ImageUpload = ({title , setImage}) => {
    
    const[baseImage , setBaseImage] = useState("https://www.nicepng.com/png/detail/802-8027356_fashion-clipart-fashion-icon-fashion-icon-png.png")
    const convertbase64 = (file) => {
        return new Promise((resolve,reject)=>{
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);

            fileReader.onerror = (error) => {
                reject(error);
            }    
            }
        })
    }
   
    const uploadImage = async (e) => {
        const file = e.target.files[0]
        const base64 = await convertbase64(file);
        setBaseImage(base64);
        setImage(base64)
    };
    
  return (
    <>
        <div className="m-4 ">
            <div className="flex flex-row items-center justify-center w-full text-[2rem]">{title}</div>
            <img src={baseImage} className="fixed-size-image"/>
            <br></br>
            <div>
                <input type="file" placeholder="Enter the crop image" onChange={(e) => {uploadImage(e)}} />
            </div>
        </div>
        
    </>
  );
};

export default ImageUpload;