import PostForm from '@/components/PostForm';

const CreatePost = () => {
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
    </div>
  );
};

export default CreatePost;
