import React, { useContext, useState, useEffect } from "react";
import './SearchResult.scss';
import { SearchContext } from "../../Context/SearchContext";
import Item from '../../Components/Item/Item';
import { getAllProduct, getAllAttrValue2, getProdByAttr } from '../../services/productService';
import { price_range } from '../../utils/priceRange';

const SearchResult = () => {

    const { searchResults } = useContext(SearchContext);

    const [priceRange, setPriceRange] = useState("")
    const [productsType, setProductsType] = useState([]);
    const [selectedValues, setSelectedValues] = useState([]);
    const [products, setProducts] = useState([])
    const [listAttr, setListAttr] = useState([])

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
                            //setSearch(false)
                        } else {
                            setProductsType([])
                            //setSearch(true)
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
            const result = await getAllAttrValue2()
            setListAttr(result.data)
        }
        fetchApi()
    }, []);

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
        const brand=""
        const fetchData = async () => {
            const data = await getAllProduct(brand, priceRange);
            setProducts(data.product)
        }
        fetchData()
    }, [priceRange])

    const brands = [...new Set(searchResults.map(p => p.brand))]


    return (
        <div style={{ width: '1650px', maxWidth: '100%', padding: '0 10px', marginLeft: 'auto', marginRight: 'auto' }}>
            <div className="search-result">
                <div className="cate-left">
                    <div className="filter-prod">
                        <span className="title">Lọc sản phẩm</span>
                        <div className="filter-item">
                            <span className='title-item'>Hãng sản xuất</span>
                            <div className='p-filter-list-value'>
                                <ul className="list-check brand">
                                    {
                                        brands.map((brand, i) => {

                                            return (
                                                <li key={i}>
                                                    <input
                                                        type="checkbox"
                                                        value={brand}
                                                        checked
                                                    //onChange={(e) => { handleBrand(e.target.value, e.target.checked) }}
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
                                productsType
                                    .filter(p => searchResults.some(s => p._id === s._id))
                                    .map((item, index) => {
                                        return (
                                            <div key={index} className="item-prod">
                                                <Item id={item._id} name={item.name} price={item.price} discount={item.discount} image={item.image[0]} />
                                            </div>
                                        )
                                    })
                                :
                                (
                                    products.length > 0
                                        ?
                                        products
                                            .filter(p => searchResults.some(s => p._id === s._id))
                                            .map((item, index) => {
                                                return (
                                                    <div key={index} className="item-prod">
                                                        <Item id={item._id} name={item.name} price={item.price} discount={item.discount} image={item.image[0]} />
                                                    </div>
                                                )
                                            })
                                        :
                                        (
                                            // search
                                            // ?
                                            <div>Ko tim thay san pham nao</div>
                                            // :
                                            // searchResults.map((item, index) => {
                                            //     return (
                                            //         <div key={index} className="item-prod">
                                            //             <Item id={item._id} name={item.name} price={item.price} discount={item.discount} image={item.image[0]} />
                                            //         </div>
                                            //     )
                                            // })
                                        )
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchResult;