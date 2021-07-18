import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { PostContext } from '../../Store/PostContext'
import { SearchContext } from '../../Store/SearchContext'
import './Search.css'

function Search() {

    const {searchItem} = useContext(SearchContext)
    const {setPostDetails} = useContext(PostContext)

    const history = useHistory()

    return (
        <div>
            <br/><br/><br/><br/><br/>
            {searchItem ? <div className="postParentDiv">
        <div className="moreView">
        <div className="heading">
          <span>Search results :</span>
        </div>
        <div className="cards">
        {searchItem.length===0 ? <span className="userSpanSearch1">No search results, Please try another brand name</span> : <div className="row">
            {searchItem.map((product)=>{
                return(
          <div key={product.id} className="col-12 col-sm-6 col-md-3">
          <div            
            className="card"
            onClick={()=>{
                setPostDetails(product)
                history.push("/view")
            }}
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
          </div>}
        </div>
      </div>
      </div> : <div className="userSpanSearch">
            <br/><br/><br/>
            <span><strong>Please search brands in search field</strong></span>
            </div>}
    </div>
    )
}

export default Search