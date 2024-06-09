const Profile = () => {
  return (
    <div className='flex flex-1'>
      <div className='common-container'>
        <div className='flex-start gap-3 justify-start w-full'>
          <h2 className='h3-bold md:h2-bold w-full flex items-center mb-5'>
            <img
              src='/assets/icons/follow.svg'
              alt='saved'
              className='invert-white mr-2 md:h-8 md:w-8 h-6 w-6'
            />
            Profile
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Profile;
