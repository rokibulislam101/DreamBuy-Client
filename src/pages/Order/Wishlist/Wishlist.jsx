import React, { useContext } from 'react';
import { WishlistContext } from '../../../Features/ContextProvider';
import { Helmet } from 'react-helmet-async';
import WishlistBanner from './WishlistBanner';
import WishlistCard from '../../Shared/WishlistCard/WishlistCard';
import emptyWishlist from '../../../assets/Icons/wishList.jpg';
import { Link } from 'react-router-dom';

const Wishlist= () => {
  const { wishlist } = useContext(WishlistContext);

  const hasProducts = wishlist.length > 0;

  return (
    <div>
      <Helmet>
        <title>Dream Buy | WishList</title>
      </Helmet>
      <WishlistBanner></WishlistBanner>
      <div className="m-10">
        {!hasProducts && (
          <div className="flex flex-col justify-center items-center my-10">
            <img src={emptyWishlist} className="w-52" alt="" />
            <h2 className="text-3xl font-semibold my-4">
              Your Wishlist is <span className="text-[#ff6221]">Empty!</span>
            </h2>
            <p className="text-center font-semibold mb-3">
              Create your first wishlist request.
            </p>
            <Link to="/AllProducts">
              <button className="w-fit text-white font-semibold px-8 py-1 bg-[#ff6221] rounded-full">
                Make New Wish
              </button>
            </Link>
          </div>
        )}
        {hasProducts && (
          <div className="xl:mx-40">
            <h2 className="text-2xl mb-4 text-[#ff6221] font-serif font-semibold">
              Your Wishlist
            </h2>
            <div className="">
              {wishlist.map(product => (
                <WishlistCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
        ;
      </div>
    </div>
  );
};

export default Wishlist;

