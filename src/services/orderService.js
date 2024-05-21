import * as httpRequest from '../utils/httpRequest';

export const getCart = async () => {
    try{
        const res = await httpRequest.get('/cart', {headers: { Authorization: "Bearer " + localStorage.getItem('token') }});
        return res;
    } catch(e){
        console.log(e);
    }
}

export const addToCart = async (data) => {
    try{
        const res = await httpRequest.post('/add-to-cart', data, {headers: { Authorization: "Bearer " + localStorage.getItem('token') }})
        return res;
    } catch(e){
        console.log(e);
    }
}

export const removeFromCart = async (data) => {
    try{
        const res = await httpRequest.post('/remove-from-cart', data, {headers: { Authorization: "Bearer " + localStorage.getItem('token') }} )
        return res;
    } catch(e){
        console.log(e);
    }
}

export const increaseProduct = async (data) => {
    try{
        const res = await httpRequest.post('/increase-product', data, {headers: { Authorization: "Bearer " + localStorage.getItem('token') }})
        return res;
    } catch(e){
        console.log(e);
    }
}

export const decreaseProduct = async (data) => {
    try{
        const res = await httpRequest.post('/reduce-product', data, {headers: { Authorization: "Bearer " + localStorage.getItem('token') }})
        return res;
    } catch(e){
        console.log(e);
    }
}

export const createOrder = async (data) => {
    try{
        const res = await httpRequest.post('/create-order', data, {headers: { Authorization: "Bearer " + localStorage.getItem('token')}})
        return res;
    } catch(e){
        console.log(e)
    }
}

export const getAllOrder = async (status) => {
    try{
        const res = await httpRequest.get('/orders', {headers: { Authorization: "Bearer " + localStorage.getItem('token')}, params:{status}})
        return res;
    } catch(e){
        console.log(e);
    }
}
export const updateOrder = async (data) => {
    try{
        const res = await httpRequest.put('/update-order', data)
        return res;
    } catch(e){
        console.log(e)
    }
}