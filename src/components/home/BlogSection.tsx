// import React from 'react'
// import Link from 'next/link';
// import { buttonVariants } from '../ui/button';
// import { getRecentArticles } from '@/supabase/articles';
// import ArticleReel from '../shared/ArticleReel';


// const BlogSection = async () => {
//   const { data: articles } = await getRecentArticles(6)
//   return (
//     <section className='flex flex-col gap-3'>
//         <h2 className="text-2xl hover:underline py-2 transition-all text-primary">Some of Our Articles.</h2>

//         <ArticleReel articles={articles} />
//         <section className="py-4">
//             <Link href={'/articles'} className={buttonVariants({
//                 variant: "link",
//             })}>See more...</Link>
//         </section>
//     </section>
//   )
// }

// export default BlogSection

'use client'

import * as React from "react"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { useGetRecentArticles } from "@/lib/react-query"
import ArticleItem from "../shared/ArticleItem"
import ArticleSkeleton from "../skeletons/ArticleSkeleton"
import { Card, CardHeader } from "@nextui-org/card"
import { MoveRight } from "lucide-react"
import { Button } from "@nextui-org/button"
import Link from "next/link"
import { useMediaQuery } from "@/hooks/use-media-query"
import ArticleReel from "../shared/ArticleReel"

export default function BlogSection() {
  const { data: articles, isPending } = useGetRecentArticles(6)
  const isDesktop = useMediaQuery("(min-width: 1228px)")

  if (isPending) return <ArticleSkeleton />
  if (isDesktop) {
    return (
      <Carousel className="max-sm:max-w-sm max-md:max-w-md">
        <CarouselContent className="-ml-1">
          {articles?.data.map(article => (
            <CarouselItem key={article.id} className="pl-1 md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <ArticleItem article={article} />
              </div>
            </CarouselItem>
          ))}
          <CarouselItem key={'s-mor'} className="pl-1 md:basis-1/2 lg:basis-1/3">
              <div className="p-1 my-auto">
              <Card className='bg-gradient hover:opacity-60 hover:animate-in cursor-pointer shadow-none rounded-none from-green-950 to-zinc-800 justify-center flex items-center'
                >
                    <CardHeader className='flex items-center justify-between' as={Link} href={'/articles'}>
                      <Button variant="flat" className="flex gap-1" color="success">
                        See more <MoveRight  size={18}/>
                      </Button>
                    </CardHeader>
                </Card>
              </div>
            </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    ) 
  }

  if (!isDesktop) {
    return (
      <div className="flex flex-col gap-3">
        <ArticleReel articles={articles?.data!} />
        <Button as={Link} href="/articles" variant="flat" className="my-4 w-fit" color="primary">See more <MoveRight size={15} /></Button>
      </div>
    )
  }

}

