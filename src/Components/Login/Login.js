import React, { useContext, useState } from 'react'
import './Login.css'
import Logo from '../../Assets/DigitalKartLogo.jpeg'
import { FirebaseContext } from '../../Store/FirebaseContext'
import { Link, useHistory } from 'react-router-dom'

function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [valid, setValid] = useState('')
  const history = useHistory()
  const [passwordError, setPasswordError] = useState('')
  const {firebase} = useContext(FirebaseContext)

  const handleLogin=(e)=>{

    e.preventDefault()
    
    var passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/
    
    if((password==="")||(passwordRegex.test(password)===false)){
      setPasswordError("Invalid Password!");
      var error = true;
    }

    if(error===true){
      setValid("Invalid Details!")
      setInterval(function(){ window.location.reload() }, 3000);
    }else{

      firebase.auth().signInWithEmailAndPassword(email,password).then(()=>{
        console.log("Logged in")
        history.push("/")
      }).catch((error) => {
        console.error(error.message);
        setValid(error.message)
        setInterval(function(){ window.location.reload() }, 3000);
    });
    }

  }
  
  return (
        <div>
      <div className="loginParentDiv">
        <Link to="/">
        <img style={{marginLeft:'1px'}} width="200px" height="200px" src={Logo} alt="Logo"></img>
        </Link>
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
          <span className="validSpan" >{passwordError}</span>
          <br />
          <button className="btn btn-success">Login</button>
          
        </form>
        <span className="new">Are you a new user?</span><br/>
        <Link to="/signup" className="linkLogin">
        <span className="signup"> <strong> Signup </strong> </span>
        </Link>
      <br/>
      <span className="validSpan">{valid}</span>
      
      </div>
    </div>
    )
}

export default Login
