import React from 'react'
import './Banner.css'
import BannerImage from '../../Assets/DigitalKartBanner.jpeg'

function Banner() {
    return (
        
        <div className="bannerParentDiv">
      <div className="bannerChildDiv">
        <div className="menuBar">
          
          <div className="otherQuickOptions">
            <br/><br/>
            <span> <strong>Categories :</strong>  </span>
            <span>Smartphones</span>
            <span>Laptops</span>
            <span>Smartwatches</span>
            
          </div>
        </div>
        <div className="banner">
          <img
            src={BannerImage}
            alt="DigitalKart-Banner"
          />
        </div>
      </div>
      
    </div>
    )
}

export default Banner
