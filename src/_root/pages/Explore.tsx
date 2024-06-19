/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { Input } from '@/components/ui/input'
import useDebounce from '@/hooks/useDebounce'
import {
  useGetPosts,
  useSearchPosts
} from '@/lib/react-query/queriesAndMutations'
import GridPostList from '@/components/shared/GridPostList'
import Loader from '@/components/shared/Loader'

export type SearchResultProps = {
  isSearchFetching?: boolean
  searchedPosts?: any
}

const SearchResults = ({
  isSearchFetching,
  searchedPosts
}: SearchResultProps) => {
  if (isSearchFetching) {
    return <Loader />
  } else if (searchedPosts && searchedPosts.documents.length > 0) {
    return <GridPostList posts={searchedPosts.documents} />
  } else {
    return (
      <p className='mt-10 w-full text-center text-light-4'>No results found</p>
    )
  }
}

const Explore = () => {
  const { ref, inView } = useInView()
  const { data: posts, fetchNextPage, hasNextPage } = useGetPosts()
  console.log(posts)

  const [searchValue, setSearchValue] = useState('')
  const debouncedSearch = useDebounce(searchValue, 500)
  const { data: searchedPosts, isFetching: isSearchFetching } =
    useSearchPosts(debouncedSearch)

  useEffect(() => {
    if (inView && !searchValue) {
      fetchNextPage()
    }
  }, [inView, searchValue, fetchNextPage])

  if (!posts)
    return (
      <div className='flex-center h-full w-full'>
        <Loader />
      </div>
    )

  const shouldShowSearchResults = searchValue !== ''
  const shouldShowPosts = posts.pages.some(item => item?.documents.length === 0)

  return (
    <div className='explore-container'>
      <div className='explore-inner_container'>
        <h2 className='h3-bold md:h2-bold flex w-full items-center'>
          <img
            src='/assets/icons/wallpaper.svg'
            alt='explore'
            className='invert-white mr-2 h-6 w-6 md:h-8 md:w-8'
          />
          Search Posts
        </h2>
        <div className='flex w-full gap-1 rounded-lg bg-dark-4 px-4'>
          <img
            src='/assets/icons/search.svg'
            width={24}
            height={24}
            alt='search'
          />
          <Input
            type='text'
            placeholder='Search'
            className='explore-search'
            value={searchValue}
            onChange={e => {
              const { value } = e.target
              setSearchValue(value)
            }}
          />
        </div>
      </div>

      <div className='flex-between my-5 w-full'>
        <h3 className='body-bold md:h3-bold'>Popular Today</h3>
        <div className='flex-center cursor-pointer gap-3 rounded-xl bg-dark-3 px-4 py-2'>
          <p className='small-medium md:base-medium text-light-2'>All</p>
          <img
            src='/assets/icons/filter.svg'
            width={20}
            height={20}
            alt='filter'
          />
        </div>
      </div>

      <div className='flex w-full flex-wrap gap-9'>
        {shouldShowSearchResults && shouldShowPosts ? (
          <SearchResults
            isSearchFetching={isSearchFetching}
            searchedPosts={searchedPosts}
          />
        ) : (
          posts.pages.map((item, index) => (
            <GridPostList key={`page-${index}`} posts={item?.documents} />
          ))
        )}
      </div>

      {hasNextPage && !searchValue && (
        <div ref={ref} className='mt-10'>
          <Loader />
        </div>
      )}
    </div>
  )
}

export default Explore
