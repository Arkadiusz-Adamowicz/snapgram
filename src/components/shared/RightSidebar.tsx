import Loader from '@/components/shared/Loader'
import UserCard from '@/components/shared/UserCard'
import { useToast } from '@/components/ui/use-toast'
import { useGetUsers } from '@/lib/react-query/queriesAndMutations'

const RightSidebar = () => {
  const { toast } = useToast()
  const { data: creators, isLoading, isError: isErrorCreators } = useGetUsers()

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
          <ul className='grid grid-cols 2xl:grid-cols-2 gap-5'>
            {creators?.documents.sort((a, b) => {
      return a.username < b.username ? -1 : 1
    }).map(creator => (
              <li key={creator?.$id}>
                <UserCard user={creator}/>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default RightSidebar
