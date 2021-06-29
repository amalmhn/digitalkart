import React, { useContext } from 'react';
import './Header.css';
import Logo from '../../Assets/DigitalKartLogo.jpeg'
import { AuthContext } from '../../Store/AuthContext';
import { FirebaseContext } from '../../Store/FirebaseContext';
import { useHistory , Link } from 'react-router-dom';

function Header() {

  const {user} = useContext(AuthContext);
  const {firebase} = useContext(FirebaseContext)

  const history = useHistory()

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
            />
          </div>
          <div className="searchAction">
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
          }} >
            Logout</span>}
          
        {user && <div className="loginPage">
          <button className="btn btn-warning">
          <span>Cart <span style={{color:'red'}}> <strong> 1 </strong> </span> </span>
          </button>
        </div>}
        
        <Link to="/create" className="linkComponent">
        {user && <div className="sellMenu">
          
        <span>My Account</span>
          
        </div>}
        </Link>
      </div>
    </div>
  );
}

export default Header;