import PostForm from '@/components/PostForm';
import TopPostList from '@/components/shared/TopPostList';
import { useUserContext } from '@/context/AuthContext';
import { useGetUserById } from '@/lib/react-query/queriesAndMutations';
import { Link, useParams } from 'react-router-dom';

const CreatePost = () => {
  const { id } = useParams();
  const { user } = useUserContext();
  const { data: currentUser } = useGetUserById(id || '');
  console.log(currentUser);
  return (
    <div className='flex flex-1'>
      <div className='common-container'>
        <div className='flex-start gap-3 justify-start w-full'>
          <h2 className='h3-bold md:h2-bold w-full flex items-center'>
            <img
              src='/assets/icons/gallery-add.svg'
              alt='create'
              className='invert-white mr-2 md:h-8 md:w-8 h-6 w-6'
            />
            Create Post
          </h2>
        </div>
        <PostForm action='Create' />
      </div>
      <div>
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
            <h3 className='text-xl font-semibold items-center'>
              Top posts by you
            </h3>
          </div>
          <div className='mt-5 w-[400px] h-screen'>
            {currentUser?.posts ? (
              <TopPostList posts={currentUser.posts} />
            ) : (
              <p>No posts available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
