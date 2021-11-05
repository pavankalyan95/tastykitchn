import {Link} from 'react-router-dom'
import NavHeader from '../NavHeader'
import './index.css'

const NotFound = () => (
  <>
    <NavHeader />
    <div className="not-found-container">
      <img
        src="https://res.cloudinary.com/dli8bxrdu/image/upload/v1635583346/Layer_1_requn8.png"
        alt="not found"
        className="not-found-img"
      />
      <h1 className="page-not-found-head">Page Not Found</h1>
      <p className="page-not-found-para">
        we are sorry, the page you requested could not be found. Please go back
        to the homepage
      </p>
      <Link to="/" className="nav">
        <button className="not-found-page-btn" type="button">
          Home Page
        </button>
      </Link>
    </div>
  </>
)

export default NotFound
