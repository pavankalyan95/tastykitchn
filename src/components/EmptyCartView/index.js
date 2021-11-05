import {Link} from 'react-router-dom'
import './index.css'

const EmptyCartView = () => (
  <div className="empty-cart-container">
    <img
      className="empty-cart-img"
      alt="empty cart"
      src="https://res.cloudinary.com/dli8bxrdu/image/upload/v1635575644/cooking_1_qkripb.png"
    />
    <h1 className="empty-card-head">No Order Yet!</h1>
    <p className="empty-cart-para">
      Your cart is empty. Add something from the menu.
    </p>
    <Link to="/" className="nav">
      <button className="empty-cart-btn" type="button">
        Order now
      </button>
    </Link>
  </div>
)

export default EmptyCartView
