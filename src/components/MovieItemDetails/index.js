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

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

class MovieItemDetails extends Component {
  state = {
    movieDetails: {},
    apiStatus: apiStatusConst.initial,
  }

  componentDidMount() {
    this.getMovieDetails()
  }

  SuccussFetching = data => {
    const updatedData = {
      id: data.id,
      backdropPath: data.backdrop_path,
      budget: data.budget,
      adult: data.adult,
      genres: data.genres,
      overview: data.overview,
      releaseDate: data.release_date,
      runtime: data.runtime,
      moreMovies: data.similar_movies,
      spokenLanguages: data.spoken_languages,
      title: data.title,
      voteAverage: data.vote_average,
      voteCount: data.vote_count,
    }
    this.setState({
      movieDetails: updatedData,
      apiStatus: apiStatusConst.succuss,
    })
  }

  getMovieDetails = async () => {
    this.setState({apiStatus: apiStatusConst.loading})
    const jwt = Cookies.get('jwt_token')
    // console.log(this.props)
    const {match} = this.props
    const {params} = match
    const {id} = params
    // console.log(id)
    const url = `https://apis.ccbp.in/movies-app/movies/${id}`

    const opt = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
    }
    const movieDetailsRes = await fetch(url, opt)
    const movieDetailsData = await movieDetailsRes.json()
    // console.log(movieDetailsData)
    if (movieDetailsRes.ok === true) {
      this.SuccussFetching(movieDetailsData.movie_details)
    } else {
      this.setState({apiStatus: apiStatusConst.failure})
    }
  }

  succussComp = () => {
    const {movieDetails} = this.state
    const date = new Date(movieDetails.releaseDate)
    const hours = Math.floor(movieDetails.runtime / 60)
    const minutes = movieDetails.runtime % 60
    const genresList = movieDetails.genres
    const languages = movieDetails.spokenLanguages
    const {moreMovies} = movieDetails
    // console.log(genresList)
    return (
      <>
        <div
          style={{
            backgroundImage: `url(${movieDetails.backdropPath})`,
          }}
          className="wallpaper"
        >
          <Header />
          <div className="movie-details">
            <h1 className="movie-details-head">{movieDetails.title}</h1>
            <div className="time-card">
              <p className="timing">{`${hours}h ${minutes}m`}</p>
              <p className="adult">{movieDetails.adult ? 'A' : 'U/A'}</p>
              <p className="year">{date.getFullYear()}</p>
            </div>
            <p className="overview">{movieDetails.overview}</p>
            <button className="movie-details-button" type="button">
              Play
            </button>
          </div>
        </div>
        <div className="details-card">
          <div className="genre-card">
            <h1 className="genre-head">Genres</h1>
            <ul className="ul">
              {genresList.map(eachGenre => (
                <li className="li" key={eachGenre.name}>
                  <p>{eachGenre.name}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="genre-card">
            <h1 className="genre-head">Audio Available</h1>
            <ul className="ul">
              {languages.map(eachGenre => (
                <li className="li" key={eachGenre.english_name}>
                  <p>{eachGenre.english_name}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="genre-card">
              <h1 className="genre-head">Rating Count</h1>
              <p className="li">{movieDetails.voteCount}</p>
            </div>
            <div className="genre-card">
              <h1 className="genre-head">Rating Average</h1>
              <p className="li">{movieDetails.voteAverage}</p>
            </div>
          </div>
          <div>
            <div className="genre-card">
              <h1 className="genre-head">Budget</h1>
              <p className="li">{movieDetails.budget}</p>
            </div>
            <div className="genre-card">
              <h1 className="genre-head">Release Date</h1>
              <p className="li">{`${date.getDate()}th ${
                months[date.getMonth()]
              } ${date.getFullYear()}`}</p>
            </div>
          </div>
        </div>
        <div className="more-videos">
          <h1>More like this</h1>
          <ul className="more-videos-list">
            {moreMovies.map(each => (
              <Link to={`/movies/${each.id}`} key={each.id}>
                <li>
                  <img src={each.backdrop_path} alt={each.title} />
                </li>
              </Link>
            ))}
          </ul>
        </div>
        <ContactUs />
      </>
    )
  }

  loadingComp = () => (
    <>
      <Header />
      <div className="loader-container" data-testid="loader">
        <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
      </div>
    </>
  )

  failureComp = () => (
    <>
      <Header />
      <div className="loader-container">
        <img
          className="failure-img"
          src="https://res.cloudinary.com/dwga2gxyd/image/upload/v1712572456/Background-Completeerror_bbjc06.png"
          alt="failure view"
        />
        <p>Something went wrong. Please try again</p>
        <button type="button" onClick={this.getMovieDetails}>
          Try Again
        </button>
      </div>
    </>
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
    return <div className="details">{this.switchRender()}</div>
  }
}

export default MovieItemDetails
