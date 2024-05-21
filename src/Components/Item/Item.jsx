import React from "react";
import './Item.scss';
import { Link } from 'react-router-dom'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import { addToCart} from "../../services/orderService";
import * as message from '../Message/message'


const Item = (props) => {

    const handleAddToCart = async (id) => {
        try{
            const data = {productId: id, amount: 1}
            const res = await addToCart(data)
            if(res.success){
                message.success(res.message)
                window.location.reload();
            }
        } catch(e){
            console.log("Error: ", e);
        }
    }

    return (
        <div className="item">
            <div className="item-img">
                <Link to={`/product/${props.id}`}><img src={props.image} alt="" /></Link>
            </div>
            <div className="item-info">
                <div className="p-name">
                    <span className="name">{props.name}</span>
                </div>
                <div className="x">
                    <span className="price">{(props.price).toFixed(3)}.000₫</span>
                    <span className="discount">(Tiết kiêm {props.discount}%)</span>
                </div>
                <span className="price-sell">{(props.price - props.price * props.discount * 0.01).toFixed(3)}.000₫</span>
            </div>
            <div className="item-action">
                <span className="status"><CheckOutlinedIcon/>Sẵn hàng</span>
                <div onClick={() => {localStorage.getItem('token')? handleAddToCart(props.id) : alert('Bạn cần đăng nhập để tiếp tục')}} className="icon">
                    <ShoppingCartOutlinedIcon/>
                </div>
                
            </div>
        </div>
    );
}

export default Item;