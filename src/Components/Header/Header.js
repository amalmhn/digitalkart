import React, { useContext } from 'react';
import './Header.css';
import Logo from '../../Assets/DigitalKartLogo.jpeg'
import { AuthContext } from '../../Store/AuthContext';
import { FirebaseContext } from '../../Store/FirebaseContext';
import { useHistory } from 'react-router-dom';

function Header() {

  const {user} = useContext(AuthContext);
  const {firebase} = useContext(FirebaseContext)

  const history = useHistory()

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div>
          <img className="logoDiv" src={Logo} alt="DigitalKart-Logo"/>
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
          <span>{user?`Welcome ${user.displayName}`:"Signup/Login"}</span>
          <hr />
        </div>
          {user && <span className="logoutSpan"
           onClick={()=>{
            firebase.auth().signOut();
            history.push("/login")
          }} >
            Logout</span>}
          
        <div className="loginPage">
          <button className="btn btn-warning">
          <span>Cart <span style={{color:'red'}}> <strong> 1 </strong> </span> </span>
          </button>
        </div>

        <div className="sellMenu">
          
        <button className="btn btn-success">My Orders</button>
          
        </div>
      </div>
    </div>
  );
}

export default Header;