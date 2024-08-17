// import React, { createContext, useReducer, useEffect } from 'react';
// import CartReducer from './CartReducer';

// export const CartContext = createContext();

// const initialState = JSON.parse(localStorage.getItem('cart')) || [];

// const ContextProvider = ({ children }) => {
//   const [cart, dispatch] = useReducer(CartReducer, initialState);

//   useEffect(() => {
//     localStorage.setItem('cart', JSON.stringify(cart));
//   }, [cart]);

//   return (
//     <CartContext.Provider value={{ cart, dispatch }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// export default ContextProvider;


import React, { createContext, useReducer, useEffect } from 'react';
import CartReducer from './CartReducer';
import WishlistReducer from './WishlistReducer';

export const CartContext = createContext();
export const WishlistContext = createContext();

const initialCartState = JSON.parse(localStorage.getItem('cart')) || [];
const initialWishlistState = JSON.parse(localStorage.getItem('wishlist')) || [];

const ContextProvider = ({ children }) => {
  const [cart, cartDispatch] = useReducer(CartReducer, initialCartState);
  const [wishlist, wishlistDispatch] = useReducer(
    WishlistReducer,
    initialWishlistState
  );

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  return (
    <CartContext.Provider value={{ cart, cartDispatch }}>
      <WishlistContext.Provider value={{ wishlist, wishlistDispatch }}>
        {children}
      </WishlistContext.Provider>
    </CartContext.Provider>
  );
};

export default ContextProvider;



// import React, { createContext, useReducer } from 'react'
// import CartReducer from './CartReducer';

// export const CartContext = createContext();


// const ContextProvider = ({children}) => {

//   const [cart, dispatch] = useReducer(CartReducer, [])

//   return (
//     <CartContext.Provider value={{ cart, dispatch }}>
//       {children}
//     </CartContext.Provider>
//   )
// }

// export default ContextProvider
