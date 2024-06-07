import Loader from '@/components/shared/Loader';
import UserCard from '@/components/shared/UserCard';
import { useToast } from '@/components/ui/use-toast';
import { useGetUsers } from '@/lib/react-query/queriesAndMutations';

const RightSidebar = () => {
  const { toast } = useToast();
  const { data: creators, isLoading, isError: isErrorCreators } = useGetUsers();

  if (isErrorCreators) {
    toast({ title: 'Something went wrong' });
  }
  return (
    <div className='leftsidebar none'>
      <div className='flex flex-col gap-11'>
        <h3 className='body-bold md:h3-bold flex items-center'>Top Creators</h3>
        {isLoading && !creators ? (
          <Loader />
        ) : (
          <ul className='flex flex-col gap-5'>
            {creators?.documents.map(creator => (
              <li key={creator?.$id} className='min-w-[180px] w-full'>
                <UserCard user={creator} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default RightSidebar;
