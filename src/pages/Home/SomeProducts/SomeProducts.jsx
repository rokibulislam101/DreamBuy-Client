import React, { useContext, useEffect, useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { Link } from 'react-router-dom';
import './SomeProducts.css';
import { CartContext } from '../../../Features/ContextProvider';

const SomeProducts = () => {
  const [products, setProducts] = useState([]);
  const axiosSecure = useAxiosSecure();
  const { cart, cartDispatch } = useContext(CartContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosSecure.get('/product');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching Products:', error);
      }
    };

    fetchProducts();
  }, [axiosSecure]);

  const addToCart = product => {
    cartDispatch({
      type: 'Add',
      product: { ...product, id: product._id },
    });
  };

  const removeFromCart = id => {
    cartDispatch({ type: 'Remove', id });
  };

  return (
    <div className="p-10">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl mb-4 font-serif font-semibold">
          Hot Deal Products
        </h2>
        <Link to="/AllProducts">
          <p className="font-semibold hover:text-[#fc6221] transition-all">
            View All
          </p>
        </Link>
      </div>
      <hr />
      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-4 mt-4">
        {products.slice(0, 24).map(product => {
          const discountPercentage = (
            ((product.price - product.discountPrice) / product.price) *
            100
          ).toFixed(0);

          const isInCart = cart.some(item => item.id === product._id);

          return (
            <div
              key={product._id}
              className="h-[90%] hover:h-[100%] shadow hover:shadow-lg hover:border p-4 transition-all hover:text-[#fc6221]"
            >
              <div className="relative">
                <p className="absolute bg-[#fc6221] text-white font-semibold rounded-sm p-1 px-2 right-0">
                  -{discountPercentage}%
                </p>
                <div className="flex justify-center items-center h-48 lg:h-60">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-all hover:w-[95%] hover:h-[95%]"
                  />
                </div>
              </div>
              <p className="font-medium">{product.name}</p>
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
              {!isInCart ? (
                <button
                  className="button text-center w-full h-10 rounded bg-[#fc6221] text-white font-semibold mt-2"
                  onClick={() => addToCart(product)}
                >
                  Add To Cart
                </button>
              ) : (
                <button
                  className="button text-center w-full h-10 rounded border border-[#fc6221] bg-white text-[#fc6221] font-semibold mt-2"
                  onClick={() => removeFromCart(product._id)}
                >
                  Remove Item
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SomeProducts;
