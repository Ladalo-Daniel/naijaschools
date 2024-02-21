"use client"

import { useSearchParams } from 'next/navigation'
import React, { useState } from 'react'
import useGetJobs from '../../job-listings.actions';
import MiniLoader from '@/components/MiniLoader';
import { Alert } from '@/components/ui/alert';
import Link from 'next/link';
import { shortMultiFormatDateString } from '@/lib/utils';
import { statesAndCapitalsNigeria } from '@/lib/faculties';
import { Button } from '@/components/ui/button';
import Error from '@/components/Error';


interface Job {
    job_title: string;
    job_state: string;
    job_city: string;
    job_location: string;
    date_posted: string;
    employer_logo: string;
    job_is_remote: boolean;
    job_description: string;
    employer_name: string;
    job_posted_at_datetime_utc: string;
    job_posted_at_timestamp: string
    // Add other properties as needed
  }

function ProfessionTypeComponent() {
    const searchparams = useSearchParams()
    const [selectedState, setSelectedState] = React.useState<string | null>(null);
    const [numPage, setNumPage] = useState(9)

    const q = searchparams.get("q")

    const { data, isLoading, error } = useGetJobs("search", {
        query: q,
        num_pages: numPage,
      });


      if(isLoading){
         return(
          <div className=' flex items-center justify-center'>
            <MiniLoader />
          </div>
         )
      }

      if(error){
         return(
          <div className=' flex items-center justify-center'>
            <Alert className=' text-red-500'>Something went wrong!</Alert>
          </div>
         )
      }

      if(data.length === 0){
         return(
          <Alert className=' ring-1 ring-red-100'>
          <p className=' text-center'>Opps! No result found for <span className=' text-red-500'>{q}</span>, but dont fleet, let give it another shot!</p>
          </Alert>
         )
      }

      if(error){
        return  <Error />
      }

      const filteredData = selectedState ? data.filter((d:Job) => d.job_city === selectedState) : data;

  return (
    <div className=' flex flex-col md:flex-row gap-5'>

      <div className=' md:w-3/4'>
        <h1 className=' text-4xl'>{q}</h1>
        <p className=' mt-5  text-lg'> View {q} below;</p>

        <div className=' mt-5 flex flex-col gap-7'>

          {filteredData.length === 0 &&
            <Alert className=' ring-1 ring-red-100'>
              <p className=' text-center'>Opps! No result found for <span className=' text-red-500'>{selectedState} state</span>, but dont fleet, let give another state a shot!</p>
            </Alert>
          }

          {filteredData?.map((d: Job, idx: number) => (
            <div key={idx} className=' flex flex-row items-start gap-3 p-4 border-t-1 border-t-zinc-200 border-b-1 border-b-zinc-200 hover:shadow-lg'>
              <p className=' h-[70px] w-[10px] p-2 bg-green-500'></p>
               {/* <Image  src={d?.employer_logo as string || ""} alt='employer_logo' fill /> */}
               <div className=' flex flex-col gap-3'>
                 <Link href={`#`} className=' text-2xl hover:text-yellow-700'>{d.job_title}</Link>
                 <div className=' flex flex-row gap-7 items-center'>
                   <p className=' text-lg'>{d.employer_name}</p>
                   <p className=' text-medium'>{d.job_city}</p>
                   <p>{shortMultiFormatDateString(d.job_posted_at_datetime_utc)}</p>
                 </div>
                 <p>{d.job_description.slice(0, 200)}...</p>
               </div>
               <>
               {
                d.job_is_remote === true ? 
                <p className=' bg-yellow-600 text-white p-1 rounded-md'>Remote</p> : 
                <p className=' bg-zinc-600 text-white p-1 rounded-md'>Onsite</p>
               }
               </>
            </div>
          ))}
        </div>
     </div>

     <div className=' p-4 h-[400px] overflow-y-auto ring-1 ring-zinc-300 md:w-1/4 flex flex-col gap-3'>
       <h1 className=' text-4xl'>Filter by State</h1>
       <Button onClick={() => setSelectedState(null)} className=' text-lg'>Back to all states</Button>
       <hr />
      <div className=' h-[400px] overflow-y-auto flex flex-col gap-3 custom-scrollba'>
          {statesAndCapitalsNigeria.map((s, idx) => (
            <ul key={idx} onClick={() => setSelectedState(s.state)}>
              <li className=' cursor-pointer p-1 hover:text-yellow-600 text-lg'>{idx + 1}. {s.state}</li>
            </ul>
          ))}
        </div>
     </div>

   </div>
  )
}

export default ProfessionTypeComponent