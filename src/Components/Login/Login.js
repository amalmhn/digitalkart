import React, { useContext, useState } from 'react'
import './Login.css'
import Logo from '../../Assets/DigitalKartLogo.jpeg'
import { FirebaseContext } from '../../Store/FirebaseContext'
import { useHistory } from 'react-router-dom'

function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [valid, setValid] = useState('')
  const history = useHistory()

  const {firebase} = useContext(FirebaseContext)

  const handleLogin=(e)=>{
    e.preventDefault()
    firebase.auth().signInWithEmailAndPassword(email,password).then(()=>{
      console.log("Logged in")
      history.push("/")
    }).catch((error) => {
      console.error(error.message);
      setValid(error.message)
      setInterval(function(){ window.location.reload() }, 3000);
  });
  }
  
  return (
        <div>
      <div className="loginParentDiv">
        <img style={{marginLeft:'25px'}} width="200px" height="200px"  alt="Logo"></img>
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e)=>{setEmail(e.target.value)}}
            id="fname"
            name="email"
            required
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e)=>{setPassword(e.target.value)}}
            id="lname"
            name="password"
            required
          />
          <br />
          <br />
          <button className="btn btn-success">Login</button>
          
        </form>
        <span className="new">Are you a new user?</span><br/>
        <span className="signup"> <strong> Signup </strong> </span>
      <br/>
      <span className="validSpan">{valid}</span>
      
      </div>
    </div>
    )
}

export default Login
