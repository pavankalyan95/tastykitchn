import CartItem from '../CartItem'

import './index.css'

const CartListView = () => {
  const getLocalData = localStorage.getItem('cartData')
  const parsedData = JSON.parse(getLocalData)
  return (
    <ul className="cart-list">
      {parsedData.map(eachCartItem => (
        <CartItem key={eachCartItem.id} cartItemDetails={eachCartItem} />
      ))}
    </ul>
  )
}

export default CartListView
