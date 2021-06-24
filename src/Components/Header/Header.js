import React from 'react';
import './Header.css';
import Logo from '../../Assets/DigitalKartLogo.jpeg'

function Header() {


  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div>
          <img src={Logo} style={{height:'90px'}} alt="DigitalKart-Logo"/>
        </div>
        
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Search brandes (Eg: Apple, Samsung etc..)"
            />
          </div>
          <div className="searchAction">
            <span className="searchIcon">&#128269;</span>
          </div>
        </div>
        
        <div className="loginPage">
          <span>Signup/Login</span>
          <hr />
        </div>

        <div className="sellMenu">
          
        <button class="btn btn-success">Order</button>
          
        </div>
      </div>
    </div>
  );
}

export default Header;