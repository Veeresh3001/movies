import Cookies from 'js-cookie'

import Header from '../Header'
import ContactUs from '../ContactUs'

import './index.css'

const Account = props => {
  const logoutBtn = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    // const t = Cookies.get('jwt-token')
    // console.log(t)
    history.replace('/login')
  }
  return (
    <div className="accountComp">
      <Header page="account" />
      <div className="account">
        <h1 className="account-head">Account</h1>
        <hr className="hr-line" />
        <div className="user">
          <p className="acc-heading">Member ship</p>
          <div>
            <p className="user-det">rahul@gmail.com</p>
            <p className="user-det">Password : ************</p>
          </div>
        </div>
        <hr className="hr-line" />
        <div className="user">
          <p className="acc-heading">Plan details </p>
          <p className="user-det">Premium </p>
          <p className="hd">Ultra HD</p>
        </div>
        <hr className="hr-line" />
        <div className="logout">
          <button className="logout-btn" onClick={logoutBtn} type="button">
            Logout
          </button>
        </div>
      </div>
      <ContactUs />
    </div>
  )
}

export default Account
