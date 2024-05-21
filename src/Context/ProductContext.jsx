import React, { createContext, useEffect, useState } from 'react';
import httpRequest from '../utils/httpRequest';

export const ProductContext = createContext()

const ProductContextProvider = ({ children }) => {
    const [products, setProducts] = useState('')

    useEffect(() => {
        httpRequest.get(`/product`)
            .then(res => {
                setProducts(res.data.product)
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <ProductContext.Provider value={products}>
            {children}
        </ProductContext.Provider>
    )
}

export default ProductContextProvider;