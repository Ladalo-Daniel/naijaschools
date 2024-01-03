'use client'

import { Button } from '@/components/ui/button'
import { Avatar } from '@nextui-org/avatar'
import Image from 'next/image'
import {useCallback, useState} from 'react'
import {FileWithPath, useDropzone} from 'react-dropzone'
import { AspectRatio } from '../ui/aspect-ratio'

type propTypes = {
  fieldChange: (FILE: File[]) => void, 
  mediaUrl?: string, 
  isProfile?: boolean
}

function PostFileUploader({ fieldChange, mediaUrl, isProfile }: propTypes) {

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
    <div {...getRootProps()} className={isProfile ? 'max-w-5xl flex flex-1' : 'flex flex-center cursor-pointer rounded-xl gap-2 bg-dark-3'}>
      <input {...getInputProps()} className='cursor-pointer' />
      {
        fileUrl ?
          (
            <>
                <div className={isProfile ? 'flex gap-3 flex-col justify-center items-center' :`flex flex-1 items-center p-5 lg:p-10`}>
                  <AspectRatio ratio={16/9}>
                  <Image
                      src={fileUrl || '/icons/profile-placeholder.svg'}
                      alt='file'
                      fill
                      className={isProfile ? 'w-28 h-28 rounded-full object-cover' : 'object-cover rounded-md'}
                  />
                  </AspectRatio>
                  {isProfile && !fileUrl && <p className="text-primary-600 cursor-pointer base-medium">Select a file to upload</p>}
                </div>
            </>
          ): (
              isProfile ? ( 
                <Avatar
                    src={'/icons/profile-placeholder.svg'}
                    alt='file'
                    size='lg'
                    className={'w-28 h-28 object-cover cursor-pointer'}
                />) :
                <div className='w-full flex mx-auto justify-center items-center'>
                  {!isProfile && 
                  <div>
                    <Image
                        src='/icons/file-upload.svg'
                        alt='file-upload'
                        className={'w-28 h-28 cursor-pointer'}
                        width={50}
                        height={50}
                    />
                    <h3 className='base-medium text-muted m-2'>Drag/Upload files</h3>
                    <p className='small-regular mb-6 text-muted'>SVG, PNG, JPG, JPEG</p>
                    <Button className='' variant={'ghost'}>Select from computer</Button>
                  </div>
                  }
                </div>
          )
      }
    </div>
  )
}

export default PostFileUploader