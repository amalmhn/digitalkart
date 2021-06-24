import React from 'react'
import './Footer.css'

function Footer() {
    return (
        <div className="footerParentDiv">
      <div className="content">
        <div>
          <div className="heading">
            <p>POPULAR LOCATIONS</p>
          </div>
          <div className="list">
            <ul>
              <li>Kochi</li>
              <li>Trivandrum</li>
              <li>Chennai</li>
              <li>Mumbai</li>
            </ul>
          </div>
        </div>
        <div>
          <div className="heading">
            <p>ABOUT US</p>
          </div>
          <div className="list">
            <ul>
              <li>About DigitalKart Group</li>
              <li>Careers</li>
              <li>Contact Us</li>
              <li>DigitalKart</li>
            </ul>
          </div>
        </div>
        <div>
          <div className="heading">
            <p>DigitalKart</p>
          </div>
          <div className="list">
            <ul>
              <li>Help</li>
              <li>Sitemap</li>
              <li>Legal & Privacy information</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer">
        
        <p>Free Classifieds in India. © DigitalKart</p>
      </div>
    </div>
    )
}

export default Footer
