import PostForm from '@/components/PostForm'
import Loader from '@/components/shared/Loader'
import { useGetPostById } from '@/lib/react-query/queriesAndMutations'
import {  useParams } from 'react-router-dom'
import TopPostList from '@/components/shared/TopPostList'
import { useUserContext } from '@/context/AuthContext'
import { useGetUserById } from '@/lib/react-query/queriesAndMutations'

const EditPost = () => {
  const { user } = useUserContext()
  const { data: currentUser } = useGetUserById(user.id || '')
  const { id } = useParams()
  const { data: post, isPending } = useGetPostById(id || '')

  if (isPending) return <Loader />
  return (
    <div className='flex flex-1'>
      <div className='common-container'>
        <div className='flex-start w-full justify-start'>
          <img
            src='/assets/icons/edit.svg'
            alt='edit'
            className='invert-white mr-2 h-6 w-6 md:h-8 md:w-8'
          />
          <h2 className='h3-bold md:h2-bold w-full text-left'>Edit Post</h2>
        </div>
        <PostForm action='Update' post={post} />
      </div>
      <div className='rightsidebar'>
        <div className='flex flex-col gap-8'>
         
          <h3 className='h3-bold items-center text-xl'>Top Posts</h3>
        </div>
        <div className='mt-5 w-[300px]'>
          <TopPostList posts={currentUser?.posts} />
        </div>
      </div>
    </div>
  )
}

export default EditPost
