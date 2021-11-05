import {BiRupee} from 'react-icons/bi'

import './index.css'

const CartSummary = props => {
  const {updateOrderStatus} = props
  const getLocalData = localStorage.getItem('cartData')
  const parsedData = JSON.parse(getLocalData)
  let total = 0
  parsedData.forEach(eachCartItem => {
    total += eachCartItem.cost * eachCartItem.quantity
  })
  const placeOrder = () => {
    updateOrderStatus(true)
  }
  return (
    <div className="cart-summary-container">
      <p className="order-total-value" testid="total-price">
        Order Total:
      </p>
      <div className="total-amount-and-btn">
        <div className="complete-amount">
          <BiRupee color="#FFA412" size={18} />
          <p className="all-items-amount" testid="total-price">
            {total}
          </p>
        </div>
        <button type="button" className="checkout-button" onClick={placeOrder}>
          Place Order
        </button>
      </div>
    </div>
  )
}

export default CartSummary
