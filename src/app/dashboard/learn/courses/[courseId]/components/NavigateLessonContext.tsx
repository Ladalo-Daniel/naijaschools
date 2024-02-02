'use client'

import { LessonList } from '@/supabase/lessons'
import React, { createContext } from 'react'

interface NavigateLessonContextProps {
    lessonId: string,
    children: React.ReactNode,
    lessons: LessonList,
}

export const NavContext = createContext({lessonId: '', lessons: [] as LessonList})

const NavigateLessonContext: React.FC<NavigateLessonContextProps> = ({ children, lessonId, lessons }) => {
  return (
    <NavContext.Provider value={{lessonId, lessons}}>
        { children }
    </NavContext.Provider>
  )
}

export default NavigateLessonContext