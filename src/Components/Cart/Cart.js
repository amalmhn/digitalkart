import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { CartContext } from '../../Store/CartContext'
import { TotalContext } from '../../Store/TotalContext';
import './Cart.css'

function Cart() {

    const {cartItems,setCartItems} = useContext(CartContext)
    const {setTotalPrice} = useContext(TotalContext)

    const history = useHistory()

    const itemsPrice = cartItems.reduce((a,c)=> a + c.fields.price.stringValue* c.qty , 0);

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem("cart"))
        if(cartItems.length===0){
            setCartItems(items)
        }
    }, [])// eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        localStorage.setItem("cart",JSON.stringify(cartItems))
    }, [cartItems])

    const handleAdd=(product)=>{
        const exist = cartItems.find(x=> x.id===product.id);
        if(exist){
            setCartItems(
                cartItems.map(itm=>
                    itm.id===product.id ? {...exist, qty:exist.qty+1} : itm)
            )
        }
    };

    const handleRemove=(product)=>{
        const exist = cartItems.find((x)=> x.id===product.id);
        if(exist.qty ===  1){
            setCartItems(cartItems.filter(x => x.id !== product.id))
        }else{
            setCartItems(
                cartItems.map(itm=>
                    itm.id===product.id ? {...exist, qty:exist.qty-1} : itm)
            )
        }
    }

    return (
        <div>
            <br/><br/><br/><br/><br/>
            <div className="cartTable">
         {cartItems.length===0?
            <span className="emptyCartSpan"><strong>Cart is empty</strong></span>
            :<table className="table">
                <thead>
                    <tr>
                    <th scope="col">Product</th>
                    <th scope="col">Product Name</th>
                    <th scope="col">Brand</th>
                    <th scope="col">Color</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Total</th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                {cartItems.map((product,index)=>{
                    return(
                    <tr key={index}>
                    <td style={{width:"25%"}}>
                        <img style={{width:"25%"}} src={product.fields.url.stringValue} alt="product"/>
                    </td>
                    <th>{product.fields.name.stringValue}</th>
                    <td>{product.fields.brand.stringValue}</td>
                    <td>{product.fields.ram.stringValue}</td>
                    <td>{product.qty}</td>
                    <td>&#x20B9;{product.fields.price.stringValue}</td>
                    <td><button onClick={()=>handleAdd(product)} className="btn btn-success">Add</button></td>
                    <td><button onClick={()=>handleRemove(product)} className="btn btn-danger">Remove</button></td>
                    </tr>
                    )
                })}
                </tbody>
                <tfoot>
                <tr>
                    <th scope="row">TOTAL</th>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td><strong>&#x20B9;{itemsPrice}</strong></td>
                    <td></td>
                    <td></td>
                </tr>
                </tfoot>
                </table>
                }
                {itemsPrice>40000 ? <div>
                    <div className="transLimit" >
                    <span className="transactionLimit"><strong>Transaction limit exceeded!</strong></span><br/>
                    </div>
                    <div className="transLimit2">
                    <span><strong>The maximum transaction limit for single transaction is &#x20B9;40000</strong></span>
                    </div>
                </div> : <div className="orderBtn">
                    {cartItems.length===0? "" :
                    <div> 
                    <button 
                    style={{marginLeft:"9px"}}
                     onClick={()=>{
                        setTotalPrice(itemsPrice)
                        history.push("/order")
                    }} className="btn btn-primary">Place your order</button><br/>
                    <button 
                    onClick={()=>{
                        history.push("/")
                    }}
                    style={{marginTop:"10px"}} className="btn btn-success">Continue shopping</button>
                    </div>
                    }
                </div>}
                </div>
                </div>
    )
}

export default Cart
