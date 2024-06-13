import GridPostList from '@/components/shared/GridPostList';
import Loader from '@/components/shared/Loader';
import { useGetCurrentUser } from '@/lib/react-query/queriesAndMutations';
import { Models } from 'appwrite';

const Saved = () => {
  const { data: currentUser } = useGetCurrentUser();
  console.log(currentUser);

  const savePosts = currentUser?.save
    .map((savePost: Models.Document) => ({
      ...savePost.post,
      creator: {
        imageUrl: currentUser.imageUrl,
      },
    }))
    .reverse();

  return (
    <div className='flex flex-1'>
      <div className='common-container'>
        <div className='flex-col gap-3 justify-start w-full'>
          <h2 className='h3-bold md:h2-bold w-full flex items-center mb-5'>
            <img
              src='/assets/icons/bookmark.svg'
              alt='saved'
              className='invert-white mr-2 md:h-8 md:w-8 h-6 w-6'
            />
            Saved Posts
          </h2>
          <div className='flex flex-wrap gap-9 w-full'>
            {!currentUser ? (
              <Loader />
            ) : (
              <ul className='w-full flex justify-centergap-9'>
                <GridPostList posts={savePosts} showStats={false} />
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Saved;
