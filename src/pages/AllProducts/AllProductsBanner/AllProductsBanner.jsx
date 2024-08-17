
import bannerImg from '../../../assets/events/banner.jpg';

const AllProductsBanner = () => {

  return (
    <div>
      <div className="relative">
        <img
          src={bannerImg}
          className="w-full h-52 rounded-none"
          alt="Banner"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-[#151515c7] to-[rgba(21, 21, 21, 0)]">
          <h2 className="text-2xl text-center font-bold text-white">
            Home / <span className="text-[#fc6221]">All Products</span>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default AllProductsBanner;
