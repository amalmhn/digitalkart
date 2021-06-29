import React, { useContext } from 'react'
import './Banner.css'
import BannerImage from '../../Assets/DigitalKartBanner.jpeg'
import { AuthContext } from '../../Store/AuthContext'

function Banner() {

  const {user} = useContext(AuthContext)
  

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
            {user && user.uid==="SjE0GeIdoUbvMpTV9PE5ugHqyaH3" ? <button className="btn btn-primary">Admin Page</button> : ""}
            
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
