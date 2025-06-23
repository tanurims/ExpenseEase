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
      
    </div>
  
}

export default ProfilePhotoSelector
