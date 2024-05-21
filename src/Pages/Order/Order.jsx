import React, { useState, useEffect } from 'react';
import './Order.scss';
import { Link } from 'react-router-dom'
import Accordion from 'react-bootstrap/Accordion';
import { createOrder as C, getCart } from '../../services/orderService';
import * as message from '../../Components/Message/message'
import { PayPalButtons } from "@paypal/react-paypal-js";


const Order = () => {
    const serverUrl = process.env.REACT_APP_API_URL

    
    const [paid, setPaid] = useState(false)
    const [cart, setCart] = useState([])

    useEffect(() => {
        getProductCart();
    }, []);

    const getProductCart = async () => {
        const data = await getCart();
        setCart(data.cart.items);
    }

    const [paymentMethod, setPaymentMethod] = useState("")
    const [stateAddress, setStateAddress] = useState({
        
            fullname: "",
            phone: "",
            province: "",
            district: "",
            ward: "",
            address: ""
        
    })

    const changeHandler = (e) => {
        setStateAddress({...stateAddress, [e.target.name] : e.target.value})
    }

    const createNewOrder = async () => {
        const data = {
            shippingAddress: stateAddress,
            paymentMethod: paymentMethod,
            isPaid: paid
        }
        console.log(data)
        await C(data)
            .then(res => {
                if(res.success){
                    message.success(res.message);
                    window.location.reload(); 
                }
                if(res.success === false){
                    message.error(res.message)
                }
            })
            .catch((e)=> {
                console.log(e)
                message.error("Cần nhập đầy đủ thông tin")
            })
    }

    const totalPrice = cart.reduce((total, cart) => {
        return total + cart.amount * cart.productId.price * (1-cart.productId.discount*0.01);
    }, 0)

    const totalAmount = cart.reduce((amount, cart) => {
        return amount + cart.amount
    }, 0)
    
    const createOrder = (data) => {
        console.log(totalPrice)
        // Order is created on the server and the order id is returned
        return fetch(`${serverUrl}/orders`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                // use the "body" param to optionally pass additional order information
                // like product skus and quantities
                body: JSON.stringify({
                    // cart: [{
                    //     sku: "YOUR_PRODUCT_STOCK_KEEPING_UNIT",
                    //     quantity: "YOUR_PRODUCT_QUANTITY",
                    // }, ],
                    product:{
                        des:"ABC",
                        cost: totalPrice.toFixed(0)
                        // cost: "399"
                    }
                }),
            })
            .then((response) => response.json())
            .then((order) => order.id);
    };
    const onApprove = (data) => {
        // Order is captured on the server and the response is returned to the browser
        return fetch(`${serverUrl}/orders/:orderID/capture`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    orderID: data.orderID
                })
            })
            .then((response) => {
                setPaid(true)
                message.success("Thanh toán thành công") 
                response.json()
            });
    };

    return (
        <div className="wrapper">
            <div className="order-container">
                <div className="order-content-left">
                    <div className="address">
                        <div className="title">Địa chỉ giao hàng</div>
                        <div className="box-address">
                            <div style={{ width: '780px', margin: 'auto' }}>
                                <div className="item-acc">
                                    <label htmlFor="">Họ tên</label>
                                    <input value={stateAddress.fullname} onChange={changeHandler} type="text" name="fullname" />
                                </div>
                                <div className="item-acc">
                                    <label htmlFor="">Số điện thoại</label>
                                    <input value={stateAddress.phone} onChange={changeHandler} type="text" name="phone" />
                                </div>
                                <div className="item-acc">
                                    <label htmlFor="">Tỉnh/Thành phố</label>
                                    <input value={stateAddress.province} onChange={changeHandler} type="text" name="province" />
                                </div>
                                <div className="item-acc">
                                    <label htmlFor="">Quận/Huyện</label>
                                    <input value={stateAddress.district} onChange={changeHandler} type="text" name="district" />
                                </div>
                                <div className="item-acc">
                                    <label htmlFor="">Phường/Xã</label>
                                    <input value={stateAddress.ward} onChange={changeHandler} type="text" name="ward" />
                                </div>
                                <div className="item-acc">
                                    <label htmlFor="">Địa chỉ</label>
                                    <input value={stateAddress.address} onChange={changeHandler} type="text" name="address" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="order-content-right">
                    <div className="box-product">
                        <div className="header">
                            <span>Đơn hàng</span>
                            <Link to="/cart">Sửa</Link>
                        </div>
                        <div className="product-list">
                            <div className="title">{totalAmount} sản phẩm</div>
                            <Accordion>
                                <Accordion.Item eventKey="0" className='accordion-item'>
                                    <Accordion.Header>Xem thêm thông tin</Accordion.Header>
                                    <Accordion.Body>
                                        <div style={{ width: '100%' }} className="product">
                                            {
                                                cart.map((c,i) => {
                                                    return (
                                                        <div className='item-n'>
                                                            <span>{c.amount}x</span>
                                                            <Link>{c.productId.name}</Link>
                                                            <span>{(c.productId.price * c.amount * (1-c.productId.discount*0.01)).toFixed(3)}.000₫</span>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </div>
                        <div className="total-price">
                            <span>Thành tiền</span>
                            <b>
                            {
                                totalPrice.toFixed(3)
                            }.000₫
                            </b>
                        </div>
                        <div className="vat">(Đã bao gồm VAT nếu có)</div>
                    </div>

                    <div className="pay-method">Chọn hình thức thanh toán</div>

                    <div className="box-cart-pay-method">
                        <div className="item-select">
                            <input onChange={(e) => setPaymentMethod(e.target.value)} value="Thanh toán khi nhận hàng" type="radio" checked={paymentMethod === "Thanh toán khi nhận hàng"} name="pay-method" id="" />
                            <span>Thanh toán khi nhận hàng</span>
                        </div>
                        <div className="item-select">
                            <input onChange={(e) => setPaymentMethod(e.target.value)} value="Paypal" type="radio" checked={paymentMethod === "Paypal"} name="pay-method" id="" />
                            <span>Thanh toán bằng Paypal</span>
                        </div>
                    </div>

                    {
                        paymentMethod === 'Paypal'
                        ?
                        <PayPalButtons createOrder = {
                            (data, actions) => createOrder(data, actions)
                        }
                        onApprove = {
                            (data, actions) => onApprove(data, actions)
                        }
                        />
                        :
                        <></>
                    }

                    <div className="list-button">
                        {
                            paymentMethod !== 'Paypal'
                            ?
                            <button onClick={createNewOrder}>Đặt hàng</button>
                            :
                            (
                                paid === true
                                ?
                                <button onClick={createNewOrder}>Đặt hàng</button>
                                :
                                <></>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Order;