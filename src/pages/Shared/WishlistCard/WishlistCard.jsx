import { useContext } from "react";
import { CartContext, WishlistContext } from "../../../Features/ContextProvider";

const WishlistCard = ({ product }) => {
  const { wishlistDispatch } = useContext(WishlistContext);
  const { cartDispatch } = useContext(CartContext);

  const handleRemoveFromWishlist = id => {
    wishlistDispatch({
      type: 'REMOVE_FROM_WISHLIST',
      id: id,
    });
  };

  const addToCart = product => {
    cartDispatch({
      type: 'Add',
      product: { ...product, id: product._id },
    });

    handleRemoveFromWishlist(product.id);
  };

  return (
    <div>
      <div className="flex justify-center">
        <div className="md:flex w-full justify-center">
          <div className="flex w-full items-center justify-center">
            <div className="flex w-full items-center justify-around gap-4">
              <button
                className="font-bold text-xl"
                onClick={() => handleRemoveFromWishlist(product.id)}
              >
                ×
              </button>
              <div className="flex w-full items-center justify-around gap-4">
                <img
                  src={product.image}
                  alt="Product Photo"
                  className="w-16 h-16 object-cover"
                />
                <p className="w-full text-[#ff6621]">{product.name}</p>
              </div>
            </div>
            <div className="flex w-full items-center justify-around gap-4">
              <p className="">৳ {product.discountPrice}</p>
              <p>{product.status}</p>
            </div>
          </div>
          <div className="flex items-center justify-end w-full">
            <button
              className="w-fit bg-[#ff6221] text-white font-semibold py-2 px-4 rounded"
              onClick={() => addToCart(product)}
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
      <hr className="my-3" />
    </div>
  );
}

export default WishlistCard
