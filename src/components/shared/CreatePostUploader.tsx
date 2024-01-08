'use client'

import Image from 'next/image'
import {useCallback, useState} from 'react'
import {FileWithPath, useDropzone} from 'react-dropzone'
import { AspectRatio } from '../ui/aspect-ratio'

type propTypes = {
  fieldChange: (FILE: File[]) => void, 
  mediaUrl?: string, 
}

function CreatePostUploader({ fieldChange, mediaUrl }: propTypes) {

    const [file, setFile] = useState<File[]>([])
    const [fileUrl, setFileUrl] = useState(mediaUrl)

    const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
        setFile(acceptedFiles)
        fieldChange(acceptedFiles)
        setFileUrl(URL.createObjectURL(acceptedFiles[0]))
    }, [file])

    const {getRootProps, getInputProps} = useDropzone({
        onDrop,
        accept: {
            "image/*": ['.jpg', '.png', '.jpeg', '.svg']
        }
    })

  return (
    <div {...getRootProps()} className={'flex flex-center cursor-pointer rounded-xl gap-2 bg-dark-3'}>
      <input {...getInputProps()} className='cursor-pointer' />
      {
        fileUrl ?
          (
              <AspectRatio ratio={16/9} className=''>
                <Image
                    src={fileUrl || '/icons/profile-placeholder.svg'}
                    alt='image'
                    fill
                    className={'object-cover rounded-md'}
                />
              </AspectRatio>
          ): (
                <div className=''>
                  <Image 
                    src={"/icons/file-upload.svg"}
                    alt='upload file'
                    quality={100}
                    width={500}
                    height={500}
                    className='w-12 h-12'
                    />
                </div>
          )
      }
    </div>
  )
}

export default CreatePostUploader