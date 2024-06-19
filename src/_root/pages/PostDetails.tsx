import Loader from '@/components/shared/Loader'
import PostStats from '@/components/shared/PostStats'
import { Button } from '@/components/ui/button'
import { useUserContext } from '@/context/AuthContext'
import {
  useDeletePost,
  useDeleteSavedPost,
  useGetCurrentUser,
  useGetPostById
} from '@/lib/react-query/queriesAndMutations'
import { formatDateString } from '@/lib/utils'
import { Link, useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import GridPostList from '@/components/shared/GridPostList'
import { Models } from 'appwrite'
import TopPostList from '@/components/shared/TopPostList'

const PostDetails = () => {
  const { data: currentUser } = useGetCurrentUser()

  const savePosts = currentUser?.save
    .map((savePost: Models.Document) => ({
      ...savePost.post,
      creator: {
        imageUrl: currentUser.imageUrl
      }
    }))
    .reverse()

  const { id } = useParams()
  const navigate = useNavigate()
  const { data: post, isPending } = useGetPostById(id || '')
  const { user } = useUserContext()
  const { mutate: deletePost } = useDeletePost()
  const { mutate: deleteSavedPost } = useDeleteSavedPost()

  const handleDeletePost = () => {
    deletePost({ postId: id || '', imageId: post?.imageId })
    deleteSavedPost(id ?? '')
    navigate(-1)
  }

  return (
    <>
      <div className='flex flex-1 flex-col'>
        <div className='common-container'>
          <div className='w-full flex-col justify-start gap-3'>
            <h2 className='h3-bold md:h2-bold flex w-full items-center'>
              <img
                src='/assets/icons/posts.svg'
                alt='post_detail'
                className='invert-white mr-2 h-6 w-6 md:h-8 md:w-8'
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
                      className='h-8 w-8 rounded-full lg:h-11 lg:w-11'
                    />

                    <div className='flex flex-col'>
                      <p className='base-medium lg:body-bold text-light-1'>
                        {post?.creator.name}
                      </p>
                      <div className='flex-left self-left flex flex-col pr-2 text-light-3 sm:flex-row'>
                        <p className='subtle-semibold lg:small-regular'>
                          {formatDateString(post?.$createdAt || '')},
                        </p>
                        <p className='subtle-semibold lg:small-regular sm:ml-1'>
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
                <hr className='w-full border border-dark-4/80' />

                <div className='small-medium lg:base-regular flex w-full flex-1 flex-col'>
                  <p>{post?.caption}</p>
                  <ul className='mt-2 flex gap-1'>
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
          <div className='flex-between my-5 w-full'>
            <h3 className='body-bold md:h3-bold'>More Related Posts</h3>
          </div>
          <div className='flex w-full flex-wrap gap-9'>
            {!currentUser ? (
              <Loader />
            ) : (
              <ul className='justify-centergap-9 flex w-full'>
                <GridPostList posts={savePosts} showStats={false} />
              </ul>
            )}
          </div>
        </div>
      </div>
      <div className='rightsidebar'>
        <div className='flex flex-col gap-8'>
          <Link
            to={`/profile/${user.id}`}
            className='flex flex-col items-center gap-3'
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
          <h3 className='h3-bold items-center text-xl'>Top Posts</h3>
        </div>
        <div className='mt-5 w-[400px]'>
          <TopPostList posts={currentUser?.posts} />
        </div>
      </div>
    </>
  )
}

export default PostDetails
