import React, { useContext, useState } from 'react'
import { FirebaseContext } from '../../Store/FirebaseContext';
import './ForgetPassword.css'

function ForgetPassword() {

    const [email, setEmail] = useState("");
    const [sent, setSent] = useState("");
    const [error, setError] = useState("");

    const {firebase} = useContext(FirebaseContext)

    const handleSubmit=(e)=>{
        e.preventDefault();
        
        firebase.auth().sendPasswordResetEmail(email).then(()=>{
            setSent("Password Reset mail sent!")
        }).catch((error)=>{
            setError(error.message)
            setInterval(function(){ window.location.reload() }, 3000);
        })
    }

    return (
        <div>
        <div className="loginParentDiv">
        <form onSubmit={handleSubmit} >
          <label htmlFor="fname"> <strong> Enter your registered Email here</strong></label>
          <br/>
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
          <br/>         
          <br />
          
          <button className="btn btn-success">Submit</button>
          <div className="messageSpan">
          <span><strong>{sent}</strong></span>
          </div>
        </form>
      <div  className="errorSpanForget">
      <span><strong>{error}</strong></span>
      </div>
      </div>
      </div>
    )
}

export default ForgetPassword