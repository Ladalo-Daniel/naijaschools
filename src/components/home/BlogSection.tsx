import { Card, CardBody, CardHeader } from '@nextui-org/card'
import React from 'react'
import { AspectRatio } from '../ui/aspect-ratio'
import Image from 'next/image'
import Link from 'next/link';
import { buttonVariants } from '../ui/button';

const blogs = [
    {
      title: "Why Naijaschools?",
      description: "Discover a personalized learning experience with quizzes curated specifically for your interests and aligned with your institution's curriculum. Tailor your quiz-taking approach to suit your preferences.",
      image: '/images/w-flowers.jpg'
    },
    {
      title: "Navigating Naijaschools interface",
      description: "Delve into an intuitive interface designed to enhance your learning journey. Access comprehensive guides accompanying quiz attempts, aiding in mastering complex concepts effortlessly.",
      image: '/images/car.jpg'
    },
    {
      title: "Relevance of AI in the field of engineering",
      description: "Explore the intersection of Artificial Intelligence and engineering. Dive into captivating blogs discussing the impact and applications of generative AI within the realm of engineering studies at Naijaschools.",
      image: '/images/portrait_ttl.jpg'
    },
    {
      title: "Difficulties in assessing online tools in Nigerian institutions.",
      description: "Discover the challenges faced in evaluating and implementing online tools within Nigerian educational institutions. Experience an enriched user interface and a streamlined user experience crafted by our dedicated engineering team.",
      image: '/images/biz_ttl.jpg'
    },
  ];
  

const BlogSection = () => {
  return (
    <section className='flex flex-col gap-3'>
        <h2 className="text-2xl hover:underline py-2 transition-all text-primary">Some of Our Articles.</h2>

        <div className='flex flex-wrap gap-4'>
        {
            blogs?.map(blog => (
                <Card className='bg-gradient w-68 min-h-50 max-w-[500px] hover:opacity-60 hover:animate-in cursor-pointer max-sm:w-full from-green-950 to-zinc-800' key={blog?.title}>
                    <CardHeader className='flex items-center justify-between'>
                        <AspectRatio ratio={16/9} className='bg-muted'>
                        <Image
                            src={blog.image}
                            alt={blog.title}
                            fill
                            className="rounded-md object-cover"
                        />
                        </AspectRatio>
                    </CardHeader>
                    <CardBody className='px-4'>
                        <h2 className='text-primary py-2 font-semibold'>
                            {blog.title}
                        </h2>
                        <p className='py-2 text-muted-foreground'>
                            {blog.description}
                        </p>
                    </CardBody>
                </Card>
            ))
        }
        </div>
        <section className="py-4">
            <Link href={'#'} className={buttonVariants({
                variant: "link",
            })}>See more...</Link>
        </section>
    </section>
  )
}

export default BlogSection