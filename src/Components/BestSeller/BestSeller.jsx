import './BestSeller.scss';
import Carousel from 'react-bootstrap/Carousel';
import Item from '../Item/Item'
import { soldExpProduct } from '../../services/productService';
import { useEffect, useState } from 'react';

const BestSeller = () => {

    const [products, setProducts] = useState([])
    useEffect(() => {
        const fetchApi = async () => {
            await soldExpProduct()
                .then((res) => {
                    setProducts(res)
                })
        }
        fetchApi();
    }, [])

    const newSortProArray = products.reduce((accumulator, currentValue) => {
        const exitPro = accumulator.find(item => item[0].category._id === currentValue.category._id)
        if (exitPro) {
            exitPro.push(currentValue)
        } else {
            accumulator.push([currentValue])
        }
        return accumulator;
    }, [])


    return (
        <div className="best-seller">
            {
                newSortProArray.slice(0,4).map((item, index) => {
                    return (
                        <div key={index} className="collection">
                            <span className='title'>TOP {item[0].category.nameCategory}
                                <br />
                                BÁN CHẠY NHẤT 2024
                            </span>
                            <div className="collection-item">
                                <Carousel
                                    prevIcon={<span aria-hidden="true" class="carousel-control-prev-icon icon"></span>}
                                    nextIcon={<span aria-hidden="true" class="carousel-control-next-icon icon"></span>}
                                >
                                    {
                                        item.map((i, ind) => {
                                            return (
                                                <Carousel.Item key={ind} interval={1000} >
                                                    <div className='item-prod'>
                                                        <Item id={i._id} name={i.name} price={i.price} discount={i.discount} image={i.image[0]}/>
                                                    </div>
                                                </Carousel.Item>
                                            )
                                        })
                                    }
                                </Carousel>
                            </div>
                        </div>
                    )
                })
            }


        </div>
    );
}

export default BestSeller;