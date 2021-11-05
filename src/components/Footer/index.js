import {
  FaFacebookSquare,
  FaTwitter,
  FaInstagram,
  FaPinterestSquare,
} from 'react-icons/fa'

import './index.css'

const Footer = () => (
  <div className="footer-container">
    <div className="for-small-screen">
      <img
        className="footer-img"
        src="https://res.cloudinary.com/dli8bxrdu/image/upload/v1635656574/Group_7420_1_ziaxz3.png"
        alt="website-footer-logo"
      />
      <h1 className="footer-small-head">Tasty Kitchen</h1>
    </div>
    <h1 className="footer-head">Tasty Kitchen</h1>
    <p className="footer-para">
      The only thing we are serious about is food.
      <br /> Contact us on
    </p>
    <div className="social-media-icons">
      <FaPinterestSquare
        className="social-icon-p"
        testid="pintrest-social-icon"
      />
      <FaInstagram className="instagram" testid="instagram-social-icon" />
      <FaTwitter className="twitter" testid="twitter-social-icon" />
      <FaFacebookSquare className="face-book" testid="facebook-social-icon" />
    </div>
  </div>
)
export default Footer
