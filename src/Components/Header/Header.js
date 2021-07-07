import React, { useContext, useState } from 'react';
import './Header.css';
import Logo from '../../Assets/DigitalKartLogo.jpeg'
import { AuthContext } from '../../Store/AuthContext';
import { FirebaseContext } from '../../Store/FirebaseContext';
import { useHistory , Link } from 'react-router-dom';
import { CartContext } from '../../Store/CartContext';
import { SearchContext } from '../../Store/SearchContext';
import axios from 'axios';

function Header() {

  const {user} = useContext(AuthContext);
  const {firebase} = useContext(FirebaseContext)
  const {cartItems} = useContext(CartContext)
  const {setSearchItem} = useContext(SearchContext)

  const [search, setSearch] = useState("")

  const history = useHistory()

  const hanleSearch=(e)=>{
    e.preventDefault()

    axios.get("https://firestore.googleapis.com/v1/projects/digitalkart-1785a/databases/(default)/documents/products/").then((res)=>{
      const allSearch = res.data.documents.map((product)=>{
        return{
          ...product,id:product.name.substr(66)
        }
      })
      const filterData = allSearch.filter(itm=> itm.fields.brand.stringValue===search.toUpperCase())
      setSearchItem(filterData)
      history.push("/search")
    })
  }

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <Link to="/">
        <div>
          <img className="logoDiv" src={Logo} alt="DigitalKart-Logo"/>
        </div>
        </Link>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Search brands (Eg: Apple, Samsung etc..)"
              value={search}
              onChange={(e)=>{
                setSearch(e.target.value)
              }}
            />
          </div>
          <div onClick={hanleSearch} className="searchAction">
            <span className="searchIcon">&#128269;</span>
          </div>
        </div>
        <Link to="/login" className="linkComponent">
        <div className="loginPage">
          <span className="loginSpan">{user?`Welcome ${user.displayName}`:"Signup/Login"}</span>
          <hr />
        </div>
        </Link>
          {user && <span className="logoutSpan"
           onClick={()=>{
            firebase.auth().signOut();
            history.push("/login")
            window.location.reload()
          }} >
            Logout</span>}
          
        {user && <div className="loginPage">
          
          <button onClick={()=>{
            history.push("/cart")
          }} className="btn btn-warning">
          <span>Cart <span style={{color:'red'}}> <strong> {cartItems.length !== 0 ? cartItems.length : ""} </strong> </span> </span>
          </button>
          
        </div>}
        
        <Link to="/myaccount" className="linkComponent">
        {user && <div className="sellMenu">
          
        <span>My Account</span>
          
        </div>}
        </Link>
      </div>
    </div>
  );
}

export default Header;