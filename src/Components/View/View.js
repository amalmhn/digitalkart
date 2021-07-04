import React,{useContext} from 'react'
import { Link, useHistory } from 'react-router-dom'
import { AuthContext } from '../../Store/AuthContext'
import { CartContext } from '../../Store/CartContext'
import { PostContext } from '../../Store/PostContext'
import './View.css'

function View() {


  const {postDetails} = useContext(PostContext)
  const {user} = useContext(AuthContext)
  const {cartItems,setCartItems} = useContext(CartContext)
  const history = useHistory()

  console.log(postDetails)

  const onAdd=(product)=>{
    const exist = cartItems.find(x=>x.id===product.id);
    if(exist){
      setCartItems(
        cartItems.map(itm=>
          itm.id === product.id ? {...exist, qty:exist.qty+1} : itm));
    }else{
      setCartItems([...cartItems,{...product,qty:1}])
    }
  }
  
    return (
      <div>
        {postDetails ? <div className="viewParentDiv">
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
        
        <button onClick={()=>{
          onAdd(postDetails)
          history.push("/")
        }} className="btn btn-success cartBtn">Add to cart</button>
         :
        <Link to="/login">
        <button className="btn btn-primary cartBtn">Please login to place the order</button>
        </Link>}
      </div>
    </div> : <div className="userSpanView">
            <br/><br/><br/>
            <span><strong>Please select a product to show the details</strong></span>
            <br/><br/>
            </div>}
    </div>
    )
}

export default View
