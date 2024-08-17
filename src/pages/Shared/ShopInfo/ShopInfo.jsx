import follower from '../../../assets/Icons/followers.png';
import car from '../../../assets/Icons/delivery-car.png';
import chat from '../../../assets/Icons/chat.png';
import gift from '../../../assets/Icons/gift-box.png';

const ShopInfo = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 m-10 mt-2">
      <div className="flex justify-center items-center gap-3 shadow-lg p-5">
        <img src={follower} className="w-14" alt="Followers" />
        <p>Follow Us for Every Occasional Campaign Discounts</p>
      </div>
      <div className="flex justify-center items-center gap-3 shadow-lg p-5">
        <img src={car} className="w-14" alt="Followers" />
        <p>Carefully Delivering Products at Your Door Step</p>
      </div>
      <div className="flex justify-center items-center gap-3 shadow-lg p-5">
        <img src={chat} className="w-14" alt="Followers" />
        <p>Dedicated Support</p>
      </div>
      <div className="flex justify-center items-center gap-3 shadow-lg p-5">
        <img src={gift} className="w-14" alt="Followers" />
        <p>Support Gift Service</p>
      </div>
    </div>
  );
};

export default ShopInfo;
