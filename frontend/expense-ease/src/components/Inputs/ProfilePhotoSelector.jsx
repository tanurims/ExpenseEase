import React, { useRef } from 'react'
import { useState } from 'react'
import { LuUser, LuUpload, LuTrash } from 'react-icons/lu';

const ProfilePhotoSelector = ({image, setImage}) => {

    const inputRef = useRef(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleImageChange = (event) =>{
        const file = event.target.files[0];

        //set image state
        setImage(file)

        //create a preview url from file
        const preview = URL.createObjectURL(file);
        setPreviewUrl(preview);
    }

    const handleRemoveImage = () =>{
        //reset image state
        setImage(null);
        setPreviewUrl(null);
    }

    const onChooseFile = () => {
        inputRef.current.click();
    }

  return <div className='flex justify-center mb-6'>
    <input
    type='file'
    ref={inputRef}
    className='hidden'
    onChange={handleImageChange}
    accept='image/*'
    />

    {!image ? (
        <div className='w-20 h-20 flex items-center justify-center bg-purple-100 rounded-full relative'>
            <LuUser className='text-4xl text-primary'/>

            <button
            type='button'
            className='w-8 h-8 flex items-center justify-center bg-primary text-white rounded-full absolute bottom-1 right-1'
            onClick={onChooseFile}>
                <LuUpload/>
            </button>
        </div>
    ) : (
        <div className='w-20 h-20 flex items-center justify-center bg-purple-100 rounded-full relative'>
            <img 
            src={previewUrl}
            alt='profile photo'
            className='w-20 h-20 rounded-full object-cover'
            />
            <button
            type='button'
            className='w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full absolute bottom-1 right-1'
            onClick={handleRemoveImage}>
                <LuTrash/>
            </button>
        </div>

    )}
      
    </div>
  
}

export default ProfilePhotoSelector
