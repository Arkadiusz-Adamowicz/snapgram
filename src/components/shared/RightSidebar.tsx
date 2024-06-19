import Loader from '@/components/shared/Loader'
import UserCard from '@/components/shared/UserCard'
import { useToast } from '@/components/ui/use-toast'
import { useUserContext } from '@/context/AuthContext'
import {
  useGetUserById,
  useGetUsers
} from '@/lib/react-query/queriesAndMutations'
import TopPostList from './TopPostList'

const RightSidebar = () => {
  const { toast } = useToast()
  const { data: creators, isLoading, isError: isErrorCreators } = useGetUsers()
  const { user } = useUserContext()
  const { data: currentUser } = useGetUserById(user.id || '')

  if (isErrorCreators) {
    toast({ title: 'Something went wrong' })
  }
  return (
    <div className='rightsidebar'>
      <div className='flex flex-col gap-8'>
        <h3 className='body-bold md:h3-bold items-center'>Top Creators</h3>
        {isLoading && !creators ? (
          <Loader />
        ) : (
          <ul className='grid grid-cols-2 gap-5'>
            {creators?.documents.map(creator => (
              <li key={creator?.$id}>
                <UserCard user={creator} />
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className='flex flex-col'>
        <h3 className='h3-bold mb-8 mt-5 items-center text-xl'>Top Posts</h3>
        <div className=''>
          <div className='w-[400px]'>
            <TopPostList posts={currentUser?.posts} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default RightSidebar
