import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <img
      src="https://i.postimg.cc/K4XsrjWb/Group-7484.png"
      alt="failure view"
    />
    <h1>Page Not Found</h1>
    <p>
      we are sorry, the page you requested could not be found,Please go back to
      the homepage.
    </p>
    <Link to="/">
      <button type="button">Go Back to Home</button>
    </Link>
  </div>
)

export default NotFound
