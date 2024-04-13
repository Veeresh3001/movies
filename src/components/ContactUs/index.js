import {FaYoutube, FaGoogle, FaInstagram, FaTwitter} from 'react-icons/fa'

import './index.css'

const ContactUs = () => (
  <div className="contact-card">
    <div>
      <FaGoogle size={20} color="#FFFFFF" className="contact-icon" />
      <FaTwitter size={20} color="#FFFFFF" className="contact-icon" />
      <FaInstagram size={20} color="#FFFFFF" className="contact-icon" />
      <FaYoutube size={20} color="#FFFFFF" className="contact-icon" />
    </div>
    <p>Contact us</p>
  </div>
)

export default ContactUs
