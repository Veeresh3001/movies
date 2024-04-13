import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'

import Header from '../Header'
import ContactUs from '../ContactUs'

import './index.css'

const apiStatusConst = {
  initial: 'initial',
  loading: 'loading',
  succuss: 'succuss',
  failure: 'failure',
}

class Popular extends Component {
  state = {
    popularList: [],
    apiStatus: apiStatusConst.initial,
  }

  componentDidMount() {
    this.getPopularList()
  }

  getDataSuccuss = data => {
    // console.log(data)
    const updateData = data.map(each => ({
      id: each.id,
      title: each.title,
      backdropPath: each.backdrop_path,
      posterPath: each.poster_path,
    }))
    this.setState({popularList: updateData, apiStatus: apiStatusConst.succuss})
  }

  getPopularList = async () => {
    this.setState({apiStatus: apiStatusConst.loading})
    const jwt = Cookies.get('jwt_token')
    const opt = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
    }
    const popularRes = await fetch(
      'https://apis.ccbp.in/movies-app/popular-movies',
      opt,
    )
    const popularData = await popularRes.json()
    // console.log(popularData)
    if (popularRes.ok === true) {
      this.getDataSuccuss(popularData.results)
    } else {
      this.setState({apiStatus: apiStatusConst.failure})
    }
  }

  succussComp = () => {
    const {popularList} = this.state
    return (
      <div className="popular-list-card">
        <ul className="popular-list">
          {popularList.map(each => (
            <Link to={`/movies/${each.id}`} key={each.id}>
              <li>
                <img src={each.backdropPath} alt={each.title} />
              </li>
            </Link>
          ))}
        </ul>
      </div>
    )
  }

  loadingComp = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  failureComp = () => (
    <div className="loader-container">
      <img
        className="failure-img"
        src="https://res.cloudinary.com/dwga2gxyd/image/upload/v1712572456/Background-Completeerror_bbjc06.png"
        alt="failure view"
      />
      <p>Something went wrong. Please try again</p>
      <button type="button" onClick={this.getPopularList}>
        Try Again
      </button>
    </div>
  )

  switchRender = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConst.loading:
        return this.loadingComp()
      case apiStatusConst.failure:
        return this.failureComp()
      case apiStatusConst.succuss:
        return this.succussComp()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="popular">
        <Header page="popular" />
        <div>{this.switchRender()}</div>
        <ContactUs />
      </div>
    )
  }
}

export default Popular
