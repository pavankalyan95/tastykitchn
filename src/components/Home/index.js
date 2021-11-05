import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {
  BsArrowLeftSquare,
  BsFilterRight,
  BsArrowRightSquare,
} from 'react-icons/bs'
import SortingOption from '../SortingOption'
import ReactSlick from '../ReactSlick'

import RestaurantItems from '../RestaurantItems'
import Footer from '../Footer'
import NavHeader from '../NavHeader'
import './index.css'

const sortByOptions = [
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    restaurantList: [],
    activeOptionId: sortByOptions[0].value,
    pageCount: 1,
    limitVal: 9,
    offsetVal: 0,
    offersList: [],
  }

  componentDidMount() {
    this.getPopularRestaurants()
  }

  getRating = data => ({
    totalReviews: data.total_reviews,
    rating: data.rating,
  })

  getPopularRestaurants = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const {activeOptionId, limitVal, offsetVal} = this.state
    const apiUrlForOffers = 'https://apis.ccbp.in/restaurants-list/offers'
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/restaurants-list?offset=${offsetVal}&limit=${limitVal}&sort_by_rating=${activeOptionId}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const offersResponse = await fetch(apiUrlForOffers, options)
    if (offersResponse.ok && response.ok) {
      const fetchedOfferData = await offersResponse.json()
      const updatedOffersData = fetchedOfferData.offers.map(each => ({
        imageUrl: each.image_url,
        id: each.id,
      }))
      const fetchedData = await response.json()
      const updatedData = fetchedData.restaurants.map(each => ({
        userRating: this.getRating(each.user_rating),
        name: each.name,
        costForTwo: each.cost_for_two,
        cuisine: each.cuisine,
        imageUrl: each.image_url,
        menuType: each.menu_type,
        id: each.id,
        location: each.location,
      }))
      this.setState({
        restaurantList: updatedData,
        offersList: updatedOffersData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderRestaurantItems = () => {
    const {restaurantList} = this.state
    return (
      <div className="restaurants-container">
        <ul className="unordered-restaurants-con">
          {restaurantList.map(each => (
            <RestaurantItems eachHotel={each} key={each.id} />
          ))}
        </ul>
      </div>
    )
  }

  changeSortby = event => {
    this.setState(
      {activeOptionId: event.target.value},
      this.getPopularRestaurants,
    )
  }

  decreaseCount = () => {
    const {pageCount, limitVal} = this.state
    if (pageCount > 1) {
      const offsetValue = (pageCount - 1) * limitVal
      this.setState(
        prevState => ({
          pageCount: prevState.pageCount - 1,
          offsetVal: offsetValue,
        }),
        this.getPopularRestaurants,
      )
    }
  }

  increaseCount = () => {
    const {pageCount, limitVal} = this.state
    if (pageCount < 20) {
      const offsetValue = (pageCount - 1) * limitVal
      this.setState(
        prevState => ({
          pageCount: prevState.pageCount + 1,
          offsetVal: offsetValue,
        }),
        this.getPopularRestaurants,
      )
    }
  }

  renderLoadingView = () => (
    <div
      className="offer-images-loader-container"
      testid="restaurants-list-loader"
    >
      <Loader type="Oval" color="#f7931e" height="50" width="50" />
    </div>
  )

  renderAllRestaurants = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderRestaurantItems()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {apiStatus, activeOptionId, pageCount, offersList} = this.state

    return (
      <>
        <NavHeader />
        <div className="home-container" testid="restaurant-item">
          <ReactSlick apiStatus={apiStatus} offersList={offersList} />
          <div className="home-content-con">
            <div className="content">
              <h1 className="home-main-head">Popular Restaurants</h1>
              <div className="filter-container">
                <p className="home-para">
                  Select Your favourite restaurant special dish and make your
                  day happy...
                </p>
                <div className="by-container">
                  <div className="sort-by-container">
                    <BsFilterRight className="sort-by-icon" />
                    <p className="sort-by">Sort by</p>
                    <select
                      className="sort-by-select"
                      onChange={this.changeSortby}
                    >
                      {sortByOptions.map(each => (
                        <SortingOption
                          key={each.id}
                          sortbyOptions={each}
                          activeOptionId={activeOptionId}
                          changeSortby={this.changeSortby}
                        />
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr className="horizontal-line" />
          <div className="all-res-container" testid="restaurant-item">
            {this.renderAllRestaurants()}
          </div>
          <div className="pageCount-container">
            <button
              testid="pagination-left-button"
              className="limit-btn"
              type="button"
              onClick={this.decreaseCount}
            >
              <BsArrowLeftSquare className="back-word-icon" />
            </button>
            <div className="active-num-con">
              <p className="count-para" testid="active-page-number">
                {pageCount}
              </p>
              <p className="count-para-2">of 20</p>
            </div>
            <button
              testid="pagination-right-button"
              className="limit-btn"
              type="button"
              onClick={this.increaseCount}
            >
              <BsArrowRightSquare className="back-word-icon" />
            </button>
          </div>
        </div>
        <Footer />
      </>
    )
  }
}

export default Home
