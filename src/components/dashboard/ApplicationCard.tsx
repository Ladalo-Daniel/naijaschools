import { Check} from 'lucide-react'
import React from 'react'
import { Card } from '../ui/card'

export default function ApplicationCard() {
  return (
    <>
      <Card className='text-gray flex flex-col gap-4 p-5 rounded-md font-poppins'>
         <h1 className=' text-gray py-2 font-bold text-lg text-primary'>Application Status</h1>
         <hr className=' text-gray' />
         <p>You are a part of our 3MTT Learning Community and will be in queue for future phases of the 3MTT training program.</p>
         <p>The learning community will provide you with self-paced resources that you can leverage on your learning journey. In the learning community, you will have companions on your learning journey through connections with other learners in your local government and state learning similar skills and the support of a dedicated community manager to guide you along the way.</p>
         <p>Your Learning Community journey will begin on the 4th of December. You can begin your learning journey with some introductory courses in your skill area in the resources section.</p>
         <p>We are excited to support your learning journey.</p>
         <p>Thank you for your cooperation, and enjoy your 3MTT journey.</p>
         <Card className=' flex items-center flex-row justify-between rounded-sm bg-lightSlate2 text-darkSlate p-2 md:p-5'>
            <h2 className=' text-sm md:text-lg font-medium'>Confirm your skill and technical level</h2>
            <Check className='text-green text-2xl' />
         </Card>
         <Card className=' flex items-center flex-row justify-between rounded-sm bg-lightSlate2 text-darkSlate p-2 md:p-5'>
            <h2 className=' text-sm md:text-lg font-medium'>Take our questionnaire</h2>
            <Check className=' text-green text-2xl' />
         </Card>
      </Card>
    </>
  )
}
