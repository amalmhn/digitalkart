import axios from 'axios'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../../Store/AuthContext'
import './MyAccount.css'

function MyAccount() {

    const [order, setOrder] = useState([])
    const [account, setAccount] = useState([])
    const [tableData, setTableData] = useState(false)
    const [orderData, setOrderData] = useState(false)


    const {user} = useContext(AuthContext)

     const handleAccount=(e)=>{
        e.preventDefault()
        axios.get("https://firestore.googleapis.com/v1/projects/digitalkart-1785a/databases/(default)/documents/users/").then((res)=>{
            const all = res.data.documents.map((product)=>{
                return{
                  ...product,id:product.name.substr(66)
                }
              })
              const filterData = all.filter(itm=> itm.fields.id.stringValue===user.uid)
              setAccount(filterData)
              setTableData(true)
              setOrderData(false)
        })
     }

     const handleOrder=(e)=>{
         e.preventDefault()
         axios.get("https://firestore.googleapis.com/v1/projects/digitalkart-1785a/databases/(default)/documents/orders/").then((res)=>{
            const all = res.data.documents.map((product)=>{
                return{
                  ...product,id:product.name.substr(64)
                }
              })
              const filterData = all.filter(itm=> itm.fields.userId.stringValue===user.uid)
              setOrder(filterData)
              setOrderData(true)
              setTableData(false)
         })
     }

     

    return (
        <div>
            <br/><br/><br/><br/><br/>
            <div className="buttons">
                <div className="container">
                {user && <div className="row">
                    <div onClick={handleAccount} className="col-md-6 btn btn-primary myAcntBtn" >Account Details</div>
                    <div onClick={handleOrder} className="col-md-6 btn btn-success myAcntBtn" >Order Details</div>
                </div>}
                    
                    
                    
                   {tableData && <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Account Details</th>
                            <th></th>
                            <th></th>
                        </tr>
                        
                    </thead>
                    
                        
                    {account.map((product)=>{
                        return(

                    <tbody key={product.id}> 
                        <tr>
                            <th>Username:</th>
                            <td>{product.fields.username.stringValue}</td>
                            
                        </tr>
                        <tr>
                            <th>Phone number:</th>
                            <td>{product.fields.phone.stringValue}</td>
                            
                        </tr>
                        
                    </tbody>
                        )
                    })} 
                    </table>}
                        
                    

                    {orderData && 
                    <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Order Details</th>
                            <th></th>
                            <th></th>
                        </tr>
                        <tr>
                            <th>Product name</th>
                            <th>Order date</th>
                            <th>Order ID</th>
                        </tr>
                        
                    </thead>

                    {order.map((product)=>{
                        return(

                    <tbody key={product.id}>
                        
                            

                        <tr>
                            <td>{product.fields.productName.stringValue}</td>
                            <td>{product.fields.orderDate.stringValue}</td>
                            <td>{product.id}</td>
                            
                        </tr>
                        
                        
                    </tbody>
                        )
                    })}
                    </table>}
                    </div>
                    
                </div>
            </div>
        
    )
}

export default MyAccount
