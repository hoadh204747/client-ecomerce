import React, { useEffect, useState } from "react";
import './ProductDisplay.scss'
import { useParams } from "react-router-dom";
import Product from "../../Components/Product/Product";
import { getProduct, getAttributeByProductId } from "../../services/productService";

import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import Review from "../../Components/Reviews/Review";


const ProductDisplay = () => {



    const [product, setProduct] = useState('')
    const [images, setImages] = useState([])
    const [attributeValue, setAttributeValue] = useState([])
    const { productId } = useParams()
    useEffect(() => {
        const fetchData = async () => {
            const data = await getProduct(productId);
            setProduct(data);
            setImages(data.image);
        }
        fetchData()
    }, [productId])
    useEffect(() => {
        const fetchData = async () => {
            const data = await getAttributeByProductId(productId);
            setAttributeValue(data)
        }
        fetchData()
    }, [productId])

    const breadcrumbs = [
        <Link underline="hover" key="1" color="inherit" href="/" >
            Trang chủ
        </Link>,
        <Link
            underline="hover"
            key="2"
            color="inherit"
            href="/"
        >
            {product?.category?.nameCategory}
        </Link>,
        <Typography key="3" color="text.primary">
            {product?.name}
        </Typography>,
    ];

    if (!product) {
        return <div className="container" style={{ width: '1350px', maxWidth: '100%', padding: '0 10px', marginLeft: 'auto', marginRight: 'auto' }}>
            <p>Sản phẩm đang được cập nhập thêm</p>
            <p>Mời bạn xem sản phẩm khác</p>
        </div>;
    }

    return (
        <div className="container" style={{ width: '1350px', maxWidth: '100%', padding: '0 10px', marginLeft: 'auto', marginRight: 'auto' }}>
            <Breadcrumbs
                separator={<NavigateNextIcon fontSize="small" />}
                aria-label="breadcrumb"
            >
                {breadcrumbs}
            </Breadcrumbs>
            <Product product={product} images={images} attributeValues={attributeValue} reviews={product.reviews} />
            <Review reviews={product.reviews} productId={product._id} />
        </div>
    )
}

export default ProductDisplay;