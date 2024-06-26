import { Link } from 'react-router-dom'
import { Models } from 'appwrite'

type GridPostListProps = {
  posts: Models.Document[]
}
const TopPostList = ({ posts }: GridPostListProps) => {
  return (
    <ul className='flex flex-wrap gap-6'>
      {posts?.slice(0, 3).map(post => (
        <li key={post.$id} className='min-w-50 h-50 relative'>
          <Link to={`/posts/${post.$id}`} className='grid-post_link'>
            <img
              src={post.imageUrl}
              alt='post'
              className='h-full w-full object-cover'
            />
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default TopPostList
