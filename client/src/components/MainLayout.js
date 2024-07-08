import { Outlet } from 'react-router-dom';
import Navbar from './common/Navbar';

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default MainLayout;
