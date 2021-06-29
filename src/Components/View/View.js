import React,{useContext} from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../Store/AuthContext'
import { PostContext } from '../../Store/PostContext'
import './View.css'

function View() {

  const {postDetails} = useContext(PostContext)
  const {user} = useContext(AuthContext)

  
    return (
        <div className="viewParentDiv">
      <div className="imageShowDiv">
        <br/><br/>
        <img
          src={postDetails.fields.url.stringValue}
          alt="product"
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>{postDetails.fields.name.stringValue} </p>
          <span>Price : &#x20B9;{postDetails.fields.price.stringValue}</span> <br/>
          <span>Color : {postDetails.fields.ram.stringValue}</span><br/>
          <span>Memory : {postDetails.fields.memory.stringValue}</span><br/>
          <span>Brand : {postDetails.fields.brand.stringValue}</span><br/>
          <span>Category : {postDetails.fields.category.stringValue}</span><br/>
          <span>Description :- {postDetails.fields.description.stringValue}</span><br/>

        </div>
        {user ?
        <Link to="/">
        <button className="btn btn-success cartBtn">Add to cart</button>
        </Link> :
        <Link to="/login">
        <button className="btn btn-primary cartBtn">Please login to place the order</button>
        </Link>}
      </div>
    </div>
    )
}

export default View
