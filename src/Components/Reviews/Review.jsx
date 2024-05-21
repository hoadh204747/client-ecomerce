import React, { useState, useEffect } from "react";
import './Review.scss'
import { createReview, replyComment } from "../../services/reviewService";

import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import * as message from '../Message/message'


const labels = {
    1: 'Không thích',
    2: 'Tạm được',
    3: 'Bình thường',
    4: 'Hài lòng',
    5: 'Rất hài lòng',
};

function getLabelText(value) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

const Review = (props) => {
    const [btn, setBtn] = useState(true)
    const [btnReply, setBtnReply] = useState(true)
    const [value, setValue] = useState(5);
    const [hover, setHover] = useState(-1);

    const [danhgia, setDanhgia] = useState({
        rating: "5",
        comment: ""
    })
    useEffect(() => {
        const savedScrollPosition = localStorage.getItem('scrollPosition');
        if (savedScrollPosition) {
            window.scrollTo(0, parseInt(savedScrollPosition, 10));
            localStorage.removeItem('scrollPosition');
        }
    }, []);
    const handleChange = (e) => {
        setDanhgia({...danhgia, [e.target.name]: e.target.value})
    }
    const handleSubmit = async () => {
        const resp = await createReview(danhgia, props.productId)
        if(resp.success){
            message.success(resp.message)
            localStorage.setItem('scrollPosition', window.scrollY);
            window.location.reload();
        }
    }
    const handleSubmitOnlyCmt = async () => {
        const data = {
            rating: "",
            comment: danhgia.comment
        }
        const resp = await createReview(data, props.productId)
        if(resp.success){
            message.success(resp.message)
            localStorage.setItem('scrollPosition', window.scrollY);
            window.location.reload();
        }
    }

    const handleReplyCmt = async (data) => {
        const resp = await replyComment(data)
        if(resp.success){
            message.success(resp.message)
            localStorage.setItem('scrollPosition', window.scrollY);
            window.location.reload();
        }
    }

    const { totalRating, count } = props.reviews.reduce((accumulator, currentValue) => {
        if (currentValue.reviewId.rating !== null && !isNaN(currentValue.reviewId.rating) && currentValue.reviewId.rating !== '') {
            accumulator.totalRating += parseFloat(currentValue.reviewId.rating);
            accumulator.count++;
        }
        return accumulator;
    }, { totalRating: 0, count: 0 });

    let ratingCounts = [0, 0, 0, 0, 0];
    props.reviews.forEach(review => {
        if (review.reviewId.rating >= 1 && review.reviewId.rating <= 5) {
            ratingCounts[review.reviewId.rating - 1]++
        }
    })

    return (
        <div className="reviews-wrapper">
            <div className="reviews-content">
                <h2>Khách hàng chấm điểm, đánh giá, nhận xét</h2>

                <div className="reviews">
                    <div className="review-box">
                        <div className="review-info">
                            <div className="avgRate">
                                <span>{isNaN(totalRating / count) ? 0 : (totalRating / count).toFixed(1)}/5 <StarOutlinedIcon className="icon" /></span>

                            </div>
                            <div className="avg-rate-count">
                                {ratingCounts.reverse().map((rate, index) => {
                                    const reversedIndex = 5 - index;
                                    return (
                                        <div key={reversedIndex} className="avg-rate-item">
                                            <span className="rate-number">{reversedIndex} <StarOutlinedIcon /></span>
                                            <span className="total-avg-rate"><strong>{rate}</strong> đánh giá</span>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="btn-review">
                                <span className="span-title">Chia sẻ nhận xét của bạn</span>
                                {
                                    btn
                                        ?
                                        <p onClick={() => { setBtn(false) }}>Gửi đánh giá của bạn</p>
                                        :
                                        <p onClick={() => { setBtn(true) }}>Đóng lại !</p>
                                }
                            </div>
                        </div>
                        <div className="form-review" style={{ display: btn ? 'none' : 'block' }} >
                            <div className="star-rank">
                                <span>Chọn đánh giá của bạn</span>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Rating
                                        name="rating"
                                        value={danhgia.rating}
                                        precision={1}
                                        getLabelText={getLabelText}
                                        // onChange={(event, newValue) => {
                                        //     setValue(newValue);
                                        // }}
                                        onChange={handleChange}
                                        onChangeActive={(event, newHover) => {
                                            setHover(newHover);
                                        }}
                                        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                    />
                                    {value !== null && (
                                        <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
                                    )}
                                </Box>
                            </div>

                            <div className="comment-box">
                                <textarea onChange={handleChange} name="comment" id="comment" placeholder="Nhập đánh giá về sản phẩm"></textarea>
                                <p onClick={() => {localStorage.getItem('token') ? handleSubmit() : alert("Bạn cần đăng nhập để tiêp tục")}}>Gửi đánh giá</p>
                            </div>
                        </div>
                    </div>
                    <div className="list-review">
                        {
                            props.reviews
                                .filter(review => review.reviewId.rating !== null)
                                .map((review, index) => {
                                    return (
                                        <div key={index} className="list-review-item">
                                            <div className="review-item-top">
                                                <span className="review-user">{review.reviewId.user.name}</span>
                                            </div>
                                            <div className="review-item-mid">
                                                <p className="text">
                                                    <Box className="rank"
                                                        sx={{
                                                            '& > legend': { mt: 2 },
                                                        }}
                                                    >
                                                        <Rating
                                                            className="star"
                                                            name="read-only"
                                                            readOnly
                                                            value={review.reviewId.rating}
                                                        />
                                                    </Box>
                                                    {review.reviewId.comment}
                                                </p>
                                            </div>
                                            <div className="review-item-bottom">
                                                <span>{new Date(review.reviewId.createdAt).toLocaleString()}</span>
                                            </div>
                                        </div>
                                    )
                                })
                        }
                    </div>
                </div>

                <div className="comment">
                    <div className="box-comment">
                        <textarea onChange={handleChange} name="comment" id="comment" placeholder="Mời bạn để lại bình luận..."></textarea>
                        <p onClick={()=>{localStorage.getItem('token') ? handleSubmitOnlyCmt() : alert("Bạn cần đăng nhập để tiêp tục")}}>Gửi bình luận</p>
                    </div>
                    <div className="list-comment">
                        <div>
                            {
                                props.reviews
                                    .filter(review => review.reviewId.rating === null)
                                    .map((review, index) => {
                                        return (
                                            <div key={index} className="item-comment">
                                                <div className="user-info">
                                                    <div className="sex">{review.reviewId.user.name[0]}</div>
                                                    <span className="name-customer">{review.reviewId.user?.name}</span>
                                                    <span className="comment-time">{new Date(review.reviewId.createdAt).toLocaleString()}</span>
                                                </div>
                                                <div className="infomation">
                                                    <p className="comment-content">{review.reviewId.comment}</p>
                                                    <div className="reply-action">
                                                        {
                                                            btnReply
                                                            ?
                                                            <p onClick={() => (setBtnReply(false))}>Trả lời</p>
                                                            :
                                                            <p onClick={() => (setBtnReply(true))}>Ẩn</p>
                                                        }
                                                    </div>
                                                    <div className="reply-cmt-list">
                                                        {
                                                            review.reviewId.replyComment.map((r, i) => {
                                                                return (
                                                                    <div className="reply-comment-item">
                                                                        <div className="name-mini">{r.name}</div>
                                                                        <div className="content-mini">
                                                                            <p className="comment-content">{r.comment}</p>
                                                                            <span className="comment-time">{new Date(r.date).toLocaleString()}</span>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                        
                                                    </div>
                                                    <div style={{display: btnReply ? 'none' : 'block'}}>
                                                        <div className="box-reply-cmt">
                                                            <textarea onChange={handleChange} name="comment" id="comment" placeholder="Mời bạn để lại bình luận..."></textarea>
                                                            <p onClick={() => {localStorage.getItem('token') ? handleReplyCmt({reviewId: review.reviewId._id, comment: danhgia.comment}) : alert("Bạn cần đăng nhập để tiêp tục")}} >Gửi bình luận</p>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        )
                                    })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Review;