import { Button } from '@/components/ui/button'
import { Avatar } from '@nextui-org/avatar'
import Image from 'next/image'
import {useCallback, useState} from 'react'
import {FileWithPath, useDropzone} from 'react-dropzone'

type propTypes = {
  fieldChange: (FILE: File[]) => void, 
  mediaUrl?: string, 
  isProfile?: boolean
}

function FileUploader({ fieldChange, mediaUrl, isProfile }: propTypes) {

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
                <div className={isProfile ? 'flex gap-3 flex-col justify-center items-center' :`flex flex-1 w-full items-center p-5 lg:p-10`}>
                  <Image
                      src={fileUrl || '/icons/profile-placeholder.svg'}
                      alt='file'
                      width={1000}
                      height={1000}
                      className={isProfile ? 'w-28 h-28 rounded-full object-cover' : 'file_uploader-Image'}
                  />
                  {isProfile && !fileUrl && <p className="text-primary-600 cursor-pointer base-medium">Select a file to upload</p>}
                </div>
            </>
          ): (
              isProfile ? ( 
                <Avatar
                    src={'/assets/icons/profile-placeholder.svg'}
                    alt='file'
                    size='lg'
                    className={'w-28 h-28 object-cover cursor-pointer'}
                />) :
                <div className='file_uploader-box'>
                  {!isProfile && <>
                  <Avatar
                      src='/assets/icons/file-upload.svg'
                      alt='file-upload'
                      className={'w-28 h-28 object-cover cursor-pointer'}
                      size='lg'
                  />
                  <h3 className='base-medium text-light-2 m-2'>Drag/Upload files</h3>
                  <p className='small-regular mb-6 text-light-4'>SVG, PNG, JPG, JPEG</p>
                  <Button className='shad-button_dark_4'>Select from computer</Button></>}
              </div>
          )
      }
    </div>
  )
}

export default FileUploader