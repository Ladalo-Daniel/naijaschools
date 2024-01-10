'use client'

import { useGetProfileById } from '@/lib/react-query'

import React from "react"
import { User } from '@nextui-org/user'
import { useGetInstitutionById } from "@/lib/react-query"
import Link from 'next/link'
import { Skeleton } from '@/components/ui/skeleton'


const PostLikeUserCard = ({ userId }: { userId: string }) => {
    const {data, isPending} = useGetProfileById(userId)
    const author = data?.data

    const { data: institution } = useGetInstitutionById(author?.institution!)

    if (isPending) return <>
        <Skeleton className='w-72 h-4 my-1'/>
        <Skeleton className='w-40 h-4' />
    </>

  return (
    <>
        {
            author?.id && (
                <User   
                    as={Link}
                    name={author?.first_name + ' ' + author?.last_name}
                    description={author?.bio?.slice(0, 50) + (author?.bio?.slice(0, 51) ? "..." : "")}
                    className="transition-transform"
                    avatarProps={{
                        src: author?.image_url!
                    }}
                    href={`/dashboard/profile/${author?.username}`}
                />
            )
        }
    </>
  )
}

export default PostLikeUserCard