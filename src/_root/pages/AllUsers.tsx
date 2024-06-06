const AllUsers = () => {
  return (
    <div className='flex flex-1'>
      <div className='common-container'>
        <div className='max-w-5xl flex-start gap-3 justify-start w-full'>
          <h2 className='h3-bold md:h2-bold w-full flex items-center'>
            <img
              src='/assets/icons/people.svg'
              alt='people'
              className='invert-white mr-2 md:h-8 md:w-8 h-6 w-6'
            />
            People
          </h2>
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
