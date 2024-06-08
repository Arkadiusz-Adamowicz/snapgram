import Loader from '@/components/shared/Loader';
import UserCard from '@/components/shared/UserCard';
import { useToast } from '@/components/ui/use-toast';
import { useGetUsers } from '@/lib/react-query/queriesAndMutations';

const AllUsers = () => {
  const { toast } = useToast();
  const { data: creators, isLoading, isError: isErrorCreators } = useGetUsers();

  if (isErrorCreators) {
    toast({ title: 'Something went wrong' });
  }
  return (
    <div className='common-container'>
      <div className='user-container'>
        <h2 className='h3-bold md:h2-bold w-full flex items-center'>
          <img
            src='/assets/icons/people.svg'
            alt='people'
            className='invert-white mr-2 md:h-8 md:w-8 h-6 w-6'
          />
          All Users
        </h2>
        {isLoading && !creators ? (
          <Loader />
        ) : (
          <ul className='flex flex-wrap gap-5'>
            {creators?.documents.map(creator => (
              <li key={creator?.$id} className='flex-1 min-w-[200px] w-full '>
                <UserCard user={creator} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AllUsers;
