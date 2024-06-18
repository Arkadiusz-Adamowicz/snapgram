import { Loader } from '@/components/shared/Loader'
import PostCard from '@/components/shared/PostCard'
import { useGetRecentPosts } from '@/lib/react-query/queriesAndMutations'
import { Models } from 'appwrite'

const Home = () => {
  const { data: posts, isPending: isPostLoading } = useGetRecentPosts()

  return (
    <div className='flex flex-1'>
      <div className='common-container'>
        <div className='home-posts'>
          <h2 className='h3-bold md:h2-bold flex w-full items-center'>
            <img
              src='/assets/icons/home.svg'
              alt='home'
              className='invert-white mr-2 h-6 w-6 md:h-8 md:w-8'
            />
            Home Feeds
          </h2>
          {isPostLoading && !posts ? (
            <Loader />
          ) : (
            <ul className='flex w-full flex-1 flex-col gap-9'>
              {posts?.documents.map((post: Models.Document) => (
                <PostCard post={post} key={post.caption} />
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

export default Home
