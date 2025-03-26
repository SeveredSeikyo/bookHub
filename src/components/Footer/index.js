import {FaGoogle, FaInstagram, FaTwitter, FaYoutube} from 'react-icons/fa'
import './index.css'

const Footer = () => {
  console.log('Footer')
  return (
    <footer className="footer-div">
      <div>
        <div className="footer-icons-div">
          <FaGoogle fontSize={18} />
          <FaTwitter fontSize={18} />
          <FaInstagram fontSize={18} />
          <FaYoutube fontSize={18} />
        </div>
        <p>Contact Us</p>
      </div>
    </footer>
  )
}

export default Footer
