import * as httpRequest from '../utils/httpRequest';

export const registerUser = async (data) => {
    try {
        const res = await httpRequest.post('auth/register', data);
        return res;
    } catch (e) {
        console.log(e);
    }
}

export const loginUser = async (data) => {
    try {
        const res = await httpRequest.post('auth/login', data);
        return res;
    } catch (e) {
        console.log(e);
    }
}

export const logoutUser = async () => {
    try {
        const res = await httpRequest.get('auth/logout');
        return res;
    } catch (e) {
        console.log(e);
    }
}

export const updateInfoUser = async (data, id) => {
    try{
        const res = await httpRequest.put(`auth/update/${id}`, data, {headers: { Authorization: "Bearer " + localStorage.getItem('token') }})
        return res;
    } catch(err){
        console.log(err)
    }
}

export const getInfoUser = async () => {
    try{
        const res = await httpRequest.get('auth/info-user', {headers: { Authorization: "Bearer " + localStorage.getItem('token') }})
        return res;
    } catch(err){
        console.log(err)
    }
} 