import PostForm from '@/components/PostForm'
import TopPostList from '@/components/shared/TopPostList'
import { useUserContext } from '@/context/AuthContext'
import { useGetUserById } from '@/lib/react-query/queriesAndMutations'

const CreatePost = () => {
  const { user } = useUserContext()
  const { data: currentUser } = useGetUserById(user.id || '')

  return (
    <div className='flex flex-1'>
      <div className='common-container'>
        <div className='flex-start w-full justify-start gap-3'>
          <h2 className='h3-bold md:h2-bold flex w-full items-center'>
            <img
              src='/assets/icons/gallery-add.svg'
              alt='create'
              className='invert-white mr-2 h-6 w-6 md:h-8 md:w-8'
            />
            Create Post
          </h2>
        </div>
        <PostForm action='Create' />
      </div>
      <div className='rightsidebar'>
        <div className='flex flex-col gap-8'>
          <h3 className='h3-bold items-center text-xl'>Top Posts</h3>
        </div>
        <div className='mt-5 w-[300px] 2xl:w-[400px]'>
          <TopPostList posts={currentUser?.posts} />
        </div>
      </div>
    </div>
  )
}

export default CreatePost
