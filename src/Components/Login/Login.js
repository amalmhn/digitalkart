import React, { useContext, useState } from 'react'
import './Login.css'
import Logo from '../../Assets/DigitalKartLogo.jpeg'
import { FirebaseContext } from '../../Store/FirebaseContext'
import { Link, useHistory } from 'react-router-dom'

function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [valid, setValid] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [valid2, setValid2] = useState('')
  const [option, setOption] = useState(false)
  
  const history = useHistory()
  const {firebase} = useContext(FirebaseContext)

  const handleLogin=(e)=>{

    e.preventDefault()
    
    var passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,15}$/
    
    if((password==="")||(passwordRegex.test(password)===false)){
      setPasswordError("Invalid Password!");
      var error = true;
    }

    if(error===true){
      setValid("Invalid Details!")
      setInterval(function(){ window.location.reload() }, 3000);
    }else{

      setOption(true);
      setValid2("Logging in, please wait...")

      firebase.auth().signInWithEmailAndPassword(email,password).then(()=>{
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
        {option && <span className="loadingSpan"><strong>{valid2}</strong></span>} 
        <br/>
        <span className="new">Are you a new user?</span><br/>
        <Link to="/signup" className="linkLogin">
        <span className="signup"> <strong> Signup </strong> </span>
        </Link>
        <Link to="/forget" className="linkLogin">
        <span className="signup"> <strong>Forget Password? </strong> </span>
        </Link>
        
        <span className="validSpan">{valid}</span>
      <br/>
      
      
      </div>
    </div>
    )
}

export default Login
