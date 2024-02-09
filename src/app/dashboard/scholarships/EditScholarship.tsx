import React from 'react'
import CreateScholarshipForm from './CreateScholarshipForm'
import { Scholarship } from '@/supabase/scholarships'

function EditScholarship({scholarship}: {scholarship: Scholarship}) {
  return (
    <>
      <CreateScholarshipForm isUpdate isEdit scholarship={scholarship} />
    </>
  )
}

export default EditScholarship