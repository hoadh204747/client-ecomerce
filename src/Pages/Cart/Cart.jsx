import React, { useEffect, useState } from 'react';
import {Link as L} from 'react-router-dom'
import './Cart.scss';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import {getCart, removeFromCart, increaseProduct, decreaseProduct} from '../../services/orderService';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import cart_img from '../../Components/Assets/images/cart.png'

import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';


const Cart = () => {

    const [cart, setCart] = useState([])

    const getProductCart = async () => {
        const data = await getCart();
        setCart(data.cart.items);
    }
    useEffect(() => {
        getProductCart();
    }, []);
    
    const removeItem = async (id) => {
        const data = {productId: id}
        await removeFromCart(data)
            .then(res => {
                if(res.success){
                    alert(res.message);
                    window.location.reload()
                }
            })
        await getProductCart()
    }

    const handleChangeProduct = async (id) => {
        const data = {productId: id}
        await increaseProduct(data)
        await getProductCart()
    }

    const handleDecreaseProduct = async (id) => {
        const data = {productId: id}
        await decreaseProduct(data)
        await getProductCart()
    }

    const totalPrice = cart.reduce((total, cart) => {
        return total + cart.amount * cart.productId.price * (1-cart.productId.discount*0.01);
    }, 0)

    if(cart.length === 0){
        return (
            <div className="cart">
                <div className="title">Giỏ hàng</div>
                <div className="not-item-in-cart">
                    <div className="tk-ct-null">
                        <img src={cart_img} alt="" />
                        <div className="tk-null-note">Không có sản phẩm nào trong giỏ hàng</div>
                        <L to={'/'}>Tiếp tục mua sắm</L>
                    </div>
                </div>
            </div>
        )
    }

    const breadcrumbs = [
        <Link underline="hover" key="1" color="inherit" href="/" >
            Trang chủ
        </Link>,
        
        <Typography key="3" color="text.primary">
            Giỏ hàng
        </Typography>,
    ];

    return (
        <div className="cart">
             <Breadcrumbs
                separator={<NavigateNextIcon fontSize="small" />}
                aria-label="breadcrumb"
            >
                {breadcrumbs}
            </Breadcrumbs>
            <div className="title">Giỏ hàng</div>
            <div className="cart-content">
                <div className="cart-content-left">
                    <div className="header-cart-ct-left">
                        <div className="cart-col-product">
                            {/* <input type="checkbox" /> */}
                            <span>Tất cả ({cart?.length} sản phẩm)</span>
                        </div>
                        <div className="cart-col-price">Đơn giá</div>
                        <div className="cart-col-quantity">Số lượng</div>
                        <div className="cart-col-total-price">Thành tiền</div>
                        <div className="cart-col-delete">
                            <OverlayTrigger
                                placement="bottom"
                                overlay={
                                    <Tooltip id='tooltip-bottom'>
                                        Xóa toàn bộ khỏi giỏ hàng
                                    </Tooltip>
                                }
                            >
                                <DeleteForeverOutlinedIcon className='icon-delete' />
                            </OverlayTrigger>
                        </div>
                    </div>

                    <div className="cart-list-item">
                        {
                            cart.map((c, i) => {
                                return (
                                    <div className="a-item" key={i}>
                                        <div className="cart-col-product">
                                            {/* <input type="checkbox" /> */}
                                            <div className="image">
                                                <img src={c.productId.image[0]} alt="" />
                                            </div>
                                            <div className="info">
                                                <span>{c.productId.name}</span>
                                            </div>
                                        </div>
                                        <div className="cart-col-price"><span className='price'>{c.productId.price}.000.000₫</span></div>
                                        <div className="cart-col-quantity">
                                            <div className="new-cart-quantity">
                                                {
                                                    c.amount > 1
                                                    ? <span onClick={() => {handleDecreaseProduct(c._id)}}>-</span>
                                                    : <span>-</span>
                                                }
                                                <input value={c.amount} />
                                                <span onClick={() => {handleChangeProduct(c._id)}}>+</span>
                                            </div>
                                        </div>
                                        <div className="cart-col-total-price"><span className='total-price'>{(c.productId.price * c.amount * (1-c.productId.discount*0.01)).toFixed(3)}.000₫</span></div>
                                        <div className="cart-col-delete">
                                            <OverlayTrigger
                                                placement="bottom"
                                                overlay={
                                                    <Tooltip id='tooltip-bottom'>
                                                        Xóa khỏi giỏ hàng
                                                    </Tooltip>
                                                }
                                            >
                                                <DeleteForeverOutlinedIcon onClick={() => {removeItem(c.productId._id)}} className='icon-delete' />
                                            </OverlayTrigger>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="cart-content-right">
                    <div className="box-cart-total">
                        <span>Tổng tiền</span>
                        <span>
                            {
                                totalPrice.toFixed(3)
                            }
                        .000₫</span>
                    </div>
                    <span className="vat">
                        Đã bao gồm VAT (thuế)
                    </span>
                    <L to={'/order'}><button>Tiến hành đặt hàng</button></L>
                </div>
            </div>
        </div>
    );
}

export default Cart;