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
import SmartphonesPage from './Pages/Smartphones'
import LaptopsPage from './Pages/Laptops'
import SmartwatchesPage from './Pages/Smartwatches'
import Cart from './Store/CartContext'
import CartPage from './Pages/Cart'
import OrderPage from './Pages/Order'
import Total from './Store/TotalContext'
import MyAccountPage from './Pages/MyAccount'
import AdminPage from './Pages/Admin'
import EditPage from './Pages/Edit'
import OrderDetailsPage from './Pages/OrderDetails'
import Order from './Store/OrderContext'
import Search from './Store/SearchContext'
import SearchPage from './Pages/Search'
import ForgetPasswordPage from './Pages/ForgetPassword'


function App() {

  const {setUser} = useContext(AuthContext)
  const {firebase} = useContext(FirebaseContext)
  
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user)=>{
      setUser(user)
    })
  }, [firebase,setUser])

  return (
    <div>
    <Post>
      <Cart>
        <Total>
          <Order>
            <Search>
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
      <Route path="/smartphones">
      <SmartphonesPage/>
      </Route>
      <Route path="/laptops">
      <LaptopsPage/>
      </Route>
      <Route path="/smartwatches">
      <SmartwatchesPage/>
      </Route>
      <Route path="/cart">
      <CartPage/>
      </Route>
      <Route path="/order">
      <OrderPage/>
      </Route>
      <Route path="/myaccount">
      <MyAccountPage/>
      </Route>
      <Route path="/admin">
      <AdminPage/>
      </Route>
      <Route path="/edit">
      <EditPage/>
      </Route>
      <Route path="/orderdetails">
      <OrderDetailsPage/>
      </Route>
      <Route path="/search">
      <SearchPage/>
      </Route>
      <Route path="/forget">
      <ForgetPasswordPage/>
      </Route>
      </Router>
      </Search>
      </Order>
      </Total>
      </Cart>
    </Post>
    </div>
  )
}

export default App
