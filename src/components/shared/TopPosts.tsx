import { useParams } from 'react-router-dom'
import { useGetUserById } from '@/lib/react-query/queriesAndMutations'
import Loader from './Loader'
import TopPostList from './TopPostList'

const TopPosts = () => {
  const { id } = useParams()
  const { data: currentUser } = useGetUserById(id || '')

  if (!currentUser)
    return (
      <div className='flex-center h-full w-full'>
        <Loader />
      </div>
    )

  return (
    <div className='rightsidebar'>
      <div className='flex flex-col gap-8'>
        <h3 className='h3-bold items-center text-xl'>Top Posts</h3>
      </div>
      <div className='mt-5 w-[300px] 2xl:w-[400px]'>
        <TopPostList posts={currentUser.posts} />
      </div>
    </div>
  )
}

export default TopPosts
