import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {FiStar} from 'react-icons/fi'
import {BiRupee} from 'react-icons/bi'
import Footer from '../Footer'
import NavHeader from '../NavHeader'
import FoodItems from '../FoodItems'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class RestaurantDetails extends Component {
  state = {
    restaurantFoodData: [],
    apiStatus: apiStatusConstants.initial,
    restaurantInfo: {},
    quantity: 1,
    isBtnActive: true,
  }

  componentDidMount() {
    this.getRestaurantData()
  }

  getBannerData = data => ({
    id: data.id,
    imageUrl: data.image_url,
    rating: data.rating,
    name: data.name,
    costForTwo: data.cost_for_two,
    cuisine: data.cuisine,
    reviewsCount: data.reviews_count,
    openAt: data.open_at,
    location: data.location,
    itemsCount: data.items_count,
  })

  getRestaurantData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/restaurants-list/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedBannerData = this.getBannerData(fetchedData)
      const updatedRestaurantFoodDetails = fetchedData.food_items.map(each => ({
        name: each.name,
        cost: each.cost,
        foodType: each.food_type,
        imageUrl: each.image_url,
        id: each.id,
      }))
      this.setState({
        restaurantFoodData: updatedRestaurantFoodDetails,
        restaurantInfo: updatedBannerData,
        apiStatus: apiStatusConstants.success,
      })
    }
    if (response.status === 404) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div className="res-loader-container" testid="restaurant-details-loader">
      <Loader type="Oval" color="#f7931e" height="50" width="50" />
    </div>
  )

  renderRestaurantItemsDetailsView = () => {
    const {
      restaurantFoodData,
      restaurantInfo,
      quantity,
      isBtnActive,
    } = this.state
    return (
      <div className="restaurant-food-items-con" testid="foodItem">
        <div className="restaurant-add-con">
          <div className="hotel-main-img">
            <img
              className="restaurant-pic"
              alt="restaurant"
              src={restaurantInfo.imageUrl}
            />
            <div className="res-address-con">
              <h1 className="res-head">{restaurantInfo.name}</h1>
              <p className="res-food-type">{restaurantInfo.cuisine}</p>
              <p className="res-address">{restaurantInfo.location}</p>
              <div className="rating-cost-con">
                <div className="rating-con-ratings">
                  <div>
                    <div className="overall-rating-con">
                      <FiStar className="add-star" />
                      <p className="rating">{restaurantInfo.rating}</p>
                    </div>
                    <div className="total-ratings-container">
                      <p className="count-of-ratings">
                        {restaurantInfo.reviewsCount} +
                      </p>
                      <p className="reviews-count-para">Ratings</p>
                    </div>
                  </div>
                  <hr className="vr-line" />
                  <div>
                    <div className="price-of-two-container">
                      <div className="cost-for-two-con">
                        <BiRupee className="rupee-symbol" />
                        <p className="money">{restaurantInfo.costForTwo}</p>
                      </div>
                      <p className="cost-for-two-para">Cost for two</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ul className="food-items-list">
          {restaurantFoodData.map(each => (
            <FoodItems
              foodItems={each}
              key={each.id}
              isBtnActive={isBtnActive}
              quantity={quantity}
              restaurantInfo={restaurantInfo}
            />
          ))}
        </ul>
      </div>
    )
  }

  renderRestaurantMenuDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderRestaurantItemsDetailsView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {match} = this.props
    const {params} = match
    const {id} = params
    return (
      <>
        <NavHeader resId={id} />
        <div className="restaurant-item-details-container" testid="foodItem">
          {this.renderRestaurantMenuDetails()}
        </div>
        <Footer />
      </>
    )
  }
}

export default RestaurantDetails
