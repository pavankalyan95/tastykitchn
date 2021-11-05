import {Component} from 'react'
import {BiRupee} from 'react-icons/bi'
import {FiStar} from 'react-icons/fi'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import CartContext from '../../context/CartContext'
import './index.css'

class FoodItems extends Component {
  render() {
    return (
      <CartContext.Consumer>
        {value => {
          const {
            addFoodItemToCart,
            incrementCartItemQuantity,
            decrementCartItemQuantity,
            changeActiveBtnStatus,
          } = value
          const {foodItems, restaurantInfo, quantity, isBtnActive} = this.props
          const addItemToCart = () => {
            addFoodItemToCart({...foodItems, quantity, isBtnActive})
            changeActiveBtnStatus(foodItems.id)
          }
          const increaseFoodItemCount = () => {
            incrementCartItemQuantity(foodItems.id)
          }
          const decreaseFoodItemCount = () => {
            decrementCartItemQuantity(foodItems.id)
          }
          const getLocalData = localStorage.getItem('cartData')
          const parsedData = JSON.parse(getLocalData)
          let foodItemObject = null
          if (parsedData !== null) {
            foodItemObject = parsedData.find(
              eachCartItem => eachCartItem.id === foodItems.id,
            )
          }
          return (
            <>
              {foodItemObject ? (
                <li className="food-item-con">
                  <img
                    className="food-item-img"
                    src={foodItemObject.imageUrl}
                    alt={foodItemObject.name}
                  />
                  <div className="food-item-content">
                    <h1 className="food-item-name">{foodItemObject.name}</h1>
                    <div className="each-food-item-cost-icon">
                      <BiRupee className="rupee" />
                      <p className="food-item-price">{foodItemObject.cost}</p>
                    </div>
                    <div className="food-item-rating-con">
                      <FiStar className="food-item-add-star" />
                      <p className="food-item-rating">
                        {restaurantInfo.rating}
                      </p>
                    </div>
                    {foodItemObject.isBtnActive ? (
                      <button
                        className="add-btn"
                        type="button"
                        onClick={addItemToCart}
                      >
                        Add
                      </button>
                    ) : (
                      <div className="increasing-cont-con">
                        <button
                          className="decrease-btn"
                          type="button"
                          testid="decrement-count"
                          onClick={decreaseFoodItemCount}
                        >
                          <BsDashSquare color="#52606D" size={12} />
                        </button>
                        <p
                          className="food-items-count-para"
                          testid="active-count"
                        >
                          {foodItemObject.quantity}
                        </p>
                        <button
                          className="decrease-btn"
                          type="button"
                          testid="increment-count"
                          onClick={increaseFoodItemCount}
                        >
                          <BsPlusSquare color="#52606D" size={12} />
                        </button>
                      </div>
                    )}
                  </div>
                </li>
              ) : (
                <li className="food-item-con">
                  <img
                    className="food-item-img"
                    src={foodItems.imageUrl}
                    alt={foodItems.name}
                  />
                  <div className="food-item-content">
                    <h1 className="food-item-name">{foodItems.name}</h1>
                    <p className="food-item-price">
                      <BiRupee /> {foodItems.cost}
                    </p>
                    <div className="food-item-rating-con">
                      <FiStar className="food-item-add-star" />
                      <p className="food-item-rating">
                        {restaurantInfo.rating}
                      </p>
                    </div>
                    {isBtnActive ? (
                      <button
                        className="add-btn"
                        type="button"
                        onClick={addItemToCart}
                      >
                        ADD
                      </button>
                    ) : (
                      <div className="increasing-cont-con">
                        <button
                          className="decrease-btn"
                          type="button"
                          testid="decrement-count"
                          onClick={decreaseFoodItemCount}
                        >
                          <BsDashSquare color="#52606D" size={12} />
                        </button>
                        <p
                          className="food-items-count-para"
                          testid="active-count"
                        >
                          {quantity}
                        </p>
                        <button
                          className="decrease-btn"
                          type="button"
                          testid="increment-count"
                          onClick={increaseFoodItemCount}
                        >
                          <BsPlusSquare color="#52606D" size={12} />
                        </button>
                      </div>
                    )}
                  </div>
                </li>
              )}
            </>
          )
        }}
      </CartContext.Consumer>
    )
  }
}
export default FoodItems
