import { Post, getPostsByQuery } from '@/supabase/posts'
import { getProfileByUsername } from '@/supabase/user'
import Image from 'next/image'
import React from 'react'
import PostCard from '../../posts/PostCard'
import { pluralize } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'
import { getInstitutionById } from '@/supabase/institutions'
import ImageView from '../../posts/ImageView'

const ProfilePageComponent = async ({ username }: { username: string }) => {
    const {data: profile} = await getProfileByUsername(username)
    const {data: posts} = await getPostsByQuery("user", username)
    const { data: institution } = await getInstitutionById(profile?.institution!)
  return (
    <div className='flex flex-col gap-3'>
        <div className="mx-auto py-2">
            {/*  */}
            <ImageView post={{
                image: profile?.image_url!,
                user: profile?.username!,
            } as Post } profile/>
        </div>
        <div className="flex flex-col gap-3 justify-center items-center">
            <h2 className="text-xl">{profile?.first_name} {profile?.last_name}</h2>
            <p className="text-muted-foreground">@{profile?.username}</p>
        </div>
        <div className="flex flex-col gap-3 justify-center items-center">
            <h2 className="text py-1 text-center">{profile?.bio}</h2>
            <p className="text-muted-foreground mt-1">{institution.name}</p>
            <p className="text-muted-foreground mt-1">{profile?.faculty}</p>
        </div>
        <h2 className="text-2xl hidden py-2 text-primary justify-center items-center text-center">{posts?.length} Post{pluralize(posts?.length)}</h2>
        <div className="flex flex-col gap-4 justify-center items-center">
            {
                posts.map(post => (
                    <PostCard post={post} key={post.id} />
                ))
            }
        </div>
    </div>
  )
}

export default ProfilePageComponent