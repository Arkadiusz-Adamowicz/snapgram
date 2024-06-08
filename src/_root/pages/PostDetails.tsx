import Loader from '@/components/shared/Loader';
import PostStats from '@/components/shared/PostStats';
import { Button } from '@/components/ui/button';
import { useUserContext } from '@/context/AuthContext';
import {
  useDeletePost,
  useDeleteSavedPost,
  useGetPostById,
} from '@/lib/react-query/queriesAndMutations';
import { formatDateString } from '@/lib/utils';
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const PostDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: post, isPending } = useGetPostById(id || '');
  const { user } = useUserContext();
  const { mutate: deletePost } = useDeletePost();
  const { mutate: deleteSavedPost } = useDeleteSavedPost();

  const handleDeletePost = () => {
    deletePost({ postId: id || '', imageId: post?.imageId });
    deleteSavedPost(id ?? '');
    navigate(-1);
  };

  return (
    <div className='post_details-container'>
      <div className='max-w-5xl flex-start gap-3 justify-start w-full'>
        <h2 className='h3-bold md:h2-bold w-full flex items-center'>
          <img
            src='/assets/icons/posts.svg'
            alt='post_detail'
            className='invert-white mr-2 md:h-8 md:w-8 h-6 w-6'
          />
          Post Details
        </h2>
      </div>
      {isPending ? (
        <Loader />
      ) : (
        <div className='post_details-card'>
          <img
            src={post?.imageUrl}
            alt='creator'
            className='post_details-img'
          />

          <div className='post_details-info'>
            <div className='flex-between w-full'>
              <Link
                to={`/profile/${post?.creator.$id}`}
                className='flex items-center gap-3'
              >
                <img
                  src={
                    post?.creator?.imageUrl ||
                    '/assets/icons/profile-placeholder.svg'
                  }
                  alt='creator'
                  className='rounded-full w-8 h-8 lg:w-11 lg:h-11'
                />

                <div className='flex flex-col '>
                  <p className='base-medium lg:body-bold text-light-1'>
                    {post?.creator.name}
                  </p>
                  <div className='flex-center gap-2 text-light-3'>
                    <p className='subtle-semibold lg:small-regular'>
                      {formatDateString(post?.$createdAt || '')}
                    </p>
                    <p className='subtle-semibold lg:small-regular'>
                      {post?.location}
                    </p>
                  </div>
                </div>
              </Link>
              <div className='flex-center'>
                <Link
                  to={`/update-post/${post?.$id}`}
                  className={`${user.id !== post?.creator.$id && 'hidden'}`}
                >
                  <img
                    src='/assets/icons/edit.svg'
                    alt='edit'
                    width={20}
                    height={20}
                  />
                </Link>
                <Button
                  onClick={handleDeletePost}
                  variant='ghost'
                  className={`ghost_details-delete_btn ${
                    user.id !== post?.creator.$id && 'hidden'
                  }`}
                >
                  <img
                    src='/assets/icons/delete.svg'
                    alt='delete'
                    width={22}
                    height={22}
                  />
                </Button>
              </div>
            </div>
            <hr className='border w-full border-dark-4/80' />

            <div className='flex flex-col flex-1 w-full small-medium lg:base-regular'>
              <p>{post?.caption}</p>
              <ul className='flex gap-1 mt-2'>
                {post?.tags.map((tag: string) => (
                  <li key={tag} className='text-light-3'>
                    #{tag}
                  </li>
                ))}
              </ul>
            </div>

            <div className='w-full'>
              <PostStats post={post} userId={user.id} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostDetails;
