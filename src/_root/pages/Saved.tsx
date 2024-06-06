import GridPostList from '@/components/shared/GridPostList';
import { useGetPosts } from '@/lib/react-query/queriesAndMutations';

const Saved = () => {
  const { data: posts } = useGetPosts();
  return (
    <div className='flex flex-1'>
      <div className='common-container'>
        <div className='max-w-5xl flex-col gap-3 justify-start w-full'>
          <h2 className='h3-bold md:h2-bold w-full flex items-center mb-5'>
            <img
              src='/assets/icons/bookmark.svg'
              alt='saved'
              className='invert-white mr-2 md:h-8 md:w-8 h-6 w-6'
            />
            Saved
          </h2>
          <div className='flex flex-wrap gap-9 w-full max-w-5xl'>
            {posts?.pages.map((item, index) => (
              <GridPostList key={`page-${index}`} posts={item?.documents} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Saved;
