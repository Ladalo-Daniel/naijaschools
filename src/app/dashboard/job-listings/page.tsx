import MaxWrapper from '@/components/MaxWrapper'
import BackButton from '@/components/shared/BackButton'
import JobSearch from './components/JobSearch'
import JobProfessions from './components/JobProfessions'

const JobListingPage = () => {
  return (
    <MaxWrapper className='max-w-7xl flex-1 bg-background'>
         <BackButton />
         <section className=' flex flex-col gap-4'>
            <div className=' flex flex-col gap-3'>
                <h1 className=' text-2xl text-center'>Grow your Career on Naijaschools Job Listings Page</h1>
                <p className=' text-lg text-center'>Find your dream jobs in Nigeria, share your ideas and network with other professionals.</p>
                <p className=' text-green-500 text-lg text-center'>Dont forget! We care so much about your Academic Success!</p>
            </div>
            <JobSearch />
            <JobProfessions />
         </section>
    </MaxWrapper>
  )
}

export default JobListingPage