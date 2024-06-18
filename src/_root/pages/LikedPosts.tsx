import GridPostList from '@/components/shared/GridPostList'
import Loader from '@/components/shared/Loader'
import { useGetCurrentUser } from '@/lib/react-query/queriesAndMutations'

const LikedPosts = () => {
  const { data: currentUser } = useGetCurrentUser()

  if (!currentUser)
    return (
      <div className='flex-center h-full w-full'>
        <Loader />
      </div>
    )

  return <GridPostList posts={currentUser.liked} showStats={false} />
}

export default LikedPosts
