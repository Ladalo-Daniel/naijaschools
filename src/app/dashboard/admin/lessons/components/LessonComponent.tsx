import { InstitutionList, getInstitutions } from '@/supabase/institutions'
import CreateUpdateLesson from './CreateUpdateLesson'
import LessonFilter from './LessonFilter'
import React from 'react'

interface LessonComponentProps {}

const LessonComponent: React.FC<LessonComponentProps> = async ({}) => {
  const { data: institutions } = await getInstitutions()
  return (
    <div className='flex flex-col gap-3'>
      <LessonFilter schools={institutions as InstitutionList} />
      <CreateUpdateLesson institutions={institutions}/>
    </div>
  )
}

export default LessonComponent