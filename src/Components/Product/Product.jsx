import './Product.scss'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { addToCart } from '../../services/orderService';
import { useState } from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import { useNavigate} from "react-router-dom";
import * as message from '../Message/message'

const Product = (props) => {
    const navigate = useNavigate();
    const { totalRating, count } = props.reviews.reduce((accumulator, currentValue) => {
        if (currentValue.reviewId.rating !== null && !isNaN(currentValue.reviewId.rating) && currentValue.reviewId.rating !== '') {
            accumulator.totalRating += parseFloat(currentValue.reviewId.rating);
            accumulator.count++;
        }
        return accumulator;
    }, { totalRating: 0, count: 0 });

    const product = props.product;
    const images = props.images;
    const attribute = props.attributeValues;

    const [amount, setAmount] = useState(1)

    const increment = () => {
        setAmount((m) => m + 1)
    }
    const deincrement = () => {
        if (amount > 1) {
            setAmount((m) => m - 1)
        }
    }

    const handleAddToCart = async (id) => {
        const data = { productId: id, amount: amount }
        try {
            const res = await addToCart(data)
            if (res.success) {
                message.success(res.message)
                navigate('/cart')
                window.location.reload();
            }
        } catch (e) {
            console.log("Error: ", e);
        }
    }

    return (
        <div className="product-display">
            <div className="product-detail-header">
                <div className="product-detail-title">
                    <h1>{product.name}</h1>
                </div>
            </div>
            <div style={{ width: '100%', height: 'auto', display: 'flex', gap: '30px' }}>
                <div className="product-display-left">
                    <div id="carouselExampleIndicators" className="carousel slide wrapper" data-bs-ride="carousel" data-bs-interval="1500">
                        <div className="carousel-indicators">
                            {images.map((image, index) => (
                                <button
                                    type="button"
                                    key={index}
                                    data-bs-target="#carouselExampleIndicators"
                                    data-bs-slide-to={index}
                                    className={index === 0 ? "active" : ""}
                                    aria-current={index === 0 ? "true" : ""}
                                    aria-label={`Slide ${index + 1}`}
                                >
                                    <img src={image} alt={`Slide ${index + 1}`} />
                                </button>
                            ))}
                        </div>
                        <div className="carousel-inner">
                            {images.map((image, index) => (
                                <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
                                    <img src={image} alt={`Slide ${index + 1}`} />
                                </div>
                            ))}
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>

                </div>
                <div className="product-display-right">
                    <div className="product-detail-info">
                        <div className="product-meta">
                            Đánh giá:
                            <Box className="rank"
                                sx={{
                                    '& > legend': { mt: 2 },
                                }}
                            >
                                <Rating
                                    className="star"
                                    name="read-only"
                                    readOnly
                                    value={parseFloat(totalRating / count)}
                                    precision={0.5}
                                />
                            </Box>
                            <span>{count}</span>
                            <div style={{ background: '#aeaeae', width: '1px', height: '20px', margin: '0px 10px' }}></div>
                            Đã bán:
                            <span>{product.sold}</span>

                        </div>
                        <div className="product-summary">
                            <div className="description">
                                <span>{product.description}</span>
                            </div>
                            <div className="title">Thông số sản phẩm</div>
                            <div className="list-attribute">
                                {
                                    attribute.length > 0
                                        ?
                                        attribute.map((a, index) => {
                                            return (
                                                <p key={index}><span>{a.attributeId.name}: </span>{a.value}</p>
                                            )
                                        })
                                        :
                                        <div>
                                            <span style={{ fontSize: '18px', color: 'green' }}>Các thông tin về sản phẩm đang chờ cập nhật thêm</span>
                                        </div>
                                }
                            </div>
                        </div>
                        <div className="product-price">
                            <strong className='giakm'>{(product.price - product.price * product.discount * 0.01).toFixed(3)}.000₫</strong>
                            <strong className='giany'>{(product.price).toFixed(3)}.000₫</strong>
                            <label className='tietkiem'>Tiết kiệm {(product.price * product.discount * 0.01).toFixed(3)}.000₫</label>
                        </div>
                        <div className="box-number-quantity">
                            <span className="so-luong">Số lượng:</span>
                            <div className="new-cart-quantity">
                                <span onClick={deincrement}>-</span>
                                <input value={amount} />
                                <span onClick={increment}>+</span>
                            </div>
                            <div className="add-to-cart" onClick={() => { localStorage.getItem('token') ? handleAddToCart(product._id) : alert('Bạn cần đăng nhập để tiếp tục') }}>
                                <ShoppingCartOutlinedIcon />
                                <span>Thêm vào giỏ hàng</span>
                            </div>
                        </div>
                        <div className="button">
                            <div className="mua-ngay">
                                <span onClick={() => { localStorage.getItem('token') ? handleAddToCart(product._id) : alert('Bạn cần đăng nhập để tiếp tục') }}>Đặt mua ngay</span>
                                <span>Giao nhanh tận nơi,miễn phí toàn quốc</span>
                            </div>
                        </div>
                    </div>
                    <div className="static-content">
                        <div className="chinh-sach x">
                            <div className="title">YÊN TÂM MUA HÀNG</div>
                            <div className="content">
                                <p>Uy tín top đầu thị trường</p>
                                <p>Sản phẩm chính hãng 100%</p>
                                <p>Trả góp lãi suất 0% toàn bộ giỏ hàng</p>
                                <p>Trả bảo hành tận nơi sử dụng</p>
                                <p>Bảo hành tận nơi cho doanh nghiệp</p>
                                <p>Vệ sinh miễn phí trọn đời PC, Laptop</p>
                            </div>
                        </div>
                        <div className="shipping x">
                            <div className="title">MIỄN PHÍ GIAO HÀNG</div>
                            <div className="content">
                                <p>Giao hàng miễn phí toàn quốc</p>
                                <p>Nhận hàng và thanh toán tại nhà</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Product;