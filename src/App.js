import {Route, Switch, Redirect} from 'react-router-dom'

import Home from './components/Home'
import Login from './components/Login'
import Popular from './components/Popular'
import NotFound from './components/NotFound'
import Account from './components/Account'
import Search from './components/Search'
import MovieItemDetails from './components/MovieItemDetails'
import UserProtect from './components/UserProtect'

import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <UserProtect exact path="/" component={Home} />
    <UserProtect exact path="/popular" component={Popular} />
    <UserProtect exact path="/movies/:id" component={MovieItemDetails} />
    <UserProtect exact path="/account" component={Account} />
    <UserProtect exact path="/search" component={Search} />
    <Route exact path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
