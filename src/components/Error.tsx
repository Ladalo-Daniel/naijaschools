import React from 'react'
import BackButton from './shared/BackButton'

interface ErrorProps {
    type?: string
}

const Error: React.FC<ErrorProps> = ({ type }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center">
        <BackButton />

        <p className="text-rose-500 text-2xl py-4">Sorry, an error occured please try again.</p>
    </div>
  )
}

export default Error