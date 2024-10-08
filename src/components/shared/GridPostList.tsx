import { useUserContext } from '@/context/AuthContext'
import { Link } from 'react-router-dom'
import PostStats from './PostStats'
import { Models } from 'appwrite'

type GridPostListProps = {
  posts?: Models.Document[]
  showUser?: boolean
  showStats?: boolean
}

const GridPostList = ({
  posts,
  showUser = true,
  showStats = true
}: GridPostListProps) => {
  const { user } = useUserContext()

  return (
    <ul className='grid-cols grid gap-6 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
      {posts?.map(post => (
        <li key={post.$id} className='min-w-50 h-50 relative'>
          <Link to={`/posts/${post.$id}`} className='grid-post_link'>
            <img
              src={post.imageUrl}
              alt='post'
              className='h-full w-full object-cover'
            />
          </Link>
          <div className='grid-post_user'>
            {showUser && (
              <div className='flex flex-1 items-center justify-start gap-2'>
                <img
                  src={post?.creator.imageUrl}
                  alt='creator'
                  className='h-8 w-8 rounded-full'
                />
                <p className='line-clamp-1'>{post.creator.name}</p>
              </div>
            )}
            <div className='flex items-center justify-between'>
              {showStats && <PostStats post={post} userId={user.id} />}
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default GridPostList
