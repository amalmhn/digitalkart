import React from 'react'
import './Order.css'

function Order() {
    return (
        <div>
        
        <card>
          <div className="centerDiv2">
            <form>
              <label htmlFor="fname">Name</label>
              <br />
              <input
                className="input2"
                type="text"
                id="fname"
                name="Name"
                required
              />
              <br /> 
              <br/>
              <label htmlFor="fname">House Number/Name</label>
              <br />
              <input className="input2" type="text" id="fname" name="Price" />
              <br />
               <br/>
              <label htmlFor="fname">Street</label>
              <br />
              <input className="input2" type="number" id="fname" name="Price" />
              <br />
              <br/>
              <label htmlFor="fname">District</label>
              <br />
              <input className="input2" type="text" id="fname" name="Price" />
              <br />
              <br/>
              <label htmlFor="fname">State</label>
              <br />
              <input className="input2" type="text" id="fname" name="Price" />
              <br />
              <br/>
              <label htmlFor="fname">PIN Code</label>
              <br />
              <input className="input2" type="text" id="fname" name="Price" />
              <br />
              <br/>
              <label htmlFor="fname">Contact Number</label>
              <br />
              <input className="input2" type="text" id="fname" name="Price" />
              <br />
            </form>
            <br />
           
              <button className="uploadBtn2 btn btn-success">Place your Order</button>
            
          </div>
        </card>
        </div>
    )
}

export default Order
