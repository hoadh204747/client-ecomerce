import * as httpRequest from '../utils/httpRequest';

export const createReview = async (data, productId) => {
    try{
        const res = await httpRequest.post(`/review/${productId}`, data, {headers: { Authorization: "Bearer " + localStorage.getItem('token') }})
        return res;
    } catch(e){
        console.log(e)
    }
}

export const replyComment = async (data) => {
    try{
        const res = await httpRequest.post('/reply-cmt', data, {headers: { Authorization: "Bearer " + localStorage.getItem('token') }})
        return res;
    } catch(err){
        console.log(err)
    }
}