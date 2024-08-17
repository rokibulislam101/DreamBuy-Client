import React, { useContext } from 'react';
import { CartContext } from '../../../Features/ContextProvider';
import CartCard from '../../Shared/CartCard/CartCard';
import { totalItem, totalPrice } from '../../../Features/CartReducer';
import emptyCart from '../../../assets/Icons/shopping_cart_warning.svg';
import { Link } from 'react-router-dom';
import CartBanner from './CartBanner';
import { Helmet } from 'react-helmet-async';
import './Cart.css';

const Cart = () => {
  const { cart } = useContext(CartContext);

  const hasProducts = cart.length > 0;

  return (
    <div>
      <Helmet>
        <title>Dream Buy | Cart</title>
      </Helmet>
      <CartBanner></CartBanner>
      <div className="m-10">
        {!hasProducts && (
          <div className="flex flex-col justify-center items-center">
            <img src={emptyCart} className="w-40" alt="" />
            <h2 className="text-3xl font-semibold my-4">
              Your Cart is <span className="text-[#ff6221]">Empty!</span>
            </h2>
            <p className="text-center font-semibold mb-3">
              Must add items to the cart before you proceed to checkout.
            </p>
            <Link to="/AllProducts">
              <button className="w-fit text-white font-semibold px-8 py-1 bg-[#ff6221] rounded-full">
                Return To Shop
              </button>
            </Link>
          </div>
        )}
        {hasProducts && (
          <div className="xl:mx-40 md:flex gap-4">
            <div className="w-full md:w-2/3">
              <h2 className="text-2xl mb-4 text-[#ff6221] font-serif font-semibold">
                Your Cart
              </h2>
              <table className="w-full flex flex-col justify-center">
                <thead className="w-full flex ">
                  <tr className="w-full flex justify-between">
                    <div className="ml-5">
                      <th className="py-3 px-6 text-left"></th>
                      <th className="py-3 px-6 text-left">Product</th>
                    </div>
                    <div className="flex md:gap-7 md:mr-10">
                      <th className="py-3 px-2 md:px-6 text-left">Price</th>
                      <th className="py-3 px-2 md:px-6 text-left">Quantity</th>
                      <th className="py-3 px-2 md:px-6 text-left">Subtotal</th>
                    </div>
                  </tr>
                </thead>
                <hr className="mb-3" />
                <tbody>
                  {cart.map(product => (
                    <CartCard key={product.id} product={product} />
                  ))}
                </tbody>
              </table>
            </div>
            <div className="w-full md:w-1/3 h-fit mt-10 border p-5 rounded-lg border-[#ff6221]">
              <h2 className="text-xl font-semibold font-serif">Cart totals</h2>
              <hr className="my-3" />
              <div className="flex justify-between">
                <p className="font-semibold">Total Items</p>
                <p className="text-lg font-bold">{totalItem(cart)}</p>
              </div>
              <hr className="my-3" />
              <div className="flex justify-between">
                <p className="font-semibold">Grand Total</p>
                <p className="text-lg font-bold">
                  <span className="text-xl font-extrabold">৳ </span>
                  {totalPrice(cart)}
                </p>
              </div>
              <hr className="my-3" />
              <Link to="/Checkout">
                <button className="text-center w-full h-11 rounded bg-[#fc6221] hover:bg-[#333] text-white font-semibold mt-2 transition-all">
                  Proceed to Checkout
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
