'use client'

import { Loader } from 'lucide-react'
import React, { useEffect, useMemo, useState } from 'react'

const MiniLoader = () => {
    const colors = useMemo(() => {
        const colors = ['green', 'blue', 'yellow', 'red', 'pink', 'orange']
        return colors
    }, [])

    const [colorI, setColorI] = useState(0)
    const [color, setColor] = useState(colors[colorI])

    useEffect(() => {
        const interval = setInterval(() => {
            setColorI((prev) => prev + 1 )
        }, 1000)
        try {
            setColor(colors[colorI])
        } catch (err) {
            return () => clearInterval(interval)
        }

        return () => clearInterval(interval)
    }, [color, colorI, colors])
  return (
    <Loader className='animate-spin' style={{color}} />
  )
}

export default MiniLoader