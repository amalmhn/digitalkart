import React, { useContext, useEffect } from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Home from './Pages/Home'
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import Create from './Pages/Create'
import Viewpost from './Pages/Viewpost'
import { AuthContext } from './Store/AuthContext'
import { FirebaseContext } from './Store/FirebaseContext'
import Post from './Store/PostContext'


function App() {

  const {setUser} = useContext(AuthContext)
  const {firebase} = useContext(FirebaseContext)
  
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user)=>{
      setUser(user)
    })
  }, [])

  return (
    <div>
    <Post>
      <Router>
        <Route exact path="/">
      <Home/>
      </Route>
      <Route path="/signup">
      <Signup/>
      </Route>
      <Route path="/login">
      <Login/>
      </Route>
      <Route path="/create">
      <Create/>
      </Route>
      <Route path="/view">
      <Viewpost/>
      </Route>
      </Router>
    </Post>
    </div>
  )
}

export default App
