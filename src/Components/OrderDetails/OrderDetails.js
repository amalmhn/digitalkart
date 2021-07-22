import React, { useContext } from 'react'
import { OrderContext } from '../../Store/OrderContext'
import './OrderDetails.css'

function OrderDetails() {

    const {orderView} = useContext(OrderContext)

    return (
        <div>
            <br/><br/><br/><br/><br/>
            <table className="table table-striped">
                <thead>
                    <tr>
                    <th>Order Details</th>                    
                    <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>Bill number :</th>                       
                        <td>{orderView.fields.billNumber.integerValue}</td>
                    </tr>
                    <tr>
                        <th>Name :</th>                       
                        <td>{orderView.fields.name.stringValue}</td>
                    </tr>
                    <tr>
                        <th>House :</th>                       
                        <td>{orderView.fields.house.stringValue}</td>
                    </tr>
                    <tr>
                        <th>Street :</th>                       
                        <td>{orderView.fields.street.stringValue}</td>
                    </tr>
                    <tr>
                        <th>District :</th>                       
                        <td>{orderView.fields.district.stringValue}</td>
                    </tr>
                    <tr>
                        <th>State :</th>                       
                        <td>{orderView.fields.state.stringValue}</td>
                    </tr>
                    <tr>
                        <th>PIN Code :</th>                       
                        <td>{orderView.fields.pin.stringValue}</td>
                    </tr>
                    <tr>
                        <th>Contact number :</th>                       
                        <td>{orderView.fields.contact.stringValue}</td>
                    </tr>
                    <tr>
                        <th>Email :</th>                       
                        <td>{orderView.fields.email.stringValue}</td>
                    </tr>
                    <tr>
                        <th>Product name :</th>                       
                        <td>{orderView.fields.productName.stringValue}</td>
                    </tr>
                    <tr>
                        <th>Product ID :</th>                       
                        <td>{orderView.fields.productId.stringValue}</td>
                    </tr>
                    <tr>
                        <th>User placed the order :</th>                       
                        <td>{orderView.fields.userId.stringValue}</td>
                    </tr>
                    <tr>
                        <th>Quantity :</th>                       
                        <td>{orderView.fields.quantity.integerValue}</td>
                    </tr>
                    <tr>
                        <th>Price :</th>                       
                        <td>{orderView.fields.price.stringValue}</td>
                    </tr>
                    <tr>
                        <th>Total bill price :</th>                       
                        <td>{orderView.fields.total.integerValue}</td>
                    </tr>
                    <tr>
                        <th>Total products :</th>                       
                        <td>{orderView.fields.totalProducts.integerValue}</td>
                    </tr>
                    <tr>
                        <th>Order date :</th>                       
                        <td>{orderView.fields.orderDate.stringValue}</td>
                    </tr>
                    
                </tbody>
            </table>
        </div>
    )
}

export default OrderDetails