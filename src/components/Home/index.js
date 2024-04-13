import {Component} from 'react'
import {Link} from 'react-router-dom'

import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'
import Slider from 'react-slick'

import Header from '../Header'
import ContactUs from '../ContactUs'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import './index.css'

const settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
}

const updateResData = data => {
  const updateData = data.map(each => ({
    id: each.id,
    title: each.title,
    backdropPath: each.backdrop_path,
    posterPath: each.poster_path,
    overview: each.overview,
  }))
  return updateData
}

const treindingApiCon = {
  initial: 'initial',
  succuss: 'succuss',
  failure: 'failure',
  loading: 'loading',
}

const originalApiCon = {
  initial: 'initial',
  succuss: 'succuss',
  failure: 'failure',
  loading: 'loading',
}

class Home extends Component {
  state = {
    trending: [],
    original: [],
    treindingApi: treindingApiCon.initial,
    originalApi: originalApiCon.initial,
  }

  componentDidMount() {
    this.getTrendingData()
    this.getOriginalData()
  }

  getTrendingData = async () => {
    this.setState({
      treindingApi: treindingApiCon.loading,
    })
    const jwt = Cookies.get('jwt_token')
    // console.log(jwt)
    const opt = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
    }

    const trendingRes = await fetch(
      'https://apis.ccbp.in/movies-app/trending-movies',
      opt,
    )
    const trendingData = await trendingRes.json()
    // console.log(trendingData)
    if (trendingRes.ok === true) {
      const updateRes = updateResData(trendingData.results)
      this.setState({
        trending: updateRes,
        treindingApi: treindingApiCon.succuss,
      })
    } else {
      this.setState({treindingApi: treindingApiCon.failure})
    }
  }

  getOriginalData = async () => {
    this.setState({
      originalApi: originalApiCon.loading,
    })
    const jwt = Cookies.get('jwt_token')
    // console.log(jwt)
    const opt = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
    }

    const originalRes = await fetch(
      'https://apis.ccbp.in/movies-app/originals',
      opt,
    )
    const originalData = await originalRes.json()
    // console.log(originalData)
    if (originalRes.ok === true) {
      const updateRes = updateResData(originalData.results)
      this.setState({
        original: updateRes,
        originalApi: originalApiCon.succuss,
      })
    } else {
      this.setState({originalApi: originalApiCon.failure})
    }
  }

  succussComp = data => (
    <div>
      <Slider {...settings}>
        {data.map(eachItem => (
          <Link to={`/movies/${eachItem.id}`} key={eachItem.id}>
            <div className="img-card">
              <img src={eachItem.backdropPath} alt={eachItem.title} />
            </div>
          </Link>
        ))}
      </Slider>
    </div>
  )

  loadingComp = () => (
    <div className="loading" data-testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  failureComp = () => (
    <div className="failure">
      <img
        src="https://res.cloudinary.com/dwga2gxyd/image/upload/v1712572458/alert-triangle_dzsnhf.png"
        alt="failure view"
      />
      <p>Something went wrong. Please try again</p>
      <button type="button" onClick={this.getTrendingData}>
        Try Again
      </button>
    </div>
  )

  treindingRenderSwitch = (data, status) => {
    // const {status} = this.state
    switch (status) {
      case treindingApiCon.loading:
        return this.loadingComp()
      case treindingApiCon.succuss:
        return this.succussComp(data)
      case treindingApiCon.failure:
        return this.failureComp()
      default:
        return null
    }
  }

  succussOriginalComp = data => {
    // console.log(data)
    const random = data[Math.floor(Math.random() * data.length)]
    // console.log(random)
    return (
      <div
        className="wallpaper"
        style={{
          backgroundImage: `url(${random.backdropPath})`,
        }}
      >
        <Header page="home" />
        <div className="wallpaper-content">
          <h1>{random.title}</h1>
          <p>{random.overview}</p>
          <button type="button">Play</button>
        </div>
      </div>
    )
  }

  loadingOriginalComp = () => (
    <div>
      <Header page="home" />
      <div className="loader-container banner-loading" data-testid="loader">
        <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
      </div>
    </div>
  )

  failureOriginalComp = () => (
    <div>
      <Header page="home" />
      <div className="banner-fail">
        <img
          src="https://res.cloudinary.com/dwga2gxyd/image/upload/v1712572458/alert-triangle_dzsnhf.png"
          alt="failure view"
        />
        <p>Something went wrong. Please try again</p>
        <button type="button" onClick={this.getOriginalData}>
          Try Again
        </button>
      </div>
    </div>
  )

  orignalRenderSwitch = (data, status) => {
    // const {originalApi} = this.state
    switch (status) {
      case originalApiCon.loading:
        return this.loadingOriginalComp()
      case originalApiCon.succuss:
        return this.succussOriginalComp(data)
      case originalApiCon.failure:
        return this.failureOriginalComp()
      default:
        return null
    }
  }

  render() {
    const {original, trending, treindingApi, originalApi} = this.state
    return (
      <div className="home">
        {this.orignalRenderSwitch(original, originalApi)}
        <div className="home-card">
          <h1 className="home-head">Trending Now</h1>
          {this.treindingRenderSwitch(trending, treindingApi)}
          <h1 className="home-head">Originals</h1>
          {this.treindingRenderSwitch(original, originalApi)}
        </div>
        <div className="contact-us">
          <ContactUs />
        </div>
      </div>
    )
  }
}

export default Home
