import React from 'react'
import './Signup.css'
import Logo from '../../Assets/DigitalKartLogo.jpeg'

function Signup() {
    return (
        <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" style={{marginLeft:'25px'}} src={Logo} alt="Logo"></img>
        <form>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="name"
            
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
           
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="lname"
            name="phone"
            
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            
          />
          <br />
          <br />
          <button className="btn btn-success">Signup</button>
        </form>
        
        <span className="existing">Existing User?</span><br/>
        <span className="loginLink">Login</span>
        
      </div>
    </div>
    )
}

export default Signup
