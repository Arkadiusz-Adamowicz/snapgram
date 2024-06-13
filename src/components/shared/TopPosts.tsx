import { useUserContext } from '@/context/AuthContext';
import { Link, useParams } from 'react-router-dom';
import { useGetUserById } from '@/lib/react-query/queriesAndMutations';
import Loader from './Loader';
import TopPostList from './TopPostList';

const TopPosts = () => {
  const { id } = useParams();
  const { user } = useUserContext();
  const { data: currentUser } = useGetUserById(id || '');

  if (!currentUser)
    return (
      <div className='flex-center w-full h-full'>
        <Loader />
      </div>
    );

  return (
    <div className='rightsidebar'>
      <div className='flex flex-col gap-8 '>
        <Link
          to={`/profile/${user.id}`}
          className='flex flex-col gap-3 items-center'
        >
          <img
            src={user.imageUrl || '/assets/icons/profile-placeholder.svg'}
            alt='profile'
            className='h-[130px] w-[130px] rounded-full'
          />
          <div className='flex flex-col gap-1'>
            <p className='text-[27px] font-black'>{user.name}</p>
            <p className='text-[18px] text-light-3'>@{user.username}</p>
          </div>
        </Link>
        <h3 className='text-xl font-semibold items-center'>Top posts by you</h3>
      </div>
      <div className='mt-5 w-[400px] h-screen'>
        <TopPostList posts={currentUser.posts} />
      </div>
    </div>
  );
};

export default TopPosts;
