import MaxWrapper from '@/components/MaxWrapper'
import { getInstitutionById, getInstitutions } from '@/supabase/institutions'
import React from 'react'
import InstitutionDetailComponent from './components/InstitutionDetailComponent'
import BackButton from '@/components/shared/BackButton'
import { getCoursesByQuery } from '@/supabase/courses'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import AddCourseForm from '../../courses/components/AddCourseForm'


const InstitutionDetailPage = async ({ params }: { params: { institutionId: string } }) => {
    const { institutionId } = params
    const { data: courses } = await getCoursesByQuery("institution", parseInt(institutionId))
    const {data: institution} = await getInstitutionById(institutionId)
    const {data: institutions} = await getInstitutions()

  return (
    <MaxWrapper className='flex-1 bg-background'>
        <BackButton />
        <h1 className='text-2xl py-2 text-primary'>{institution.name} (Courses).</h1>

        <div>
          <AddCourseForm institutions={institutions} institutionId={institutionId} />
        </div>
        
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="description">
            <AccordionTrigger>Description</AccordionTrigger>
            <AccordionContent>
              {institution.description}
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <InstitutionDetailComponent institution={institution} courses={courses} />
    </MaxWrapper>
  )
}

export default InstitutionDetailPage