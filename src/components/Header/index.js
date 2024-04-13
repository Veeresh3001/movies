import {useState} from 'react'

import {withRouter, Link} from 'react-router-dom'

import {HiOutlineSearch} from 'react-icons/hi'
import {FiMenu} from 'react-icons/fi'
import {IoIosCloseCircle} from 'react-icons/io'

import './index.css'

const Header = props => {
  const {searchComp, searchVal, setSearchVal, enterSerach, page} = props
  const [showNav, setShowNav] = useState(false)

  const enterSerachValue = () => {
    enterSerach()
  }

  const onChangeSearchVal = event => {
    setSearchVal(event.target.value)
  }

  const enterKeybtn = event => {
    if (event.key === 'Enter') {
      enterSerach()
    }
  }

  const homePage = page === 'home' ? 'activeNav' : 'nav-link'

  const popularPage = page === 'popular' ? 'activeNav' : 'nav-link'

  const accountPage = page === 'account' ? 'activeNav' : 'nav-link'

  return (
    <div className="header">
      <div className="header-card">
        <div className="nav-card">
          <Link to="/" className="link">
            <img
              className="header-logo"
              src="https://res.cloudinary.com/dyx9u0bif/image/upload/v1657426908/lg-devices-logo_rpfa68.png"
              alt="website logo"
            />
          </Link>
          <ul className="nav-items">
            <Link className="link" to="/">
              <li className={homePage}>Home</li>
            </Link>
            <Link className="link" to="/popular">
              <li className={popularPage}>Popular</li>
            </Link>
          </ul>
        </div>
        <div className="avatar-card">
          {searchComp ? (
            <div className="search-card">
              <input
                type="search"
                value={searchVal}
                onChange={onChangeSearchVal}
                onKeyDown={enterKeybtn}
                placeholder="search movie name"
              />
              <button
                onClick={enterSerachValue}
                type="button"
                aria-label="search"
                className="search-btn"
                data-testid="searchButton"
              >
                <HiOutlineSearch
                  className="seach-icon"
                  size={20}
                  color="#FFFFFF"
                />
              </button>
            </div>
          ) : (
            <Link to="/search">
              <button
                type="button"
                aria-label="search"
                className="search-btn"
                data-testid="searchButton"
              >
                <HiOutlineSearch
                  className="seach-icon"
                  size={20}
                  color="#FFFFFF"
                />
              </button>
            </Link>
          )}
          <FiMenu
            onClick={() => setShowNav(prev => !prev)}
            className="menu-icon"
            size={30}
            color="white"
          />
          <Link to="/account" className="link avatar">
            <img
              src="https://res.cloudinary.com/dyx9u0bif/image/upload/v1657426927/account-avatar_irmhck.png"
              alt="profile"
            />
          </Link>
        </div>
      </div>
      {showNav && (
        <div className="mobile-nav-card">
          <ul className="mobile-nav-items">
            <Link className="link" to="/">
              <li className={homePage}>Home</li>
            </Link>
            <Link className="link" to="/popular">
              <li className={popularPage}>Popular</li>
            </Link>
            <Link className="link" to="/account">
              <li className={accountPage}>Account</li>
            </Link>
          </ul>
          <IoIosCloseCircle
            onClick={() => setShowNav(prev => !prev)}
            size={30}
            color="white"
          />
        </div>
      )}
    </div>
  )
}

export default withRouter(Header)
