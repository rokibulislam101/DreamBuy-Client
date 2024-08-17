import { createBrowserRouter } from 'react-router-dom';
import Main from '../Layout/Main';
import Home from '../pages/Home/Home/Home';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import Secret from '../pages/Shared/Secret/Secret';
import PrivateRoutes from './PrivateRoutes';
import SingleProduct from '../pages/SingleProduct/SingleProduct/SingleProduct';
import Cart from '../pages/Order/Cart/Cart';
import Checkout from '../pages/Order/Checkout/Checkout';
import Ordered from '../pages/Order/Ordered/Ordered';
import Wishlist from '../pages/Order/Wishlist/Wishlist';
import AllProducts from '../pages/AllProducts/AllProducts/AllProducts';
import Dashboard from '../Layout/Dashboard';
import Profile from '../pages/Dashboard/UserHome/Profile';
import AdminProfile from '../pages/Dashboard/AdminHome/AdminProfile';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/AllProducts', element: <AllProducts /> },
      { path: '/Login', element: <Login /> },
      { path: '/Register', element: <Register /> },
      { path: '/Product/:id', element: <SingleProduct /> },
      { path: '/Cart', element: <Cart /> },
      { path: '/Checkout', element: <Checkout /> },
      { path: '/Ordered', element: <Ordered /> },
      { path: '/Wishlist', element: <Wishlist /> },
      {
        path: '/Secret',
        element: (
          <PrivateRoutes>
            <Secret />
          </PrivateRoutes>
        ),
      },
    ],
  },
  {
    path: '/Dashboard',
    element: (
      <PrivateRoutes>
        <Dashboard />
      </PrivateRoutes>
    ),
    children: [
      { path: 'Profile', element: <Profile /> },
      { path: 'AdminProfile', element: <AdminProfile /> },
    ],
  },
]);
