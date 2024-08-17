import React, { useEffect, useState, useRef } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const Banner = () => {
  const [banners, setBanners] = useState([]);
  const [inactiveBanners, setInactiveBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const axiosSecure = useAxiosSecure();
  const slideInterval = useRef(null);
  const transitionRef = useRef();

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await axiosSecure.get('/banner');
        const activeBanners = response.data.filter(b => b.isActive).slice(0, 3);
        const inactiveBanners = response.data.filter(b => !b.isActive);
        setBanners(activeBanners);
        setInactiveBanners(inactiveBanners);
      } catch (error) {
        console.error('Error fetching banners:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, [axiosSecure]);

  useEffect(() => {
    const startSlider = () => {
      transitionRef.current = 'transform 1s ease-in-out';

      slideInterval.current = setInterval(() => {
        setCurrentIndex(prevIndex => {
          if (prevIndex === banners.length) {
            transitionRef.current = 'none';
            return 0;
          }
          return prevIndex + 1;
        });
      }, 5000);
    };

    if (banners.length > 0) {
      startSlider();
      return () => clearInterval(slideInterval.current);
    }
  }, [banners]);

  useEffect(() => {
    if (currentIndex === 0) {
      transitionRef.current = 'transform 1s ease-in-out';
    }
  }, [currentIndex]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (banners.length === 0 && inactiveBanners.length === 0) {
    return <div>No banners available</div>;
  }

  return (
    <div className="md:flex p-6 gap-6 justify-center items-center align-middle">
      <div className="slider-container relative w-full h-full overflow-hidden">
        <div
          className="slider-inner"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            transition: transitionRef.current,
            whiteSpace: 'nowrap',
          }}
        >
          {[...banners, banners[0]].map((banner, index) => (
            <div key={index} className="slider-item w-full inline-block">
              <img
                src={banner.image}
                alt="Banner"
                className="w-full h-[400px] object-cover"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="inactive-banners flex md:flex-col gap-4 w-full md:w-2/5 justify-center">
        {inactiveBanners.map((banner, index) => (
          <div key={index} className="inactive-banner-item">
            <img
              src={banner.image}
              alt={`Inactive Banner ${index}`}
              className="w-full h-[200px] object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Banner;
