import { useState, useContext, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { CartContext } from '../../../Features/ContextProvider';
import { totalPrice } from '../../../Features/CartReducer';
import CheckoutBanner from './CheckoutBanner';
import './Checkout.css';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const [selectedOption, setSelectedOption] = useState('Cash on Delivery');
  const { cart, cartDispatch } = useContext(CartContext);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [error, setError] = useState(null);
  const axiosSecure = useAxiosSecure();
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (cart.length === 0) {
      navigate('/Cart');
    }
  }, [cart, navigate])

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  // Random 6-digit Order ID generator
  const generateOrderId = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let orderId = '';
    for (let i = 0; i < 6; i++) {
      orderId += chars[Math.floor(Math.random() * chars.length)];
    }
    return orderId;
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const billingDetails = {
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value,
      address: e.target.address.value,
      date: e.target.date.value,
      division: e.target.division.value,
      district: e.target.district.value,
      phone: e.target.phone.value,
      email: e.target.email.value,
      additionalInfo: e.target.additionalInfo.value,
    };

    const orderDetails = {
      products: cart.map(product => ({
        id: product.id,
        name: product.name,
        category: product.category,
        subcategory: product.subcategory,
        image: product.image,
        quantity: product.quantity,
        price: product.discountPrice,
        status: product.status,
      })),
      total: totalPrice(cart),
      paymentMethod: selectedOption,
      termsCondition: isChecked,
      status: 'Pending', // New Order Status
    };

    const orderId = {
      orderId: generateOrderId(),
      billingDetails,
      orderDetails,
    };

    try {
      await axiosSecure.post('/order', orderId);

      // Clear Cart after successful order
      cartDispatch({ type: 'CLEAR_CART' });

      setOrderPlaced(true);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError('Unauthorized. Please log in.');
      } else {
        setError('Failed to place order. Please try again.');
      }
    }
  };

  useEffect(() => {
    if (orderPlaced) {
      navigate('/Ordered');
    }
  }, [orderPlaced, navigate]);

  return (
    <div>
      <Helmet>
        <title>Dream Buy | Checkout</title>
      </Helmet>
      <CheckoutBanner />
      <div className="m-10 xl:mx-40">
        <form className="md:flex gap-4" onSubmit={handleSubmit}>
          {/* Billing Details Section */}
          <div className="w-full md:w-2/3 border p-5 rounded-lg">
            <h2 className="text-xl font-semibold font-serif">
              Billing Details
            </h2>
            <hr className="my-3" />
            <div className="space-y-3">
              <div className="md:flex gap-4">
                <div className="w-full">
                  <label htmlFor="firstName" className="block">
                    First Name <span className="text-[#ff6221]">*</span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder="Mr."
                    required
                    className="w-full p-2 md:p-3 border rounded"
                  />
                </div>
                <div className="w-full mt-2 md:mt-0">
                  <label htmlFor="lastName" className="block">
                    Last Name <span className="text-[#ff6221]">*</span>
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder="Abc"
                    required
                    className="w-full p-2 md:p-3 border rounded"
                  />
                </div>
              </div>
              <div>
                <p>
                  Country / Region <span className="text-[#ff6221]">*</span>
                </p>
                <h6 className="font-semibold mt-2">Bangladesh</h6>
              </div>
              <div className="md:flex gap-4">
                <div className="w-full">
                  <label htmlFor="address" className="block">
                    Address <span className="text-[#ff6221]">*</span>
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    placeholder="House Name & No., Road No., Village Name., Ward No., Thana/Upazila"
                    required
                    className="w-full p-2 md:p-3 border rounded"
                  />
                </div>
                <div className="w-full md:w-1/2 mt-2 md:mt-0">
                  <label htmlFor="date" className="block">
                    Date <span className="text-[#ff6221]">*</span>
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    required
                    className="w-full p-2 md:p-3 border rounded"
                  />
                </div>
              </div>
              <div className="md:flex gap-4">
                <div className="w-full">
                  <label htmlFor="division" className="block">
                    Division <span className="text-[#ff6221]">*</span>
                  </label>
                  <input
                    type="text"
                    id="division"
                    name="division"
                    placeholder="Division"
                    required
                    className="w-full p-2 md:p-3 border rounded"
                  />
                </div>
                <div className="w-full mt-2 md:mt-0">
                  <label htmlFor="district" className="block">
                    District <span className="text-[#ff6221]">*</span>
                  </label>
                  <input
                    type="text"
                    id="district"
                    name="district"
                    placeholder="District"
                    required
                    className="w-full p-2 md:p-3 border rounded"
                  />
                </div>
              </div>
              <div className="md:flex gap-4">
                <div className="w-full">
                  <label htmlFor="phone" className="block">
                    Phone No.<span className="text-[#ff6221]">*</span>
                  </label>
                  <input
                    type="number"
                    id="phone"
                    name="phone"
                    placeholder="Phone Mandatory for Order Tracking"
                    required
                    className="w-full p-2 md:p-3 border rounded"
                  />
                </div>
                <div className="w-full mt-2 md:mt-0">
                  <label htmlFor="email" className="block">
                    Email <span className="text-[#ff6221]">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    required
                    className="w-full p-2 md:p-3 border rounded"
                  />
                </div>
              </div>
              <div>
                <h6 className="font-semibold">
                  Additional Information
                  <span className="text-[#6a6a6b] text-xs"> (optional)</span>
                </h6>
                <hr className="my-2" />
                <textarea
                  id="additionalInfo"
                  name="additionalInfo"
                  placeholder="Add some special notes or anything you did not find above fields..."
                  className="w-full p-2 md:p-3 border rounded"
                />
              </div>
            </div>
          </div>

          {/* Order Summary Section */}
          <div className="w-full md:w-1/3 h-fit mt-10 md:mt-0 border p-5 rounded-lg border-[#ff6221]">
            <h2 className="text-xl font-semibold font-serif">Your Order</h2>
            <hr className="my-3" />
            <div className="flex justify-between text-[#c9c9c9]">
              <p className="flex font-semibold">Product</p>
              <p className="font-semibold">Subtotal</p>
            </div>
            <hr className="my-3" />
            {cart.map(product => (
              <div key={product.id} className="flex justify-between my-3">
                <p>
                  {product.name}{' '}
                  <span className="font-semibold">×{product.quantity}</span>
                </p>
                <p className="font-semibold">
                  <span className="font-extrabold">৳</span>{' '}
                  {product.quantity * product.discountPrice}
                </p>
              </div>
            ))}
            <hr className="my-3" />
            <div className="flex justify-between">
              <p className="flex font-semibold text-[#6a6a6b]">Subtotal</p>
              <p className="font-semibold">
                <span className="font-extrabold">৳ </span>
                {totalPrice(cart)}
              </p>
            </div>
            <hr className="my-3" />
            <div className="flex justify-between">
              <p className="font-semibold text-[#6a6a6b]">Total</p>
              <p className="text-xl font-bold">
                <span className="font-extrabold">৳ </span>
                {totalPrice(cart)}
              </p>
            </div>
            <hr className="my-3" />
            <div className="transition-all">
              <div className="mb-2">
                <input
                  type="radio"
                  id="Cash on Delivery"
                  name="payment-option"
                  checked={selectedOption === 'Cash on Delivery'}
                  onChange={() => setSelectedOption('Cash on Delivery')}
                  className="mr-2"
                />
                <label
                  htmlFor="Cash on Delivery"
                  className="text-orange-500 font-semibold text-sm"
                >
                  Cash on Delivery
                </label>
                {selectedOption === 'Cash on Delivery' && (
                  <p className="ml-2 text-gray-500 text-xs">
                    Convenient Cash-on-Delivery Option Available for Hassle-Free
                    Shopping Experience. Delivery Charge Applicable (T&Cs Apply)
                  </p>
                )}
              </div>
              <div className="mb-4">
                <input
                  type="radio"
                  id="digital-payment"
                  name="payment-option"
                  checked={selectedOption === 'Cards, Mobile, Digital Payment'}
                  onChange={() =>
                    setSelectedOption('Cards, Mobile, Digital Payment')
                  }
                  className="mr-2"
                />
                <label
                  htmlFor="digital-payment"
                  className="text-orange-500 font-semibold text-sm"
                >
                  Cards, Mobile, Digital Payment
                </label>
                {selectedOption === 'Cards, Mobile, Digital Payment' && (
                  <p className="ml-2 text-gray-500 text-xs">
                    Pay Securely by Debit/Credit Cards, Mobile Banking, or
                    Internet Banking through SSLCommerz Secure Servers. Delivery
                    Charge Applicable (T&Cs Apply)
                  </p>
                )}
              </div>
            </div>
            <p className="my-3">
              Your personal data will be used to process your order, support
              your experience throughout this website, and for other purposes
              described in our
              <a className="text-[#ff6221] ml-1 underline">privacy policy.</a>
            </p>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
                required
                className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
              />
              <label className="text-sm text-gray-700">
                I have read and agree to the website
                <a className="text-[#ff6221] ml-1 underline">
                  terms and conditions.
                </a>
              </label>
            </div>
            <div className="text-center mt-5">
              <button
                type="submit"
                className="w-full h-11 text-white font-bold rounded bg-[#ff6221] hover:bg-[#333] transition-colors"
              >
                Place Order
              </button>
            </div>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
