import React , {useState, useEffect} from "react";
//import { Link } from "react-router-dom";
import './CateHomePage.scss';
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { getAllProduct, getListCate } from "../../services/productService";
import Item from "../Item/Item";

const CateHomePage = () => {

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        // customPaging: function(i) {
        //     return (
        //         <div className="custom-slide-item">{i + 1}</div>
        //     );
        // }
    };

    const [products, setProducts] = useState([])
    const [category, setCategory] = useState([])

    useEffect(() => {
        const  fetchProduct = async () => {
            const data = await getAllProduct();
            setProducts(data.product);
        }
        const fetchCategory = async () => {
            const data = await getListCate();
            setCategory(data.data)
        }
        fetchProduct()
        fetchCategory()
    },[])

    return (  
        <div className="cate-homepage">
            {
                category.map((c,i) => {
                    return (
                        <div className="product-homepage" key={i}>
                            <div className="wrapper-block">
                                <div className="title">
                                    <h2 className="h_title">{c.nameCategory}</h2>
                                    <div className="sub-cat-title"></div>
                                    {/* <Link to={`/${c._id}`}>Xem tất cả</Link> */}
                                    <a href={`/${c._id}`}>Xem tất cả</a>
                                </div>
                            </div>
                            <div className="wrapper-block">
                                <div className="products">
                                    <Slider {...settings}>
                                        {
                                            products.map((p, i) => {
                                                if (p.category._id === c._id) {
                                                    return (
                                                        <div className="item-wrapper" style={{marginRight: '50px'}}>
                                                            <Item key={i} id={p._id} name={p.name} price={p.price} discount={p.discount} image={p.image[0]} />
                                                        </div>
                                                    )
                                                } else {
                                                    return null
                                                }
                                            })
                                        }
                                    </Slider>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    );
}
 
export default CateHomePage;