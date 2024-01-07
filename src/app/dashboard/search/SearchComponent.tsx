'use client'

import { useSearchArticles, useSearchCourses, useSearchInstitutions } from '@/lib/react-query/search'
import { useSearchParams } from 'next/navigation'
import React from 'react'
import GeneralSkeleton from '../components/skeletons/GeneralSkeleton'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import InstitutionSearchResults from './InstitutionSearchResults'
import CourseSearchResults from './CourseSearchResults'
import ArticleSearchResults from './ArticleSearchResults'
import AISearchResponse from './AISearchResponse'
import { SparkleIcon } from 'lucide-react'

const SearchComponent = () => {
    const searchParams = useSearchParams()
    const query = searchParams.get("q")

    const { data: courses, isPending: gettingCourses } = useSearchCourses(query || "")
    const { data: institutions, isPending: gettingInstitutions } = useSearchInstitutions(query || "")
    const { data: articles, isPending: gettingArticles } = useSearchArticles(query || "")

    if (gettingCourses || gettingInstitutions || gettingArticles) return <GeneralSkeleton />

  return (
    <div className='flex flex-col gap-3'>
        <h2 className="text-[18px] py-1.5 tracking-tighter">Search results for <span className="text-primary">{query}</span>.</h2>

        <section>
        <Tabs defaultValue="courses" className="max-w-4xl">
            <TabsList className=''>
                <TabsTrigger value="courses" className='flex flex-row items-center gap-1'>
                    Courses <span className={`${courses?.data.length ? "text-primary " : "bg-secondary "} h-5 w-5 flex items-center rounded-full`}>{courses?.data.length ? courses?.data.length : "0" }</span>
                </TabsTrigger>
                <TabsTrigger value="institutions" className='flex flex-row items-center gap-1'>
                    Institutions <span className={`${institutions?.data.length ? "text-primary " : "bg-secondary "} h-5 w-5 flex items-center rounded-full`}>{institutions?.data.length ? institutions?.data.length : "0" }</span>
                </TabsTrigger>
                <TabsTrigger value="articles" className='flex flex-row items-center gap-1'>
                    Articles <span className={`${articles?.data.length ? "text-primary " : "bg-secondary "} h-5 w-5 flex items-center rounded-full`}>{articles?.data.length ? articles?.data.length : "0" }</span>
                </TabsTrigger>
                <TabsTrigger value="ai" className='flex flex-row items-center gap-1 max-sm:hidden'>
                    AI Response <SparkleIcon size={16} className='animate-spin text-primary' />
                </TabsTrigger>
            </TabsList>
            <TabsContent value="courses">
                <CourseSearchResults courses={courses?.data!} query={query!}/>
            </TabsContent>

            <TabsContent value="institutions">
                <InstitutionSearchResults institutions={institutions?.data!}  query={query!} />
            </TabsContent>

            <TabsContent value="articles">
                <ArticleSearchResults articles={articles?.data!}  query={query!} />
            </TabsContent>

            <TabsContent value="ai">
                <AISearchResponse query={query!} />
            </TabsContent>
        </Tabs>
        </section>
    </div>
  )
}

export default SearchComponent