import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import bannerImg from '../../../assets/events/banner.jpg';
import facebook from '../../../assets/Icons/facebook.png';
import youtube from '../../../assets/Icons/youtube.png';
import whatsapp from '../../../assets/Icons/whatsapp.png';
import pinterest from '../../../assets/Icons/pinterest.png';
import { CartContext } from '../../../Features/ContextProvider';

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const axiosSecure = useAxiosSecure();

  const { cartDispatch } = useContext(CartContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axiosSecure.get(`/product/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id, axiosSecure]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const increaseQuantity = () => setQuantity(prevQuantity => prevQuantity + 1);
  const decreaseQuantity = () =>
    setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));

  const discountPercentage =
    product.price && product.discountPrice
      ? (
          ((product.price - product.discountPrice) / product.price) *
          100
        ).toFixed(0)
      : 0;

  return (
    <div className="bg-slate-50">
      <div className="relative">
        <img
          src={bannerImg}
          className="w-full h-40 sm:h-52 rounded-none"
          alt="Banner"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-[#151515c7] to-[rgba(21, 21, 21, 0)]">
          <h2 className="text-lg sm:text-2xl text-center font-bold text-white">
            Home / <span className="text-[#fc6221]">{product.name}</span>
          </h2>
        </div>
      </div>
      <div className="bg-white m-10 p-10 md:mx-20 xl:mx-60 shadow-md">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="flex justify-center items-center">
            <img
              src={product.image}
              alt={product.name}
              className="w-full max-w-md object-cover"
            />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl mt-4 font-semibold">
              {product.name}
            </h2>
            <hr className="my-4" />
            <div className="flex items-center gap-3 font-semibold mt-2">
              <p className="text-[#fc6221] text-2xl font-bold">
                <span className="font-extrabold">৳</span>{' '}
                {product.discountPrice}
              </p>
              <p className="text-[#848484]">
                <s>
                  <span className="font-extrabold">৳</span> {product.price}
                </s>
              </p>
              <p className="text-[#fc6221]">(-{discountPercentage}%)</p>
            </div>
            <p className="mt-3">
              Status:{' '}
              <span
                className={`font-semibold ${
                  product.status === 'Available'
                    ? 'text-[#57ab1f]'
                    : 'text-red-500'
                }`}
              >
                {product.status}
              </span>
            </p>
            <p className="text-lg mt-2">{product.description}</p>
            <div className="flex items-center mt-4">
              <button
                className="bg-slate-100 w-[45px] h-[45px] font-bold text-xl rounded-full"
                onClick={decreaseQuantity}
              >
                -
              </button>
              <input
                type="text"
                value={quantity}
                readOnly
                className="w-10 text-center font-semibold border-gray-300 rounded-md"
              />
              <button
                className="bg-slate-100 w-[45px] h-[45px] font-bold text-xl rounded-full"
                onClick={increaseQuantity}
              >
                +
              </button>
            </div>
            <div className="flex gap-3">
              <button
                className="bg-[#fc6221] text-white font-semibold rounded px-8 py-2 mt-4"
                onClick={() =>
                  cartDispatch({
                    type: 'Add',
                    product: {
                      ...product,
                      id: product._id,
                      quantity: quantity,
                    },
                  })
                }
              >
                Add to Cart
              </button>
              <Link to="/Checkout">
                <button
                  className="bg-[#57ab1f] text-white font-semibold rounded px-8 py-2 mt-4"
                  onClick={() =>
                    cartDispatch({
                      type: 'Add',
                      product: {
                        ...product,
                        id: product._id,
                        quantity: quantity,
                      },
                    })
                  }
                >
                  Buy Now
                </button>
              </Link>
            </div>
            <hr className="my-4" />
            <p>
              Category:{' '}
              <span className="font-semibold">{product.category}</span>
            </p>
            <div className="flex space-x-3 w-48 mt-3">
              <a
                href="http://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={facebook} alt="Facebook" />
              </a>
              <a
                href="http://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={youtube} alt="YouTube" />
              </a>
              <a
                href="http://whatsapp.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={whatsapp} alt="WhatsApp" />
              </a>
              <a
                href="http://pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={pinterest} alt="Pinterest" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
