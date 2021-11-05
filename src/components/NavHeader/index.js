import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import {AiFillCloseCircle, AiOutlineMenu} from 'react-icons/ai'

import './index.css'

class NavHeader extends Component {
  state = {
    isNavOpen: false,
  }

  onClickLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  closeTheNav = () => {
    this.setState({isNavOpen: false})
  }

  onClickOnMenu = () => {
    this.setState({isNavOpen: true})
  }

  render() {
    const {isNavOpen} = this.state
    const {history, resId} = this.props
    let stylingHome = ''
    let stylingCart = ''
    if (history.location.pathname === '/cart') {
      stylingCart = 'cart-bg-change'
    } else if (history.location.pathname === `/restaurant/${resId}`) {
      stylingHome = 'home-bg-change'
    } else if (history.location.pathname === '/') {
      stylingHome = 'home-bg-change'
    } else {
      stylingHome = ''
      stylingCart = ''
    }
    return (
      <>
        <nav className="nav-header">
          <div className="nav-sub-con">
            <div className="nav-barr-logo-container">
              <Link to="/" className="nav-link">
                <img
                  className="website-logo-l"
                  src="https://res.cloudinary.com/dli8bxrdu/image/upload/v1633955483/Group_7420_aua7rj.png"
                  alt="website logo"
                />
              </Link>
              <h1 className="head">Tasty Kitchens</h1>
            </div>
            <div className="content-nav">
              <ul className="nav-menu">
                <li className="nav-menu-item">
                  <Link to="/" className={`nav-link ${stylingHome}`}>
                    Home
                  </Link>
                </li>
                <li className="nav-menu-item">
                  <Link to="/cart" className={`nav-link ${stylingCart}`}>
                    Cart
                  </Link>
                </li>
              </ul>
              <button
                type="button"
                className="logout-desktop-btn"
                onClick={this.onClickLogout}
              >
                Logout
              </button>
            </div>
          </div>
          <div className="nav-view-for-mobile">
            <div className="nav-head-logo-container">
              <Link to="/" className="nav-link">
                <img
                  className="website-logo-for-small"
                  src="https://res.cloudinary.com/dli8bxrdu/image/upload/v1633955483/Group_7420_aua7rj.png"
                  alt="website logo"
                />
              </Link>
              <h1 className="head">Tasty Kitchens</h1>
            </div>
            <button
              className="menu-btn"
              type="button"
              onClick={this.onClickOnMenu}
            >
              <AiOutlineMenu />
            </button>
          </div>
        </nav>
        {isNavOpen && (
          <div className="nav-con-for-small-devices">
            <div className="content-nav-for-mobile">
              <ul className="nav-menu">
                <li className="nav-menu-item">
                  <Link to="/" className={`nav-link ${stylingHome}`}>
                    Home
                  </Link>
                </li>
                <li className="nav-menu-item">
                  <Link to="/cart" className={`nav-link ${stylingCart}`}>
                    Cart
                  </Link>
                </li>
              </ul>
              <button
                type="button"
                className="logout-desktop-btn"
                onClick={this.onClickLogout}
              >
                Logout
              </button>
            </div>
            <button
              className="close-btn"
              type="button"
              onClick={this.closeTheNav}
            >
              <AiFillCloseCircle />
            </button>
          </div>
        )}
      </>
    )
  }
}

export default withRouter(NavHeader)
