import {Link} from 'react-router-dom'
import './index.css'

const PlaceOder = props => {
  const {reUpdateOrderStatus} = props
  const onClickNavigateToHome = () => {
    reUpdateOrderStatus(false)
  }
  return (
    <div className="ordered-card-con">
      <img
        className="success-logo"
        src="https://res.cloudinary.com/dli8bxrdu/image/upload/v1635570572/Vector_qdviea.png"
        alt="success-logo"
      />
      <h1 className="success-payment">Payment Successful</h1>
      <p className="ordered-description">
        Thank you for ordering
        <br />
        Your payment is successfully completed.
      </p>
      <Link to="/">
        <button
          className="go-to-home-page"
          type="button"
          onClick={onClickNavigateToHome}
        >
          Go To Home Page
        </button>
      </Link>
    </div>
  )
}
export default PlaceOder
