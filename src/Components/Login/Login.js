import React from 'react'
import './Login.css'
import Logo from '../../Assets/DigitalKartLogo.jpeg'

function Login() {
    return (
        <div>
      <div className="loginParentDiv">
        <img style={{marginLeft:'25px'}} width="200px" height="200px" src={Logo} alt="Logo"></img>
        <form>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            
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
          <button>Login</button>
        </form>
        <span className="new">Are you a new user?</span><br/>
        <span className="signup">Signup</span>
      </div>
    </div>
    )
}

export default Login
