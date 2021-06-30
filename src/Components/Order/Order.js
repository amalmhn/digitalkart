import React, { useContext, useState } from 'react'
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

  const {cartItems} = useContext(CartContext)
  const {totalPrice} = useContext(TotalContext)
  const {firebase} = useContext(FirebaseContext)

  const date = new Date()

  const handleOrder=(e)=>{
    e.preventDefault()
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
        userId:itm.fields.userId.stringValue,
        quantity:itm.qty,
        price:itm.fields.price.stringValue,
        total:totalPrice,
        totalProducts:cartItems.length,
        orderDate: date.toDateString()

      }).then((res)=>{
        console.log(res)
        window.location.reload()
      })
      
      )})
  }

    return (
        <div>
        
        
          <div className="centerDiv2">
            
              <label htmlFor="fname">Name</label>
              <br />
              <input
                className="input2"
                type="text"
                value={name}
                onChange={(e)=>{setName(e.target.value)}}
                id="fname"
                name="Name"
                required
              />
              <br /> 
              <br/>
              <label htmlFor="house">House Number/Name</label>
              <br />
              <input className="input2" type="text"
              value={house}
              onChange={(e)=>{setHouse(e.target.value)}}
              id="house" name="Price" />
              <br />
               <br/>
              <label htmlFor="street">Street</label>
              <br />
              <input className="input2" type="text"
              value={street}
              onChange={(e)=>{setStreet(e.target.value)}}
              id="street" name="Price" />
              <br />
              <br/>
              <label htmlFor="district">District</label>
              <br />
              <input className="input2" type="text"
              value={district}
              onChange={(e)=>{setDistrict(e.target.value)}}
              id="district" name="Price" />
              <br />
              <br/>
              <label htmlFor="state">State</label>
              <br />
              <input className="input2" type="text"
              value={state}
              onChange={(e)=>{setState(e.target.value)}}
              id="state" name="Price" />
              <br />
              <br/>
              <label htmlFor="pin">PIN Code</label>
              <br />
              <input className="input2" type="number"
              value={pin}
              onChange={(e)=>{setPin(e.target.value)}}
              id="pin" name="Price" />
              <br />
              <br/>
              <label htmlFor="contact">Contact Number</label>
              <br />
              <input className="input2" type="number"
              value={contact}
              onChange={(e)=>{setContact(e.target.value)}}
              id="contact" name="Price" />
              <br />
            
            <br />
           
              <button onClick={handleOrder} className="uploadBtn2 btn btn-success">Place your Order</button>
            
          </div>
       
        </div>
    )
}

export default Order
