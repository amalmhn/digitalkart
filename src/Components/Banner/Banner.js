import React, { useContext } from 'react'
import './Banner.css'
import BannerImage from '../../Assets/DigitalKartBanner.jpeg'
import { AuthContext } from '../../Store/AuthContext'
import { Link, useHistory } from 'react-router-dom'

function Banner() {

  const {user} = useContext(AuthContext)
  const history = useHistory()
  

    return (
        
        <div className="bannerParentDiv">
      <div className="bannerChildDiv">
        <div className="menuBar">
          
          <div className="otherQuickOptions">
            <br/><br/>
            <span> <strong>Categories :</strong>  </span>
            <Link to="/smartphones" className="bannerLink">
            <span>Smartphones</span>
            </Link>
            <Link to="/laptops" className="bannerLink">
            <span>Laptops</span>
            </Link>
            <Link to="/smartwatches" className="bannerLink">
            <span>Smartwatches</span>
            </Link>
            {user && user.uid==="SjE0GeIdoUbvMpTV9PE5ugHqyaH3" ? <button onClick={()=>{
              history.push("/create")
            }} className="btn btn-primary adminBtn">Admin Page</button> : ""}
            
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
