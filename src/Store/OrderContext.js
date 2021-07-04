import React, { createContext, useState } from 'react'

export const OrderContext = createContext(null)

function Order({children}) {

    const [orderView, setOrderView] = useState()

    return (
            <OrderContext.Provider value={{orderView,setOrderView}}>
                {children}
            </OrderContext.Provider>
    )
}

export default Order
