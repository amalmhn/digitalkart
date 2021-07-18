import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { PostContext } from '../../../Store/PostContext'
import './Smartwatches.css'

function Smartwatches() {
    
    const [watches, setWatches] = useState([])
    const {setPostDetails} = useContext(PostContext)
    const history = useHistory()

    useEffect(() => {
        axios.get("https://firestore.googleapis.com/v1/projects/digitalkart-1785a/databases/(default)/documents/products/").then((res)=>{
            const all = res.data.documents.map((product)=>{
              return{
                ...product,id:product.name.substr(66)
              }
            })
            const filterData = all.filter(itm=> itm.fields.category.stringValue==="Smartwatches")
            setWatches(filterData)
        })
    }, [])
    
    return (
        <div>
            <br/><br/><br/><br/><br/>
        <div className="postParentDiv">
        <div className="moreView">
        <div className="heading">
          <span>Smartwatches</span>
        </div>
        <div className="cards">
        <div className="row">
        {watches.map((product,index)=>{
        return(
        <div key={index} className="col-12 col-sm-6 col-md-3">
        <div
          onClick={()=>{
              setPostDetails(product)
              history.push("/view")
          }}
            className="card"
        >
        <div className="image">
        <img  src={product.fields.url.stringValue} alt="post" />
        </div>
        <div className="content">
          <p className="rate">{product.fields.name.stringValue}</p>
          <span className="kilometer">&#x20B9;{product.fields.price.stringValue}</span>
          <p className="name">{product.fields.brand.stringValue}</p>
        </div>
        <div className="date">
          <span> <strong> Posted On : </strong>{product.fields.createdAt.stringValue}</span>
        </div>
        </div>
        </div>
                )
            })}
        </div>
        </div>
        </div>
        </div>
        </div>
    )
}

export default Smartwatches