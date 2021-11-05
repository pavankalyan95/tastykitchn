import {Component} from 'react'

import Cookies from 'js-cookie'

import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
    showSubmitError: false,
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  renderPasswordField = () => {
    const {password} = this.state
    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="password-input-field"
          value={password}
          onChange={this.onChangePassword}
          placeholder="PASSWORD"
        />
      </>
    )
  }

  renderUsernameField = () => {
    const {username} = this.state
    return (
      <>
        <label className="input-label" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          className="username-input-field"
          value={username}
          onChange={this.onChangeUsername}
          placeholder="USERNAME"
        />
      </>
    )
  }

  renderPasswordFieldForMobiles = () => {
    const {password} = this.state
    return (
      <>
        <label className="input-label" htmlFor="password-for-mobile">
          PASSWORD
        </label>
        <input
          type="password"
          id="password-for-mobile"
          className="password-input-field"
          value={password}
          onChange={this.onChangePassword}
          placeholder="PASSWORD"
        />
      </>
    )
  }

  renderUsernameFieldForMobiles = () => {
    const {username} = this.state
    return (
      <>
        <label className="input-label" htmlFor="username-for-mobile">
          USERNAME
        </label>
        <input
          type="text"
          id="username-for-mobile"
          className="username-input-field"
          value={username}
          onChange={this.onChangeUsername}
          placeholder="USERNAME"
        />
      </>
    )
  }

  render() {
    const {showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-form-container">
        <div className="sub-card">
          <img
            className="kitchen-cap"
            alt="website logo"
            src="https://res.cloudinary.com/dli8bxrdu/image/upload/v1633955483/Group_7420_aua7rj.png"
          />
          <h1 className="head">Tasty Kitchens</h1>
          <h1 className="login-head">Login</h1>
          <form className="form-container" onSubmit={this.submitForm}>
            <div className="input-container">{this.renderUsernameField()}</div>
            <div className="input-container">{this.renderPasswordField()}</div>
            {showSubmitError && <p className="error-message">{errorMsg}</p>}
            <button type="submit" className="login-button">
              Login
            </button>
          </form>
        </div>
        <img
          className="website-logo-for-desktop"
          src="https://res.cloudinary.com/dli8bxrdu/image/upload/v1635318934/Rectangle_1456_1_hlt8ge.png"
          alt="website login"
        />
        <div className="login-form-for-mobiles">
          <div className="mobile-view-img-con">
            <img
              className="mobile-view-img"
              src="https://res.cloudinary.com/dli8bxrdu/image/upload/v1635756564/Rectangle_1457_ssj1hy.png"
              alt="website login"
            />
          </div>
          <h1 className="login-head">Login</h1>
          <form className="form-container" onSubmit={this.submitForm}>
            <div className="input-container">
              {this.renderUsernameFieldForMobiles()}
            </div>
            <div className="input-container">
              {this.renderPasswordFieldForMobiles()}
            </div>
            {showSubmitError && <p className="error-message">{errorMsg}</p>}
            <button type="submit" className="login-button">
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default Login
