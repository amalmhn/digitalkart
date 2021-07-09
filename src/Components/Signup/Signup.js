import React, { useState,useContext } from 'react'
import './Signup.css'
import Logo from '../../Assets/DigitalKartLogo.jpeg'
import { FirebaseContext } from '../../Store/FirebaseContext'
import {Link, useHistory} from 'react-router-dom';

function Signup() {

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  
  const [error, setError] = useState('')

  const [userError, setUserError] = useState('')
  const [phoneError, setPhoneError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [valid, setValid] = useState('')
  const [valid2, setValid2] = useState('')
  const [option, setOption] = useState(false)

  const {firebase} = useContext(FirebaseContext)

  const history = useHistory()

  const handleSubmit=(e)=>{
    e.preventDefault()

    var usernameRegex = /^[a-zA-Z0-9]{5,10}$/
    var phoneRegex = /^[0-9]{10}$/
    var passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,15}$/
    
    if((username==="")||(usernameRegex.test(username)===false)){
      setUserError("Username must be min 5 & max 10 characters and without special characters(!@#$%)");
      var error = true;
  }
  if((phone==="")||(phoneRegex.test(phone)===false)){
    setPhoneError("Phone number should be 10 digits");
    var phoneError1 = true;
}
if((password==="")||(passwordRegex.test(password)===false)){
  setPasswordError("Password should be min 6 & max 15 characters, 1 letter, 1 number and 1 special character");
  var passwordError1 = true;
}

if(error===true || phoneError1===true || passwordError1===true){
  setValid("Invalid Details!")
  setInterval(function(){ window.location.reload() }, 3000);
}else{

  setOption(true);
  setValid2("Creating account, please wait...")

  firebase.auth().createUserWithEmailAndPassword(email,password).then((result)=>{
    result.user.updateProfile({displayName:username}).then(()=>{
      firebase.firestore().collection('users').add({
        id:result.user.uid,
        username:username,
        phone:phone
      }).then(()=>{
        history.push("/login")
      })
    })
  }).catch((error) => {
    console.error(error.message);
    setError(error.message)
    setInterval(function(){ window.location.reload() }, 3000);
});
}

    

  }
    return (
        <div>
      <div className="signupParentDiv">
        <Link to="/">
        <img width="200px" height="200px" style={{marginLeft:'1px'}} src={Logo} alt="Logo"></img>
        </Link>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e)=>{setUsername(e.target.value)}}
            id="uname"
            name="name"
            required
          />
          <br />
          <span className="errorSpan">{userError}</span>
          <br/>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e)=>{setEmail(e.target.value)}}
            id="mail"
            name="email"
            required
          />
          <br />
          <br/>
          <label htmlFor="lname">Phone Number</label>
          <br />
          <input
            className="input"
            type="number"
            value={phone}
            onChange={(e)=>{setPhone(e.target.value)}}
            id="num"
            name="phone"
            required
          />
          <br />
          <span className="errorSpan">{phoneError}</span>
          <br/>
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e)=>{setPassword(e.target.value)}}
            id="pwd"
            name="password"
            required
          />
          <br />
          <span className="errorSpan">{passwordError}</span>
          <br/>
          <br />
          <button className="btn btn-success">Signup</button>
        </form>
        {option ? <span className="loadingSpan"><strong>{valid2}</strong></span> : <span className="errorSpan">{valid}</span>}
        {error ? <div>
        <span className="errorSpan">{error}</span>
       </div> : ""}
       <br/>
        <span className="existing">Existing User?</span><br/>
        <Link to="/login" className="linkSignup">
        <span className="loginLink"> <strong> Login</strong> </span>
        </Link>
      
        
      </div>
      
    </div>
    )
}

export default Signup
