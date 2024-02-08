import Image from 'next/image'
import React from 'react'

const Component404 = () => {
  return (
    <div className="flex-1">
        <Image
            src={'/svg/404.svg'}
            width={500}
            height={500}
            quality={100}
            alt='Not found'
            aria-label='Not found'
            className='' 
        />
    </div>
  )
}

export default Component404