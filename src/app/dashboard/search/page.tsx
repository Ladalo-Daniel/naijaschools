import MaxWrapper from '@/components/MaxWrapper'
import { Search } from 'lucide-react'
import React from 'react'
import SearchComponent from './SearchComponent'
import BackButton from '@/components/shared/BackButton'

const SearchPage = async () => {
  return (
    <MaxWrapper className='bg-background light:from-zinc-100 light:to-zinc-50 bg-gradient-to-b p-4'>
        <BackButton />
        {/* <h2 className="text-2xl py-2 px-2 text-primary flex flex-row gap-2 items-center border border-muted rounded-md"><Search className='text-muted-foreground' /> Search for anything</h2> */}

        <section className="flex flex-col gap-3 py-2">
            <SearchComponent />
        </section>
    </MaxWrapper>
  )
}

export default SearchPage