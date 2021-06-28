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
                required
              />
              <br /> <br/>
              <label htmlFor="fname">Category</label>
              <br />
              <select name="category" className="categorySelect">
                <option value="Smartphones">Smartphones</option>
                <option value="Smartphones">Laptops</option>
                <option value="Smartphones">Smartwatches</option>
              </select>
              <br /> <br/>
              <label htmlFor="fname">Price</label>
              <br />
              <input className="input" type="number" id="fname" name="Price" />
              <br />
              <br/>
              <label htmlFor="fname">RAM</label>
              <br />
              <input className="input" type="text" id="fname" name="Price" />
              <br />
              <br/>
              <label htmlFor="fname">Memory</label>
              <br />
              <input className="input" type="text" id="fname" name="Price" />
              <br />
              <br/>
              <label htmlFor="fname">Brand</label>
              <br />
              <input className="input" type="text" id="fname" name="Price" />
              <br />
            </form>
            <br />
            <img alt="Posts" width="200px" height="200px" src=""></img>
            <form>
              <br />
              <input type="file" />
              <br />
              <button className="uploadBtn btn btn-success">Upload and Submit</button>
            </form>
          </div>
        </card>
        </div>
    )
}

export default Create
