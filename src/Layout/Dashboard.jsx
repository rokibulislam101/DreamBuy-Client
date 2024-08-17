import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import useAdmin from '../Hooks/useAdmin';
import 'react-toastify/dist/ReactToastify.css';
import LoadingSpinner from '../pages/Shared/LoadingSpinner/LoadingSpinner';
import Footer from '../pages/Shared/Footer/Footer';
import Navbar from '../pages/Shared/Header/Navbar';
import { AuthContext } from '../providers/AuthProvider';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [isAdmin] = useAdmin();

  // Simulate loading
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  const handleLogOut = async () => {
    try {
      await logout();
      toast.success('You have been logged out successfully.');
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
      toast.error('There was an error logging out. Please try again.');
    }
  };

  return (
    <div>
      <Navbar></Navbar>

      <div className="min-h-screen">
        <div className="m-5 mx-40">
          <ul className="flex justify-center gap-14 items-center text-zinc-500 active:text-orange-500 py-4 border-b border-gray-300 text-md font-md">
            {isAdmin ? (
              <>
                {/* Admin user */}
                <li>
                  <NavLink to="/dashboard/adminProfile">Profile</NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/">Orders</NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/">Products</NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/">Banners</NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/">Users</NavLink>
                </li>
                <li>
                  <NavLink to="/" onClick={handleLogOut}>
                    Logout
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                {/* Normal user */}
                <li>
                  <NavLink to="/dashboard/profile">Profile</NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/">Orders</NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/">Wishlist</NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/">Address</NavLink>
                </li>
                <li>
                  <NavLink to="/" onClick={handleLogOut}>
                    Logout
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>

        <div className="flex-1 mx-10">
          <Outlet />
        </div>
      </div>

      <Footer></Footer>
    </div>
  );
};

export default Dashboard;
