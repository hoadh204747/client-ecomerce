import * as httpRequest from '../utils/httpRequest';

export const getAllProduct = async (brand, price) => {
    try{
        const res = await httpRequest.get('/product', {params:{brand, price}});
        return res;
    } catch (e){
        console.log(e);
    }
}

export const getProduct = async (id) => {
    try{
        const res = await httpRequest.get(`/product/${id}`);
        return res;
    } catch (e){
        console.error('Failed to load product', e);
    }
}

export const getAttributeByProductId = async (id) => {
    try{
        const res = await httpRequest.get(`/attribute/${id}`);
        return res;
    } catch (e){
        console.log(e);
    }
}

export const getListCate = async () => {
    try{
        const res = await httpRequest.get('/category/list');
        return res;
    } catch (e){
        console.log(e)
    }
}

export const getAllAttrValue = async (categoryId) => {
    try{
        const res = await httpRequest.get(`/all-attributes-value/${categoryId}`);
        return res;
    } catch(e){
        console.log(e)
    }
}

// lấy tất cả value k phụ thuộc categoryId
export const getAllAttrValue2 = async () => {
    try{
        const res = await httpRequest.get(`/all-attr-value`);
        return res;
    } catch(e){
        console.log(e)
    }
}

export const getProdByAttr = async (queryString) => {
    try{
        const res = await httpRequest.get(`/prod-by-attr?${queryString}`);
        return res;
    } catch(e){
        console.log(e)
    }
}

export const searchProduct = async (data) => {
    try{
        const res = await httpRequest.post('/product/search', data);
        return res;
    } catch(err){
        console.log(err)
    }
}

export const soldExpProduct = async () => {
    try{
        const res = await httpRequest.get('/product/soldExpProduct')
        return res;
    } catch(err){
        console.log(err)
    }
}