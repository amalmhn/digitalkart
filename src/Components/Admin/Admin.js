import React, { useContext, useState } from 'react'
import axios from 'axios'
import { AuthContext } from '../../Store/AuthContext'
import './Admin.css'
import { FirebaseContext } from '../../Store/FirebaseContext'
import { PostContext } from '../../Store/PostContext'
import { useHistory } from 'react-router-dom'
import { OrderContext } from '../../Store/OrderContext'

function Admin() {

    const [products, setProducts] = useState([])
    const [orders, setOrders] = useState([])
    const [users, setUsers] = useState([])
    const [payments, setPayments] = useState([])
    const [productDetails, setProductDetails] = useState(false)
    const [orderDetails, setOrderDetails] = useState(false)
    const [userDetails, setUserDetails] = useState(false)
    const [paymentDetails, setPaymentDetails] = useState(false)

    const {user} = useContext(AuthContext)
    const {firebase} = useContext(FirebaseContext)
    const {setPostDetails} = useContext(PostContext)
    const history = useHistory()
    const {setOrderView} = useContext(OrderContext)

    const handleProduct=(e)=>{
        e.preventDefault();
        axios.get("https://firestore.googleapis.com/v1/projects/digitalkart-1785a/databases/(default)/documents/products/").then((res)=>{
            const allPost= res.data.documents.map((product)=>{
                return{
                  ...product,id:product.name.substr(66)
                }
              })
              setProducts(allPost)
              setProductDetails(true)
              setOrderDetails(false)
              setUserDetails(false)
              setPaymentDetails(false)
        })
    }

    const handleOrder=(e)=>{
        e.preventDefault();
        axios.get("https://firestore.googleapis.com/v1/projects/digitalkart-1785a/databases/(default)/documents/orders/").then((res)=>{
            const allOrder = res.data.documents.map((product)=>{
                return{
                  ...product,id:product.name.substr(64)
                }
              })
              setOrders(allOrder)
              setOrderDetails(true)
              setProductDetails(false)
              setUserDetails(false)
              setPaymentDetails(false)
        })
    }

    const handleUser=(e)=>{
        e.preventDefault();
        axios.get("https://firestore.googleapis.com/v1/projects/digitalkart-1785a/databases/(default)/documents/users/").then((res)=>{
            const allUsers = res.data.documents.map((product)=>{
                return{
                  ...product,id:product.name.substr(63)
                }
              })
              setUsers(allUsers)
              setUserDetails(true)
              setOrderDetails(false)
              setProductDetails(false)
              setPaymentDetails(false)
        })
    }

    const handlePayment=(e)=>{
        e.preventDefault();
        axios.get("https://firestore.googleapis.com/v1/projects/digitalkart-1785a/databases/(default)/documents/payment/").then((res)=>{
            const allPayment = res.data.documents.map((product)=>{
                return{
                    ...product,id:product.name.substr(65)
                }
            })
            setPayments(allPayment)
            setPaymentDetails(true)
            setOrderDetails(false)
            setProductDetails(false)
            setUserDetails(false)
        })
    }

    const handleDelete=(product)=>{
        firebase.firestore().collection('products').doc(product.id).delete().then(()=>{
            history.push("/")
        })
    }

    return (
        <div>
            <br/><br/><br/><br/><br/>
            {user && user.uid==="SjE0GeIdoUbvMpTV9PE5ugHqyaH3" ? <div className="container">
            {user && <div className="buttons">
                <div className="row">
                    <div onClick={handleProduct} className="col-md-2 btn btn-primary myAdminBtn">Post Details</div>
                    <div onClick={handleOrder} className="col-md-2 btn btn-secondary myAdminBtn">Order Details</div>
                    <div onClick={handleUser} className="col-md-2 btn btn-success myAdminBtn">User Details</div>
                    <div onClick={handlePayment} className="col-md-2 btn btn-dark myAdminBtn">Payment Details</div>
                    <div onClick={()=>{
                        history.push("/create")
                    }} className="col-md-2 btn btn-info myAdminBtn">Create Product</div>
                </div>
            </div>}
            {productDetails && <table className="table table-striped">
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
            </table>}

            {orderDetails && <table className="table table-striped">
                    <thead>
                    <tr>
                          <th>Orders</th>
                          <th></th>
                          <th></th>
                          <th></th>
                          <th></th>  
                        </tr>
                        <tr>
                          <th>Product name</th>
                          <th>Customer name</th>
                          <th>Order ID</th>
                          <th>Bill Number</th>
                          <th></th>  
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order)=>{
                            return(

                        <tr key={order.id}>
                            <td>{order.fields.productName.stringValue}</td>
                            <td>{order.fields.name.stringValue}</td>
                            <td>{order.id}</td>
                            <td>{order.fields.billNumber.integerValue}</td>
                            <td><button
                            onClick={()=>{
                                setOrderView(order)
                                history.push("/orderdetails")
                            }
                            }
                            className="btn btn-primary">View</button></td>
                        </tr>
                            )
                        })}
                    </tbody>
            </table>}

            {userDetails && <table className="table table-striped">
                    <thead>
                        <tr>
                        <th>Users</th>
                        <th></th>
                        <th></th>
                        </tr>
                        <tr>
                        <th>Username</th>
                        <th>Phone number</th>
                        <th>User ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user)=>{
                            return(

                        <tr key={user.id}>
                            <td>{user.fields.username.stringValue}</td>
                            <td>{user.fields.phone.stringValue}</td>
                            <td>{user.fields.id.stringValue}</td>
                        </tr>
                            )
                        })}
                    </tbody>
            </table>}

            {paymentDetails && <table className="table table-striped">
                    <thead>
                        <tr>
                        <th>Payments</th>
                        <th></th>
                        <th></th>
                        <th></th>
                        </tr>
                        <tr>
                        <th>Bill Number</th>
                        <th>Payment ID</th>
                        <th>Total Price</th>
                        <th>User ID</th>
                        </tr>
                    </thead>
                    <tbody>
                       {payments.map((payment)=>{
                           return(
                        <tr key={payment.id}>
                            <td>{payment.fields.billNumber.integerValue}</td>
                            <td>{payment.fields.payment_id.stringValue}</td>
                            <td>&#x20B9;{payment.fields.total.integerValue}</td>
                            <td>{payment.fields.userId.stringValue}</td>
                        </tr>
                        )
                       })}
                    </tbody>
            </table>}
            </div>: <div className="userSpanAdmin">
            <br/><br/><br/>
            <span><strong>Access only for Admin</strong></span>
            </div>}
        </div>
    )
}

export default Admin