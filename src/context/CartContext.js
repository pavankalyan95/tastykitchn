import React from 'react'

const CartContext = React.createContext({
  addFoodItemToCart: () => {},
  changeActiveBtnStatus: () => {},
  incrementCartItemQuantity: () => {},
  decrementCartItemQuantity: () => {},
})
export default CartContext
