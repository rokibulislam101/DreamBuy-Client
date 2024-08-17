import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../providers/AuthProvider';
import './Navbar.css';
import wishList from '../../../assets/Icons/wishlist.png';
import addToCart from '../../../assets/Icons/cart.png';
import shoppingBag from '../../../assets/Icons/shopping-bag.png';
import { CartContext, WishlistContext } from '../../../Features/ContextProvider';
import { totalItem, totalPrice } from '../../../Features/CartReducer';
import CartModal from '../CartModal/CartModal';

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const [isModalOpen, setModalOpen] = useState(false);
  const { cart } = useContext(CartContext);
  const { wishlist } = useContext(WishlistContext);

  const navOptions = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/AllProducts">All Products</Link>
      </li>
      <li>
        <Link to="/">About Us</Link>
      </li>
      <li>
        <Link to="/">Blogs</Link>
      </li>
    </>
  );

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <div className="sm:flex justify-between px-10 p-3 shadow mb-1">
        <p className="text-[#fc6221] text-[15px] font-semibold">
          Welcome Dream Buy
        </p>
        <p className="text-[15px]">
          Need Help? Call{' '}
          <span className="font-semibold text-[#fc6221]">
            Dream Buy Helpline: 09600000000
          </span>
        </p>
      </div>
      <div className="navbar shadow">
        <div className="navbar-start ps-5">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 text-md font-bold"
            >
              {navOptions}
            </ul>
          </div>
          <a className="btn btn-ghost text-2xl" href="/">Dream Buy</a>
        </div>
        <div className="gap-8">
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 gap-3 text-md font-bold items-center">
              {navOptions}

              {user ? (
                <>
                  <Link to="/Dashboard">My Account</Link>
                </>
              ) : (
                <li>
                  <Link to="/Login">Login</Link>
                </li>
              )}
            </ul>
          </div>
          <div className="flex gap-3 w-20">
            <Link to="/Wishlist">
              <div className="relative" style={{ width: '2rem' }}>
                <img
                  src={wishList}
                  alt="Wishlist"
                  className="cursor-pointer"
                  style={{ width: '100%' }}
                />
                <span className="badge-count font-semibold">
                  {wishlist.length}
                </span>
              </div>
            </Link>
            <div
              className="relative"
              style={{ width: '2rem' }}
              onClick={handleOpenModal}
            >
              <img
                src={addToCart}
                alt="Add to Cart"
                className="cursor-pointer"
                style={{ width: '100%' }}
              />
              <span className="badge-count  font-semibold">
                {totalItem(cart)}
              </span>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex justify-end z-50">
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={handleCloseModal}
          ></div>
          <div className="w-2/3 sm:w-1/2 lg:w-1/4 h-full bg-white shadow-lg p-4 overflow-y-auto transform transition-transform duration-300 slide-in-from-right">
            <button
              type="button"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={handleCloseModal}
            >
              ✕
            </button>
            <h3 className="font-semibold text-xl">Shopping Cart</h3>
            <hr style={{ marginTop: '2px' }} />
            <div>
              {cart.length === 0 ? (
                <div className="noProduct flex flex-col items-center justify-center mt-10">
                  <div className="bg-slate-200 p-2 rounded-full overflow-hidden">
                    <img
                      className="w-12 translate-y-3"
                      src={shoppingBag}
                      alt=""
                    />
                  </div>
                  <p className="py-4 text-sm font-semibold text-center">
                    No products in the Cart
                  </p>
                </div>
              ) : (
                <div className="yesProduct mt-4">
                  {cart.map(product => (
                    <CartModal key={product.id} product={product} />
                  ))}
                  <div className="flex justify-between">
                    <p className="font-semibold">Subtotal</p>
                    <p className="text-md font-bold">
                      <span className="font-extrabold">৳ </span>
                      {totalPrice(cart)}
                    </p>
                  </div>
                  <div>
                    <Link to="/Cart">
                      <button
                        className="text-center w-full h-11 rounded border border-[#fc6221] text-[#fc6221] hover:text-white hover:border-none hover:bg-[#333] transition-all font-semibold mt-2"
                        onClick={handleCloseModal}
                      >
                        View Cart
                      </button>
                    </Link>
                    <Link to="/Checkout">
                      <button
                        className="text-center w-full h-11 rounded bg-[#fc6221] text-white font-semibold mt-2"
                        onClick={handleCloseModal}
                      >
                        Checkout
                      </button>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
