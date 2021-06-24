import React from 'react'
import './Create.css'

function Create() {
    return (
        <div>
        
        <card>
          <div className="centerDiv">
            <form>
              <label htmlFor="fname">Name</label>
              <br />
              <input
                className="input"
                type="text"
                id="fname"
                name="Name"
                
              />
              <br />
              <label htmlFor="fname">Category</label>
              <br />
              <input
                className="input"
                type="text"
                id="fname"
                name="category"
                
              />
              <br />
              <label htmlFor="fname">Price</label>
              <br />
              <input className="input" type="number" id="fname" name="Price" />
              <br />
            </form>
            <br />
            <img alt="Posts" width="200px" height="200px" src=""></img>
            <form>
              <br />
              <input type="file" />
              <br />
              <button className="uploadBtn">Upload and Submit</button>
            </form>
          </div>
        </card>
        </div>
    )
}

export default Create
