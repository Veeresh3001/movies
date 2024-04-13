import {Link} from 'react-router-dom'

import './index.css'

const NotFound = () => (
  <div className="not-found">
    <div>
      <h1>Lost Your Way</h1>
      <p>
        we are sorry, the page you requested could not be found Please go back
        to the homepage.
      </p>
      <Link to="/">
        <button className="not-btn" type="button">
          Go to Home
        </button>
      </Link>
    </div>
  </div>
)

export default NotFound
