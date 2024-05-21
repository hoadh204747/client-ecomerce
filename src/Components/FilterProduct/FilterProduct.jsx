import React, { useEffect, useState } from "react";
import './FilterProduct.scss';

import { getAllAttrValue } from "../../services/productService";

const FilterProduct = () => {

    const [listAttr, setListAttr] = useState([])

    useEffect(() => {
        const fetchApi = async () => {
            const result = await getAllAttrValue()
            setListAttr(result.data)
        }
        fetchApi()
    }, []);

    const grouped = listAttr.reduce((accumulator, currentValue) => {
        accumulator[currentValue.attributeId.name] = (accumulator[currentValue.attributeId.name] || []).concat([currentValue])
        return accumulator
      }, {}) 
    const groupedArray = Object.values(grouped)

    return (
        <div className="filter-prod">
            <span className="title">Lọc sản phẩm</span>
            {
                groupedArray.map((grouped, i) => {
                    return (
                        <div className="filter-item">
                            <span>{grouped[0].attributeId.name}</span>
                            <div className="filter-list-value">
                                <ul className="list-check">
                                    {
                                        grouped.map((g,i) => {
                                            return (
                                                <li>
                                                    <input type="checkbox" name="" id="" />
                                                    <span> {g.value} </span>

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
    );
}

export default FilterProduct;