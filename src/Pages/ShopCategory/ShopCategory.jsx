import React, { useEffect, useState } from 'react';
import Item from '../../Components/Item/Item';
import './ShopCategory.scss';
import { useParams } from 'react-router-dom';
import { getAllProduct, getAllAttrValue, getProdByAttr } from '../../services/productService';
import { price_range } from '../../utils/priceRange';

import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const ShopCategory = () => {
    const [priceRange, setPriceRange] = useState("")
    const [selectedBrand, setSelectedBrand] = useState("")
    const [productsType, setProductsType] = useState([]);
    const [selectedValues, setSelectedValues] = useState([]);
    const [products, setProducts] = useState([])
    const [brand, setBrand] = useState("")
    const [listAttr, setListAttr] = useState([])
    const [search, setSearch] = useState(false);
    const { categoryId } = useParams()


    const handleBrand = (value, checked) => {
        if (checked) {
            setBrand(value)
            setSelectedBrand(value);
            //console.log("brand",brand)
        } else {
            setSelectedBrand("");
            setBrand("")
            //console.log("brand",brand)
        }
    }

    const handleSelectedValues = (value, checked) => {
        if (checked) {
            setSelectedValues([...selectedValues, value])
        } else {
            setSelectedValues(selectedValues.filter((v) => v !== value))
        }
    }

    const fetchProdByAttr = async () => {
        let productArr;
        const queryString = selectedValues.join("&")
        if (queryString.length > 0) {
            await getProdByAttr(queryString)
                .then((response) => {
                    if (response.success) {
                        productArr = response.data;
                        if (productArr[0].productDetail.length > 0) {
                            setProductsType(productArr[0].productDetail)
                            setSearch(false)
                        } else {
                            setProductsType([])
                            setSearch(true)
                        }
                    }
                })
                .catch(e => {
                    console.log(e)
                });
        }
        else {
            setProductsType([])
        }
    }

    useEffect(() => {
        fetchProdByAttr();
    }, [selectedValues]);

    useEffect(() => {
        const fetchApi = async () => {
            const result = await getAllAttrValue(categoryId)
            setListAttr(result.data)
        }
        fetchApi()
    }, [categoryId]);

    const groupedArray = listAttr.reduce((accumulator, currentValue) => {
        const existingCategory = accumulator.find(group => group[0].attributeId.name === currentValue.attributeId.name);
        if (existingCategory) {
            const existingObject = existingCategory.find(item => item.value === currentValue.value);
            if (!existingObject) {
                existingCategory.push(currentValue);
            }
        } else {
            accumulator.push([currentValue]);
        }
        return accumulator;
    }, [])


    useEffect(() => {
        const fetchData = async () => {
            const data = await getAllProduct(brand, priceRange);
            setProducts(data.product)
        }
        fetchData()
    }, [brand, priceRange])

    const brands = [...new Set(products.filter(product => product.category._id === categoryId).map(product => product.brand))];

    const breadcrumbs = [
        <Link underline="hover" key="1" color="inherit" href="/" >
            Trang chủ
        </Link>,
        <Typography key="3" color="text.primary">
            {
                products?.find((p) => {
                    return p.category._id === categoryId
                })?.category?.nameCategory
            }
        </Typography>,
    ];

    return (
        <div style={{ width: '1650px', maxWidth: '100%', padding: '0 10px', marginLeft: 'auto', marginRight: 'auto' }}>
             <Breadcrumbs
                separator={<NavigateNextIcon fontSize="small" />}
                aria-label="breadcrumb"
            >
                {breadcrumbs}
            </Breadcrumbs>
            <div className='shop-category'>
                <div className="cate-left">
                    <div className="filter-prod">
                        <span className="title">Lọc sản phẩm</span>
                        <div className="filter-item">
                            <span className='title-item'>Hãng sản xuất</span>
                            <div className='p-filter-list-value'>
                                <ul className="list-check brand">
                                    {
                                        brands.map((brand, i) => {
                                            const isChecked = brand === selectedBrand;
                                            return (
                                                <li key={i}>
                                                    <input
                                                        type="checkbox"
                                                        value={brand}
                                                        checked={isChecked}
                                                        onChange={(e) => { handleBrand(e.target.value, e.target.checked) }}
                                                    />
                                                    <span> {brand}</span>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                        <div className="filter-item">
                            <span className='title-item'>Khoảng giá</span>
                            <div className='p-filter-list-value'>
                                <ul className="list-check">
                                    {
                                        price_range.map((price) => {
                                            return (
                                                <li key={price.id}>
                                                    <input
                                                        type="radio"
                                                        value={price.value}
                                                        checked={price.value === priceRange}
                                                        onChange={(e) => { setPriceRange(e.target.value) }}
                                                    />
                                                    <span> {price.name}</span>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                        {
                            groupedArray.map((grouped, i) => {
                                return (
                                    <div className="filter-item">
                                        <span className='title-item'>{grouped[0].attributeId.name}</span>
                                        <div className='p-filter-list-value'>
                                            <ul className="list-check">
                                                {
                                                    grouped.map((g, i) => {
                                                        return (
                                                            <li key={i}>
                                                                <input
                                                                    name={g.attributeId.name}
                                                                    type="checkbox"
                                                                    value={`${g.attributeId.slug}=${g.slug}`}
                                                                    onChange={(e) => { handleSelectedValues(e.target.value, e.target.checked) }}
                                                                />
                                                                <span htmlFor={g.attributeId.name}> {g.value} </span>

                                                            </li>
                                                        )
                                                    })
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

                <div className="cate-right">
                    <div className="cate-product-list">
                        {
                            productsType.length > 0
                                ?
                                productsType.map((product, i) => {
                                    if (product.category === categoryId) {
                                        return (
                                            <div key={i} className="item-prod">
                                                <Item id={product._id} name={product.name} price={product.price} discount={product.discount} image={product.image[0]} />
                                            </div>
                                        )
                                    } else {
                                        return null
                                    }
                                })
                                :
                                (
                                    search
                                        ?
                                        <div>Ko tim thay san pham nao</div>
                                        :
                                        products.map((product, i) => {
                                            if (product.category._id === categoryId) {
                                                return (
                                                    <div key={i} className="item-prod">
                                                        <Item id={product._id} name={product.name} price={product.price} discount={product.discount} image={product.image[0]} />
                                                    </div>
                                                )
                                            } else {
                                                return null
                                            }
                                        })
                                )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShopCategory;