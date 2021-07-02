import React, { useContext, useState } from 'react'
import axios from 'axios'
import { AuthContext } from '../../Store/AuthContext'
import './Admin.css'
import { FirebaseContext } from '../../Store/FirebaseContext'
import { PostContext } from '../../Store/PostContext'
import { useHistory } from 'react-router-dom'

function Admin() {

    const [products, setProducts] = useState([])

    const {user} = useContext(AuthContext)
    const {firebase} = useContext(FirebaseContext)
    const {setPostDetails} = useContext(PostContext)
    const history = useHistory()

    const handleProduct=(e)=>{
        e.preventDefault();
        axios.get("https://firestore.googleapis.com/v1/projects/digitalkart-1785a/databases/(default)/documents/products/").then((res)=>{
            const allPost= res.data.documents.map((product)=>{
                
                return{
                  ...product,id:product.name.substr(66)
                }
              })
              setProducts(allPost)
        })
    }

    const handleDelete=(product)=>{
        firebase.firestore().collection('products').doc(product.id).delete().then(()=>{
            window.location.reload()
        })
    }

    return (
        <div>
            <br/><br/><br/><br/><br/>
            <div className="buttons">
                <div className="row">
                    <div onClick={handleProduct} className="col-md-3 btn btn-primary myAdminBtn">Post Details</div>
                    <div className="col-md-3 btn btn-secondary myAdminBtn">Order Details</div>
                    <div className="col-md-3 btn btn-success myAdminBtn">User Details</div>
                    <div onClick={()=>{
                        history.push("/create")
                    }} className="col-md-3 btn btn-info myAdminBtn">Create post</div>
                </div>
            </div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Product Details</th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>   
                    </tr>
                    <tr>
                        <th>Product Name</th>
                        <th>Brand</th>
                        <th>Category</th>
                        <th>Posted Date</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product)=>{
                        return(

                    <tr key={product.id}>
                        <td>{product.fields.name.stringValue}</td>
                        <td>{product.fields.brand.stringValue}</td>
                        <td>{product.fields.category.stringValue}</td>
                        <td>{product.fields.createdAt.stringValue}</td>
                        <td><button onClick={()=>{
                            setPostDetails(product);
                            history.push("/edit")
                        }} className="btn btn-primary">Edit</button></td>
                        <td><button onClick={()=>handleDelete(product)} className="btn btn-danger">Delete</button></td>
                    </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Admin
