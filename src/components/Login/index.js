import {useState} from 'react'
import {withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Login = props => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const {history} = props
  const changeUsername = event => {
    setUsername(event.target.value)
  }
  const changePassword = event => {
    setPassword(event.target.value)
  }
  const handleFormSubmit = event => {
    event.preventDefault()
    const url = 'https://apis.ccbp.in/login'
    const userDetails = {
      username,
      password,
    }
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    fetch(url, options)
      .then(response => response.json())
      .then(data => {
        if (data.error_msg) {
          setErrorMsg(data.error_msg)
        } else {
          Cookies.set('jwt_token', data.jwt_token)
          history.replace('/')
        }
        console.log('Success:', data)
      })
  }
  return (
    // Desktop View
    <div className="login-desktop">
      <div className="login-img-desktop">
        <img
          src="https://i.postimg.cc/0QzHwcKP/e7efb0d3d71dcb5062f1e077527d7f5d.jpg"
          alt="website login"
        />
      </div>
      <div className="login-form-div">
        <form className="login-form" onSubmit={handleFormSubmit}>
          <img
            src="https://i.postimg.cc/DyRfJMWy/Group-7731.png"
            alt="login website logo"
          />
          <div className="login-form-input-div">
            <label htmlFor="username">Username*</label>
            <input
              type="username"
              id="username"
              name="username"
              placeholder="Username"
              value={username}
              onChange={event => changeUsername(event)}
            />
            <label htmlFor="password">Password*</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={event => changePassword(event)}
            />
            <p className="error-msg">{errorMsg}</p>
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default withRouter(Login)
