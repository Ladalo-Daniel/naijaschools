import MaxWrapper from '@/components/MaxWrapper'
import { getInstitutionById } from '@/supabase/institutions'
import React from 'react'
import InstitutionDetailComponent from './InstitutionDetailComponent'
import BackButton from '@/components/shared/BackButton'
import { getCoursesByQuery } from '@/supabase/courses'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


const InstitutionDetailPage = async ({ params }: { params: { institutionId: string } }) => {
    const { institutionId } = params
    const {data: institution} = await getInstitutionById(institutionId)
    const { data: courses } = await getCoursesByQuery("institution", institutionId)
  return (
    <MaxWrapper className='flex-1 bg-background'>
        <BackButton />
        <h1 className='text-2xl py-2 text-primary'>{institution.name} (Courses).</h1>
        
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