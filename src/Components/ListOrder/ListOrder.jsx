import React, { useEffect, useState } from "react";
import './ListOrder.scss';
import { Link, useSearchParams } from 'react-router-dom'
import { getAllOrder, updateOrder } from "../../services/orderService";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';



const ListOrder = () => {
    
    const [params] = useSearchParams()
    const status = params.get('status')

    const [tab, setTab] = useState('all')

    const [orders, setOrders] = useState([])

    const order = async () => {
        await getAllOrder(status)
            .then((res) => {
                if (res.success) {
                    setOrders(res.data)
                }
            })
    }
    order();
    useEffect(() => {
    }, [status])

    const updateStatusOrder = async (id, newStatus) => {
        const data = {
            orderId: id,
            status: newStatus
        }
        await updateOrder(data)
            .then((resp) => {
                if (resp.success) {
                    alert(resp.message)
                }
            })
        await order()
        //window.location.reload()
    }

    return (
        <div className="list-order">
            <div className="list-tab">
                <Link onClick={() => {setTab('all')}} className={tab === 'all' ? 'active' : ''} >Tất cả</Link>
                <Link to={"/account/orders?status=cho-xac-nhan"} onClick={() => {setTab('cho-xac-nhan')}} className={tab === 'cho-xac-nhan' ? 'active' : ''}>Chờ xác nhận</Link>
                <Link to={"/account/orders?status=chuan-bi-hang"} onClick={() => { setTab('chuan-bi-hang') }} className={tab === 'chuan-bi-hang' ? 'active' : ''}>Chuẩn bị hàng</Link>
                <Link to={"/account/orders?status=dang-giao"} onClick={() => {setTab('dang-giao')}} className={tab === 'dang-giao' ? 'active' : ''}>Đang giao</Link>
                <Link to={"/account/orders?status=da-giao"} onClick={() => {setTab('da-giao')}} className={tab === 'da-giao' ? 'active' : ''}>Đã giao</Link>
                <Link to={"/account/orders?status=da-huy"} onClick={() => {setTab('da-huy')}} className={tab === 'da-huy' ? 'active' : ''}>Đã hủy</Link>
            </div>
            <div className="content-tab">
                <div style={{  width: '100%' }}>
                    <TableContainer component={Paper} className="table">
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell className='tableCell' sx={{ width: '10%' }}>Mã đơn hàng</TableCell>
                                        <TableCell className='tableCell' sx={{ width: '30%' }}>Sản phẩm</TableCell>
                                        <TableCell className='tableCell' sx={{ width: '8%' }}>Phương thức thanh toán</TableCell>
                                        <TableCell className='tableCell' sx={{ width: '10%' }}>Tổng giá</TableCell>
                                        <TableCell className='tableCell' sx={{ width: '8%' }}>Ngày tạo</TableCell>
                                        <TableCell className='tableCell' sx={{ width: '10%' }}>Trạng thái</TableCell>
                                        
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {orders.map((order) => {

                                        return (
                                            <TableRow key={order._id} >
                                                <TableCell className='tableCell'>
                                                    {order._id}
                                                </TableCell>
                                                <TableCell className='tableCell'>
                                                    <ul>
                                                        {order.orderItems.map((item) => {
                                                            return (
                                                                <li>
                                                                    <span>{item.amount}x</span>
                                                                    <img src={item.product.image[0]} alt="" />
                                                                    <span>{item.product.name}</span>
                                                                </li>
                                                            )
                                                        })}
                                                    </ul>
                                                </TableCell>
                                                <TableCell className='tableCell'>{order.paymentMethod}</TableCell>
                                                <TableCell className='tableCell'>{(order.totalPrice).toFixed(3)}.000₫</TableCell>
                                                <TableCell className='tableCell'>{new Date(order.createdAt).toLocaleString()}</TableCell>
                                                <TableCell className='tableCell'><span className={`status ${order.slugStatus}`}>{order.status}</span></TableCell>
                                                <TableCell className='tableCell'></TableCell>
                                                <TableCell className='tableCell'>
                                                    <div className='cellAction'>
                                                        {
                                                            order.slugStatus === 'cho-xac-nhan'
                                                            ?
                                                            <span onClick={()=> {updateStatusOrder(order._id, "Đã hủy")}} className="btn">Hủy đơn</span>
                                                            :
                                                            <></>
                                                        }
                                                    </div>
                                                </TableCell>

                                            </TableRow>
                                        )

                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                </div>
            </div>
        </div>
    );
}

export default ListOrder;