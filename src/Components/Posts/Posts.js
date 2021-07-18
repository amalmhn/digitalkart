import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { PostContext } from '../../Store/PostContext'
import './Posts.css'

function Posts() {

  const [products, setProducts] = useState([])
  const {setPostDetails} = useContext(PostContext)
  const history = useHistory()
  
  useEffect(() => {
    axios.get("https://firestore.googleapis.com/v1/projects/digitalkart-1785a/databases/(default)/documents/products/").then((res)=>{
      // console.log(res.data.documents)
      const allPost= res.data.documents.map((product)=>{
        return{
          ...product,id:product.name.substr(66)
        }
      })
      setProducts(allPost)
    })
  }, [])

    return (
        <div className="postParentDiv">
        <div className="moreView">
        <div className="heading">
          <span>Product Menu</span>
        </div>
        <div className="cards">
        <div className="row">
          {products.map((product,index)=>{
              return(
                <div key={index} className="col-12 col-sm-6 col-md-3">
          <div            
            className="card"
                onClick={()=>{
                  setPostDetails(product)
                  history.push('/view')
                }}
          >
          <div className="image">
              <img  src={product.fields.url.stringValue} alt="" />
          </div>
          <div className="content">
            <p className="rate">{product.fields.name.stringValue}</p>
            <span className="kilometer">&#x20B9;{product.fields.price.stringValue}</span>
            <p className="name">{product.fields.brand.stringValue}</p>
          </div>
            <div className="date">
            <span> <strong> Posted On :</strong> {product.fields.createdAt.stringValue}</span>
          </div>
          </div>
          </div>
              )
            })}
          </div>
        </div>
      </div>
      </div>
    )
}

export default Posts