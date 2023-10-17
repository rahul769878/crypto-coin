import React, { Children, createContext, useContext, useState, useEffect } from 'react';

const crypto = createContext() 

const CryptoContext = ({children}) => {

    const [currency, setCurrency] = useState("INR")
    const [symbol, setSymbol] = useState("₹")

    useEffect(() => {
        if(currency === "INR") setSymbol("₹")
        if(currency === "USD") setSymbol("$")
    }, [currency])
   
    return <crypto.Provider value={{currency, setCurrency, symbol}}>
       {children}
    </crypto.Provider>;
}

export default CryptoContext;

 export const CryptoState =()=>{
    return useContext(crypto)
 } 