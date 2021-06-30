import React,{createContext,useState} from 'react'

export const CartContext = createContext(null);

function Cart({children}) {

    const [cartItems, setCartItems] = useState([])

    return (
        <CartContext.Provider value={{cartItems,setCartItems}}>
            {children}
        </CartContext.Provider>
    )
}

export default Cart
