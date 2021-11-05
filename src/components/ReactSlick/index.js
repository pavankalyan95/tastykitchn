import Slider from 'react-slick'
import Loader from 'react-loader-spinner'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import './index.css'

const ReactSlick = props => {
  const {offersList, apiStatus} = props
  const renderLoadingView = () => (
    <div className="images-loader-container" testid="restaurants-offers-loader">
      <Loader type="Oval" color="#f7931e" height="50" width="50" />
    </div>
  )
  const renderScrollingImages = () => {
    const settings = {
      dots: true,
      autoplay: true,
    }
    return (
      <div>
        <Slider {...settings}>
          {offersList.map(each => (
            <div key={each.id}>
              <img className="cursole-fig" src={each.imageUrl} alt="offer" />
            </div>
          ))}
        </Slider>
      </div>
    )
  }
  return (
    <>
      {apiStatus === 'IN_PROGRESS'
        ? renderLoadingView()
        : renderScrollingImages()}
    </>
  )
}

export default ReactSlick
