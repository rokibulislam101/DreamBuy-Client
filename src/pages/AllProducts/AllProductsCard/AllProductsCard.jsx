import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineHeart, AiOutlineShoppingCart } from 'react-icons/ai';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import {
  CartContext,
  WishlistContext,
} from '../../../Features/ContextProvider';

const AllProductsCard = () => {
  const [allProducts, setAllProducts] = useState([]);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 12;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = allProducts.slice(firstIndex, lastIndex);
  const nPage = Math.ceil(allProducts.length / recordsPerPage);
  const numbers = [...Array(nPage + 1).keys()].slice(1);

  const { cartDispatch } = useContext(CartContext);
  const { wishlistDispatch } = useContext(WishlistContext);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await axiosSecure.get('/product');
        setAllProducts(response.data);
      } catch (error) {
        console.error('Error fetching AllProducts:', error);
      }
    };

    fetchAllProducts();
  }, [axiosSecure]);

  const handleBuyNow = productId => {
    navigate(`/Product/${productId}`);
  };

  const handleAddToWishlist = product => {
    wishlistDispatch({
      type: 'ADD_TO_WISHLIST',
      product: { ...product, id: product._id },
    });
  };

  function prePage() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function changePage(_id) {
    setCurrentPage(_id);
  }

  function nextPage() {
    if (currentPage !== nPage) {
      setCurrentPage(currentPage + 1);
    }
  }

  return (
    <div className="p-10">
      <h2 className="text-2xl mb-4 font-serif font-semibold">
        Necessary {allProducts.length} Items
      </h2>
      <hr />
      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-4 mt-4">
        {records.map(product => {
          const discountPercentage = (
            ((product.price - product.discountPrice) / product.price) *
            100
          ).toFixed(0);

          return (
            <div
              key={product._id}
              className="h-full shadow hover:shadow-lg hover:border p-4 transition-all group"
            >
              <div className="relative">
                <div className="absolute flex justify-between items-center w-full px-2">
                  <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div
                      className="flex items-center justify-center"
                      onClick={() => handleAddToWishlist(product)}
                    >
                      <AiOutlineHeart className="wishlist text-3xl text-[#fc6221] hover:text-white rounded-full hover:bg-[#fc6221] hover:p-1 transition-all" />
                    </div>
                    <div
                      className="flex items-center justify-center"
                      onClick={() =>
                        cartDispatch({
                          type: 'Add',
                          product: { ...product, id: product._id },
                        })
                      }
                    >
                      <AiOutlineShoppingCart className="text-3xl text-[#fc6221] hover:text-white rounded-full hover:bg-[#fc6221] hover:p-1 transition-all" />
                    </div>
                  </div>
                  <p className="bg-[#fc6221] text-white font-semibold rounded-sm p-1 px-2">
                    -{discountPercentage}%
                  </p>
                </div>
                <div className="flex justify-center items-center h-48 lg:h-60">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-all hover:w-[95%] hover:h-[95%]"
                  />
                </div>
              </div>
              <p className="font-medium hover:text-[#fc6221]">{product.name}</p>
              <div className="flex gap-3 font-semibold my-1">
                <p className="text-[#fc6221] text-lg font-bold">
                  <span className="font-extrabold">৳</span>
                  {product.discountPrice}
                </p>
                <p className="text-[#848484] font-bold">
                  <s>
                    <span className="font-extrabold">৳</span> {product.price}
                  </s>
                </p>
              </div>
              <button
                onClick={() => handleBuyNow(product._id)}
                className="text-center w-full h-10 rounded bg-[#fc6221] text-white font-semibold mt-2"
              >
                Buy Now
              </button>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center items-center my-10">
        <button
          className="bg-[#ff6221] text-white px-4 py-2 rounded-l-lg hover:bg-orange-700"
          onClick={prePage}
        >
          &lt; Previous
        </button>
        <ul className="flex">
          {numbers.map((n, product) => (
            <li
              key={product}
              className={`mx-1 ${
                currentPage === n
                  ? 'bg-[#ff6221] text-white'
                  : 'bg-[#ffb08f] text-white hover:bg-[#ff6221]'
              }`}
            >
              <button
                className="px-4 py-2 rounded-none"
                onClick={() => changePage(n)}
              >
                {n}
              </button>
            </li>
          ))}
        </ul>
        <button
          className="bg-[#ff6221] text-white px-4 py-2 rounded-r-lg hover:bg-orange-700"
          onClick={nextPage}
        >
          Next &gt;
        </button>
      </div>
    </div>
  );
};

export default AllProductsCard;
