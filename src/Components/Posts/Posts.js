import React from 'react'
import './Posts.css'

function Posts() {
    return (
        <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Product Menu</span>
          
        </div>
        <div className="cards">
          <div className="row">
            <div className="col-md-3">
          <div
            className="card"
          >
            
            <div className="image">
              <img  src="https://imgk.timesnownews.com/story/FZX_lead.png" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>Tue May 04 2021</span>
            </div>
          </div>
          
          </div>
          
          </div>
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          <div className="card">
            
            <div className="image">
              <img src="https://imgk.timesnownews.com/story/FZX_lead.png?tr=w-1200,h-900" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
}

export default Posts
