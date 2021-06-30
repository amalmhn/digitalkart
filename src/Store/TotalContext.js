import React, { createContext, useState } from 'react'

export const TotalContext = createContext(null);

function Total({children}) {

    const [totalPrice, setTotalPrice] = useState()

    return (
        <TotalContext.Provider value={{totalPrice,setTotalPrice}}>
            {children}
        </TotalContext.Provider>
    )
}

export default Total
