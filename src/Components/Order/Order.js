import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../../Store/AuthContext'
import { CartContext } from '../../Store/CartContext'
import { FirebaseContext } from '../../Store/FirebaseContext'
import { TotalContext } from '../../Store/TotalContext'
import './Order.css'

function Order() {

  const [name, setName] = useState("")
  const [house, setHouse] = useState("")
  const [street, setStreet] = useState("")
  const [district, setDistrict] = useState("")
  const [state, setState] = useState("")
  const [pin, setPin] = useState("")
  const [contact, setContact] = useState("")

  const [nameError, setNameError] = useState("")
  const [houseError, setHouseError] = useState("")
  const [streetError, setStreetError] = useState("")
  const [districtError, setDistrictError] = useState("")
  const [stateError, setStateError] = useState("")
  const [pinError, setPinError] = useState("")
  const [contactError, setContactError] = useState("")
  const [valid, setValid] = useState('');
  const [valid2, setValid2] = useState('');
  const [option, setOption] = useState(false);
  const [error, setError] = useState("");

  const {cartItems} = useContext(CartContext)
  const {totalPrice} = useContext(TotalContext)
  const {firebase} = useContext(FirebaseContext)
  const {user} = useContext(AuthContext);
  const history = useHistory()

  const date = new Date()

  const billNumber = Math.floor(Math.random() * (100000 - 1000 + 1000) + 1000)

  const handleOrder=(e)=>{

    e.preventDefault()

    var nameRegex = /^[a-zA-Z]{2,}$/
    var houseRegex = /^[a-zA-Z0-9 ]*$/
    var streetRegex = /^[a-zA-Z0-9 ]*$/
    var districtRegex = /^[a-zA-Z]*$/
    var stateRegex = /^[a-zA-Z ]*$/
    var pinRegex = /^[0-9]{6}$/
    var contactRegex = /^[0-9]{10}$/

    if((name==="")||(nameRegex.test(name)===false)){
      setNameError("Name must be alphabets, minimum of 5 characters");
      var nameError = true;
  }
  if((house==="")||(houseRegex.test(house)===false)){
    setHouseError("Field should not contain any special characters");
    var houseError = true;
}
if((street==="")||(streetRegex.test(street)===false)){
  setStreetError("Field should not contain any special characters");
  var streetError = true;
}
if((district==="")||(districtRegex.test(district)===false)){
  setDistrictError("Field should not contain any special characters");
  var districtError = true;
}
if((state==="")||(stateRegex.test(state)===false)){
  setStateError("Field should not contain any special characters");
  var stateError = true;
}
if((pin==="")||(pinRegex.test(pin)===false)){
  setPinError("PIN should be 6 digits");
  var pinError = true;
}
if((contact==="")||(contactRegex.test(contact)===false)){
  setContactError("Contact number should be 10 digits");
  var contactError = true;
}

if(nameError===true || houseError===true || streetError===true || districtError===true
  || stateError===true || pinError===true || contactError===true || cartItems.length===0){
  setValid("Correct the errors and click the order button. ")
}else{
  
  setOption(true)
  setValid2("Order is placing, please wait... ")
  cartItems.map((itm)=>{
    return(
    firebase.firestore().collection('orders').add({
      name,
      house,
      street,
      district,
      state,
      pin,
      contact,
      productId:itm.id,
      productName:itm.fields.name.stringValue,
      userId:user.uid,
      quantity:itm.qty,
      price:itm.fields.price.stringValue,
      total:totalPrice,
      totalProducts:cartItems.length,
      orderDate: date.toDateString(),
      billNumber
  
    }).then(()=>{
    
      history.push("/")
      window.location.reload()
    }).catch((error)=>{
      setError(error.message)
    })
    
    )})
  
}

    

  }

    return (
        <div>
        
        
          {user ? <div className="centerDiv2">
          {cartItems.length===0?<span className="errorSpan"><strong>Error! cart is empty.
             Add items to cart and try again.</strong></span>:""}
             <br/>
              <label htmlFor="fname">Name</label>
              <br />
              <input
                className="input2"
                type="text"
                value={name}
                onChange={(e)=>{
                  setName(e.target.value)
                }}
                id="fname"
                name="Name"
                required
              />
              <br /> 
              {option ? "" : <span className="errorSpan">{nameError}</span>}
              <br/>
              <label htmlFor="house">House Number/Name</label>
              <br />
              <input className="input2" type="text"
              value={house}
              onChange={(e)=>{setHouse(e.target.value)}}
              id="house" name="Price" />
              <br />
              {option ? "" : <span className="errorSpan">{houseError}</span>}
               <br/>
              <label htmlFor="street">Street</label>
              <br />
              <input className="input2" type="text"
              value={street}
              onChange={(e)=>{setStreet(e.target.value)}}
              id="street" name="Price" />
              <br />
              {option ? "" : <span className="errorSpan">{streetError}</span>}
              <br/>
              <label htmlFor="district">District</label>
              <br />
              <input className="input2" type="text"
              value={district}
              onChange={(e)=>{setDistrict(e.target.value)}}
              id="district" name="Price" />
              <br />
              {option ? "" : <span className="errorSpan">{districtError}</span>}
              <br/>
              <label htmlFor="state">State</label>
              <br />
              <input className="input2" type="text"
              value={state}
              onChange={(e)=>{setState(e.target.value)}}
              id="state" name="Price" />
              <br />
              {option ? "" : <span className="errorSpan">{stateError}</span>}
              <br/>
              <label htmlFor="pin">PIN Code</label>
              <br />
              <input className="input2" type="number"
              value={pin}
              onChange={(e)=>{setPin(e.target.value)}}
              id="pin" name="Price" />
              <br />
              {option ? "" : <span className="errorSpan">{pinError}</span>}
              <br/>
              <label htmlFor="contact">Contact Number</label>
              <br />
              <input className="input2" type="number"
              value={contact}
              onChange={(e)=>{setContact(e.target.value)}}
              id="contact" name="Price" />
              <br />
              {option ? "" : <span className="errorSpan">{contactError}</span>}
            <br />
           
              <button onClick={handleOrder} className="uploadBtn2 btn btn-success">Place your Order</button>
            <br/>
            {option?<span className="loadingSpan"> <strong>{valid2}</strong> </span>
             :<span className="errorSpan">{valid}</span> }
             
             <span className="errorSpan">{error}</span>            
            
          </div> : <div className="userSpanLogin">
            <br/><br/><br/><br/><br/>
            <span><strong>Please Login first</strong></span>
            </div>}
       
        </div>
    )
}

export default Order
