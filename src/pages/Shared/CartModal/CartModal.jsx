import { useContext } from 'react';
import deleteImg from '../../../assets/Icons/trash.png';
import { CartContext } from '../../../Features/ContextProvider';

const CartModal = ({ product }) => {
  const { cartDispatch } = useContext(CartContext);

  const Remove = id => {
    cartDispatch({ type: 'Remove', id });
  };

  return (
    <div>
      <div className="flex gap-2 items-center">
        <img src={product.image} className="w-1/6" alt="" />
        <div className="ms-0">
          <p className="font-semibold">{product.name}</p>
          <p className="font-semibold">
            {product.quantity} ✕ <span className="font-semibold">৳</span>{' '}
            {product.discountPrice}
          </p>
        </div>
        <div
          className="flex justify-center items-center ml-auto"
          onClick={() => Remove(product.id)}
        >
          <img
            src={deleteImg}
            className="w-7 h-7 hover:bg-slate-100 hover:p-1 transition-all rounded-full"
            alt=""
          />
        </div>
      </div>
      <hr className="my-4" />
    </div>
  );
};

export default CartModal;
