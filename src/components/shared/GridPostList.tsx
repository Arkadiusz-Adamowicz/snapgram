import { useUserContext } from '@/context/AuthContext';
import { Models } from 'appwrite';
import { Link } from 'react-router-dom';
import PostStats from './PostStats';

type GridPostListProps = {
  posts?: Models.Document[];
  showUser?: boolean;
  showStats?: boolean;
};

const GridPostList = ({
  posts,
  showUser = true,
  showStats = true,
}: GridPostListProps) => {
  const { user } = useUserContext();

  return (
    <ul className='grid xl:grid-cols-3 lg:grid-cols-2  grid-cols gap-6'>
      {posts?.map(post => (
        <li key={post.$id} className='relative min-w-50 h-50'>
          <Link to={`/posts/${post.$id}`} className='grid-post_link'>
            <img
              src={post.imageUrl}
              alt='post'
              className='h-full w-full object-cover '
            />
          </Link>
          <div className='grid-post_user'>
            {showUser && (
              <div className='flex items-center justify-start gap-2 flex-1'>
                <img
                  src={post?.creator.imageUrl}
                  alt='creator'
                  className='w-8 h-8 rounded-full'
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
  );
};

export default GridPostList;
