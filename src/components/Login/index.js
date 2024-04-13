import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    errMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  loginFailure = err => {
    this.setState({errMsg: err})
  }

  loginSuccuss = token => {
    // console.log(token)
    Cookies.set('jwt_token', token, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const loginUrl = 'https://apis.ccbp.in/login'
    const opt = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(loginUrl, opt)
    const data = await response.json()
    // console.log(data)
    if (response.ok === true) {
      this.loginSuccuss(data.jwt_token)
    } else {
      this.loginFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, errMsg} = this.state
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-page">
        <img
          className="login-logo"
          src="https://res.cloudinary.com/dyx9u0bif/image/upload/v1657426908/lg-devices-logo_rpfa68.png"
          alt="login website logo"
        />
        <div className="form-card">
          <form className="form" onSubmit={this.onSubmitForm}>
            <h1 className="login-head">Login</h1>
            <div>
              <label htmlFor="username">USERNAME</label>
              <input
                id="username"
                type="text"
                className="input"
                placeholder="Rahul"
                value={username}
                onChange={this.onChangeUsername}
              />
            </div>
            <div>
              <label htmlFor="password">PASSWORD</label>
              <input
                type="password"
                id="password"
                className="input"
                placeholder="password"
                value={password}
                onChange={this.onChangePassword}
              />
              {errMsg !== '' && <p className="login-error">{errMsg}</p>}
            </div>
            <button type="submit" className="login-btn">
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default Login
