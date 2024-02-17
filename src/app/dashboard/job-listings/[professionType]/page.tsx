import MaxWrapper from '@/components/MaxWrapper'
import BackButton from '@/components/shared/BackButton'
import React from 'react'
import ProfessionTypeComponent from './components/ProfessionTypeComponent'

const ProfessionType = () => {
  return (
    <MaxWrapper className='max-w-7xl flex-1 bg-background' >
        <BackButton />

        <section>
            <ProfessionTypeComponent />
        </section>
    </MaxWrapper>
  )
}

export default ProfessionType