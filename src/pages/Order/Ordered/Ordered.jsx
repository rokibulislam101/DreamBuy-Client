import { Link } from 'react-router-dom';
import orderImg from '../../../assets/Icons/hooray.jpg';
import { Helmet } from 'react-helmet-async';

const Ordered = () => {
  return (
    <div>
      <Helmet>
        <title>Dream Buy | Ordered</title>
      </Helmet>
      <div className="m-10 my-20">
        <div className="flex flex-col justify-center items-center">
          <img src={orderImg} className="w-48 mb-5" alt="Hooray" />
          <h2 className="text-2xl sm:text-3xl text-center font-bold my-4 text-green-500">
            Order Placed Successfully!
          </h2>
          <p className="text-center font-semibold mb-7">
            Thank you for your order. You will receive a confirmation message or
            call shortly.
          </p>
          <Link to="/AllProducts">
            <button className="w-fit text-[#ff6221] hover:text-white font-semibold px-8 py-1 border border-[#ff6221] hover:bg-[#ff6221] transition-all rounded-full">
              Explore More Products
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Ordered;
