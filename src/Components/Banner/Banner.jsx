import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './Banner.scss'
import baner_1 from '../Assets/images/banner1.png';
import baner_2 from '../Assets/images/baner-2.jpg';
import baner_3 from '../Assets/images/banner3.jpg';
import banner_small from '../Assets/images/small2.jpg';
import banner_small_1 from '../Assets/images/banner-small-1.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronCircleRight, faLaptopCode } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';


const Banner = () => {

    const httpRequest = axios.create({
        baseURL: process.env.REACT_APP_API_URL
    })

    const [categoris, setCategoris] = useState([]);

    const getList = async () => {
        await httpRequest.get('/category/list')
            .then(resp => {
                setCategoris(resp.data.data)
            })
    }

    useEffect(() => {
        getList();
    }, [])

    return (

        <div className='homepage-slider'>

            <div className="sider">
                <ul>
                    {
                        categoris.map((category, index) => {
                            return (
                                <li key={index}> <FontAwesomeIcon icon={faLaptopCode} /> <Link to={`/${category._id}`}><span>{category.nameCategory}</span></Link> <FontAwesomeIcon className='icon' icon={faChevronCircleRight} /></li>
                            )
                        })
                    }
                </ul>
            </div>


            <div className="banner">
                <div className="banner-big">
                    <Carousel>
                        <Carousel.Item interval={2000}>
                            <img src={baner_1} alt="" />
                        </Carousel.Item>
                        <Carousel.Item interval={2000}>
                            <img src={baner_2} alt="" />
                        </Carousel.Item >
                        <Carousel.Item interval={2000}>
                            <img src={baner_3} alt="" />
                        </Carousel.Item>
                    </Carousel>
                </div>
                <div className="banner-small_1">
                    <img src={banner_small} alt="" />
                </div>
                <div className="banner-small_2">
                    <img src={banner_small_1} alt="" />
                </div>
            </div>
        </div>

    );
}

export default Banner;