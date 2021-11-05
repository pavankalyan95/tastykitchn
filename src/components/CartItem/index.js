import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import {BiRupee} from 'react-icons/bi'

import CartContext from '../../context/CartContext'
import './index.css'

const CartItem = props => (
  <CartContext.Consumer>
    {value => {
      const {incrementCartItemQuantity, decrementCartItemQuantity} = value
      const {cartItemDetails} = props
      const {id, name, quantity, cost, imageUrl} = cartItemDetails
      const onClickDecrement = () => {
        decrementCartItemQuantity(id)
      }
      const onClickIncrement = () => {
        incrementCartItemQuantity(id)
      }
      const totalPrice = cost * quantity
      return (
        <li className="cart-item">
          <div className="img-and-title-con-for-small">
            <div className="cart-restaurant-img">
              <img className="cart-food-image" src={imageUrl} alt={imageUrl} />
              <div className="cart-food-title-container">
                <h1 className="cart-food-title">{name}</h1>
              </div>
            </div>
            <div className="cart-quantity-container">
              <div className="cart-food-title-container-for-small">
                <h1 className="cart-food-title">{name}</h1>
              </div>
              <div className="increase-dec-btn">
                <button
                  type="button"
                  className="quantity-controller-button"
                  testid="decrement-quantity"
                  onClick={onClickDecrement}
                >
                  <BsDashSquare color="#52606D" size={28} />
                </button>
                <p className="cart-quantity" testid="item-quantity">
                  {quantity}
                </p>
                <button
                  type="button"
                  className="quantity-controller-button"
                  testid="increment-quantity"
                  onClick={onClickIncrement}
                >
                  <BsPlusSquare color="#52606D" size={28} />
                </button>
              </div>
              <div className="total-price-display-container">
                <BiRupee color="#FFA412" size={16} />
                <p className="cart-total-price" testid="total-price">
                  {totalPrice}
                </p>
              </div>
            </div>
          </div>

          <div className="img-and-title-con-for-large-devices">
            <div className="cart-restaurant-img-con-for-large">
              <img className="cart-food-image" src={imageUrl} alt={imageUrl} />
              <div className="cart-food-title-container">
                <h1 className="cart-food-title">{name}</h1>
              </div>
            </div>
            <div className="cart-quantity-container-for-large">
              <button
                type="button"
                className="quantity-controller-button"
                testid="decrement-quantity"
                onClick={onClickDecrement}
              >
                <BsDashSquare color="#52606D" size={28} />
              </button>
              <p className="cart-quantity" testid="item-quantity">
                {quantity}
              </p>
              <button
                type="button"
                className="quantity-controller-button"
                testid="increment-quantity"
                onClick={onClickIncrement}
              >
                <BsPlusSquare color="#52606D" size={28} />
              </button>
            </div>
            <div className="total-price-display-container-for-large">
              <BiRupee color="#FFA412" size={16} />
              <p className="cart-total-price" testid="total-price">
                {totalPrice}
              </p>
            </div>
          </div>
        </li>
      )
    }}
  </CartContext.Consumer>
)

export default CartItem
