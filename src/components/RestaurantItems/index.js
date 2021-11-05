import {Link} from 'react-router-dom'
import {FiStar} from 'react-icons/fi'
import './index.css'

const RestaurantItems = props => {
  const {eachHotel} = props
  return (
    <Link to={`/restaurant/${eachHotel.id}`} className="link-dec">
      <li className="hotel-con" testid="restaurant-item">
        <img
          className="hotel-img"
          src={eachHotel.imageUrl}
          alt={eachHotel.name}
        />
        <div className="restaurant-name-con">
          <h1 className="res-name">{eachHotel.name}</h1>
          <p className="food-type">{eachHotel.cuisine}</p>
          <div className="rating-con">
            <FiStar className="star-icon" />
            <p className="rating-num">{eachHotel.userRating.rating}</p>
            <p className="rating-count">
              ({eachHotel.userRating.totalReviews})
            </p>
          </div>
        </div>
      </li>
    </Link>
  )
}
export default RestaurantItems
