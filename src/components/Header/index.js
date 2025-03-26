import {useState} from 'react'
import Cookies from 'js-cookie'
import {Link, withRouter} from 'react-router-dom'
import {FaBars, FaTimesCircle} from 'react-icons/fa'
import './index.css'

const Header = props => {
  const [showMenu, setShowMenu] = useState(false)
  const {history, match} = props
  console.log(match.path)
  const onLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  const onClickShowMenu = () => {
    setShowMenu(prev => !prev)
  }
  const closeMenu = () => {
    setShowMenu(false)
  }
  return (
    <header>
      <nav className="nav-desktop">
        <div className="nav-container">
          <img
            src="https://i.postimg.cc/DyRfJMWy/Group-7731.png"
            alt="website logo"
          />
          <ul className="nav-ul-div">
            <Link to="/" className="nav-link">
              <li className={match.path === '/' ? 'selected' : ''}>Home</li>
            </Link>
            <Link to="/shelf" className="nav-link">
              <li className={match.path === '/shelf' ? 'selected' : ''}>
                BookShelves
              </li>
            </Link>
            <button type="button" onClick={onLogout}>
              Logout
            </button>
          </ul>
        </div>
      </nav>

      <nav className="nav-mobile">
        <div className="nav-container">
          <img
            src="https://i.postimg.cc/DyRfJMWy/Group-7731.png"
            alt="website logo"
          />
          <button type="button" onClick={onClickShowMenu}>
            <FaBars />
          </button>
        </div>
        {showMenu ? (
          <div>
            <ul className="nav-ul-div">
              <Link to="/" className="nav-link">
                <li className={match.path === '/' ? 'selected' : ''}>Home</li>
              </Link>
              <Link to="/shelf" className="nav-link">
                <li className={match.path === '/shelf' ? 'selected' : ''}>
                  BookShelves
                </li>
              </Link>
              <button type="button" onClick={onLogout}>
                Logout
              </button>
              <FaTimesCircle onClick={closeMenu} />
            </ul>
          </div>
        ) : null}
      </nav>
    </header>
  )
}

export default withRouter(Header)
