'use client'

import React, { useState } from 'react'
import useGetAISearchResponse from '@/app/chats/useGetAISearchResponse'
import { Button } from '@nextui-org/button'
import MarkdownPreview from '@/components/shared/MarkdownPreview'
import { toast } from 'sonner'
import { Input } from '@/components/ui/input'
import { SendHorizonal } from 'lucide-react'

const AISearchResponse = ({ query }: { query: string }) => {
    const { mutate: searchQuery, data: response, isPending: gettingQuery } = useGetAISearchResponse()
    const [appendableQuery, setAppendableQuery] = useState('')

    function handleQuery() {
        searchQuery({
            query: appendableQuery ? appendableQuery : query
        }, {
            onSuccess: () => {
                toast.success("AI query is ready!")
                return
            },
            onError: ({message}) => {
                console.error(message)
                toast.error("Too bad! AI had a hard time resolving your query Why don't you give it yet another shot?!")
                return
            }
        })
    }
  return (
    <div className='flex flex-col py-4 p-2 border rounded-md w-full'>
        <div className="flex flex-row gap-2 max-sm:flex-col">
            <Input defaultValue={query} onChange={e => setAppendableQuery(e.target.value)} className='my-2 border-muted border-b max-w-[400px]'/>
            <Button isLoading={gettingQuery} className='w-fit my-2' variant='flat' color='success' onClick={handleQuery} endContent={<SendHorizonal size={15} />}>Ask AI</Button>
        </div>
        { response && (
            <MarkdownPreview content={response!} />
        )}
    </div>
  )
}

export default AISearchResponse