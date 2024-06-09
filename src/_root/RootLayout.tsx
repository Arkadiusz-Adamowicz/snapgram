import Bottombar from '@/components/shared/Bottombar';
import LeftSidebar from '@/components/shared/LeftSidebar';
import RightSidebar from '@/components/shared/RightSidebar';
import Topbar from '@/components/shared/Topbar';
import { Outlet } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const RootLayout = () => {
  const location = useLocation();

  return (
    <div className='w-full md:flex'>
      <Topbar />
      <LeftSidebar />
      <section className='flex flex-1 h-full'>
        <Outlet />
      </section>
      {location.pathname === '/' && (
        <section className='hidden lg:block'>
          <RightSidebar />
        </section>
      )}
      <Bottombar />
    </div>
  );
};

export default RootLayout;
