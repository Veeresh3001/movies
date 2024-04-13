import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import SearchItem from '../SearchItem'
import './index.css'

const searchComp = true

const updateResData = data => {
  const updateData = data.map(each => ({
    id: each.id,
    title: each.title,
    backdropPath: each.backdrop_path,
    posterPath: each.poster_path,
  }))
  return updateData
}

const searchApiCon = {
  initial: 'initial',
  succuss: 'succuss',
  failure: 'failure',
  loading: 'loading',
}

class Search extends Component {
  state = {
    searchResult: [],
    searchVal: '',
    apiStatus: searchApiCon.initial,
  }

  getSerachData = async () => {
    this.setState({apiStatus: searchApiCon.loading})
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
    const {searchVal} = this.state

    const url = `https://apis.ccbp.in/movies-app/movies-search?search=${searchVal}`

    const searchRes = await fetch(url, opt)
    const searchData = await searchRes.json()
    if (searchRes.ok === true) {
      const updateData = updateResData(searchData.results)
      console.log(updateData)
      this.setState({searchResult: updateData, apiStatus: searchApiCon.succuss})
    } else {
      this.setState({apiStatus: searchApiCon.failure})
    }
  }

  setSearchVal = value => {
    this.setState({searchVal: value})
  }

  enterSerachValue = () => {
    const {searchVal} = this.state
    if (searchVal !== '') {
      this.getSerachData()
    }
  }

  loadingView = () => (
    <div className="search-loading" data-testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  failureView = () => (
    <div className="loader-container">
      <img
        className="failure-img"
        src="https://res.cloudinary.com/dwga2gxyd/image/upload/v1712572456/Background-Completeerror_bbjc06.png"
        alt="failure view"
      />
      <p>Something went wrong. Please try again</p>
      <button type="button" onClick={this.getSerachData}>
        Try Again
      </button>
    </div>
  )

  succussView = () => {
    const {searchResult, searchVal} = this.state
    if (searchResult.length > 0) {
      return (
        <div className="search-movies">
          <ul>
            {searchResult.map(each => (
              <Link to={`/movies/${each.id}`} key={each.id}>
                <SearchItem data={each} />
              </Link>
            ))}
          </ul>
        </div>
      )
    }
    return (
      <div className="no-movies">
        <img
          src="https://res.cloudinary.com/dwga2gxyd/image/upload/v1712572443/Groupno-results_xs4a66.png"
          alt="no movies"
        />
        <p>Your search for {searchVal} did not find any matches.</p>
      </div>
    )
  }

  switchRenderComp = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case searchApiCon.succuss:
        return this.succussView()
      case searchApiCon.failure:
        return this.failureView()
      case searchApiCon.loading:
        return this.loadingView()
      default:
        return null
    }
  }

  render() {
    const {searchVal} = this.state
    return (
      <div className="searchComp">
        <Header
          searchComp={searchComp}
          setSearchVal={this.setSearchVal}
          searchVal={searchVal}
          enterSerach={this.enterSerachValue}
        />
        {this.switchRenderComp()}
      </div>
    )
  }
}

export default Search
