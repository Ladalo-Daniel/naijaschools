import { getProfile } from '@/supabase/user'
import { Card } from '@nextui-org/card'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { BookPlusIcon, BrainCircuit, ChevronRight, HistoryIcon, Podcast, SparklesIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const StudentDashBoardComponent = async () => {
  const profile = await getProfile()

  const list = [
    {
      tip: "Courses",
      href: "/dashboard/s/courses",
      cn: "dark:from-slate-700 dark:to-slate-900 from-slate-300 to-slate-500",
      icon: BookPlusIcon,
      image_url: '/s_dashboard/courses.jpg'
    },
    {
      tip: "Posts",
      href: "/dashboard/posts",
      cn: "dark:from-green-700 dark:to-green-900 from-green-400 to-green-500",
      icon: Podcast,
      image_url: '/gallery/g_img_f.jpg'
    },
    {
      tip: "Quizzes",
      href: "/dashboard/s/quiz",
      cn: "dark:from-green-700 dark:to-green-900 from-green-400 to-green-500",
      icon: BrainCircuit,
      image_url: '/s_dashboard/quiz.jpg'
    },
    {
      tip: "History",
      href: "/dashboard/s/quiz/history",
      cn: "dark:from-orange-700 dark:to-orange-900 bg-orange-300",
      icon: HistoryIcon,
      image_url: '/s_dashboard/time.jpg'
    },
    {
      tip: "AI Chat",
      href: "/dashboard/chat",
      cn: "dark:from-blue-700 dark:to-blue-900 bg-blue-300",
      icon: SparklesIcon,
      image_url: '/s_dashboard/light.jpg'
    },
  ]

  return (
    <section className='flex flex-col gap-3 bg-gradient-to-tr'>
      <h2 className='text-3xl font-semibold py-3 flex-1'>Welcome back <span className="text-primary">{profile?.data?.username}</span>!</h2>
      <p className='py-2 flex-1 tracking-tighter'>Hi <span className="text-primary">{profile?.data?.username}</span>, You are most welcome back. Now jump right in!</p>

      <div className='flex flex-wrap gap-4 w-auto py-5 md:flex-row max-xs:flex-col '>
         {
          list.map(itm => (
            <Card as={Link} key={itm.tip} href={itm.href} className={`p-2.5 bg-background border group rounded-md flex flex-col gap-2.5 justify-between min-w-[280px] hover:opacity-60 bg-gradient-to-tr hover:transition-all hover:animate-out cursor-pointer max-sm:w-full md:w-[320px] ${itm.cn} `}>
            {/* <AspectRatio ratio={1/1}>
              <Image 
                src={itm.image_url}
                alt={itm.tip}
                fill
                quality={100}
                className='rounded-xl object-cover'
              />
            </AspectRatio> */}
            <div className='flex flex-col gap-2 flex-1'>
              <itm.icon size={15}  />
              <p className='font-semibold text-xl'>{itm.tip}</p>
              <ChevronRight className='text-primary' size={20} />
            </div>
        </Card>
          ))
         }
      </div>
    </section>
  )
}

export default StudentDashBoardComponent