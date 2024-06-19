import GridPostList from '@/components/shared/GridPostList'
import Loader from '@/components/shared/Loader'
import { useGetCurrentUser } from '@/lib/react-query/queriesAndMutations'
import { Models } from 'appwrite'

const Saved = () => {
  const { data: currentUser } = useGetCurrentUser()

  const savePosts = currentUser?.save
    .map((savePost: Models.Document) => ({
      ...savePost.post,
      creator: {
        imageUrl: currentUser.imageUrl
      }
    }))
    .reverse()

  return (
    <div className='flex flex-1'>
      <div className='common-container'>
        <div className='w-full flex-col justify-start gap-3'>
          <h2 className='h3-bold md:h2-bold mb-5 flex w-full items-center'>
            <img
              src='/assets/icons/bookmark.svg'
              alt='saved'
              className='invert-white mr-2 h-6 w-6 md:h-8 md:w-8'
            />
            Saved Posts
          </h2>
          <div className='flex w-full flex-wrap gap-9'>
            {!currentUser ? (
              <Loader />
            ) : (
              <ul className='justify-centergap-9 flex w-full'>
                <GridPostList posts={savePosts} showStats={false} />
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Saved
