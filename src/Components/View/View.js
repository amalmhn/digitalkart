import React from 'react'
import './View.css'

function View() {
    return (
        <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src="https://imgk.timesnownews.com/story/FZX_lead.png?tr=w-1200,h-900"
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; 250000 </p>
          <span>YAMAHA R15V3</span>
          <p>Two Wheeler</p>
          <span>Tue May 04 2021</span>
        </div>
        <div className="contactDetails">
          <p>Seller details</p>
          <p>No name</p>
          <p>1234567890</p>
        </div>
      </div>
    </div>
    )
}

export default View
