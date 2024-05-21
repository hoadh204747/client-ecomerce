import React, { useEffect, useState } from 'react';
import './InfoUser.scss';
import { updateInfoUser, getInfoUser } from '../../services/authService';

const InfoUser = () => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const fetchApiUser = async () => {
            const res = await getInfoUser();
            setUser(res)
        }
        fetchApiUser()
    }, [])

    const [userDetal, setUserDetail] = useState({
        name: user?.name || '',
        email: user?.email || '',
        mobile: user?.mobile || '',
    })
    useEffect(() => {
        setUserDetail({
            name: user?.name,
            email: user?.email,
            mobile: user?.mobile
        })
    }, [user?.name, user?.email, user?.mobile])
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserDetail({ ...userDetal, [name]: value });
    };

    const handleSubmit = async () => {
        const data = {
            name: userDetal.name,
            mobile: userDetal.mobile,
            email: userDetal.email
        }
        const res = await updateInfoUser(data, user._id)
        if(res.success){
            alert(res.message);
            localStorage.setItem('name', res.user.name)
            window.location.reload()
        }
    }
    return (
        <div className="info-user">
            <div className="title-tk">Thông tin tài khoản</div>
            <div className="box-info">
                <div className="item-tk">
                    <label htmlFor="">Họ tên</label>
                    <div className='form'>
                        <input value={userDetal.name} onChange={handleChange} type="text" name="name" id="name" />
                    </div>
                </div>
                <div className="item-tk">
                    <label htmlFor="">Số điện thoại</label>
                    <div className='form'>
                        <input value={userDetal.mobile} onChange={handleChange} type="text" name="mobile" id="mobile" />
                    </div>
                </div>
                <div className="item-tk">
                    <label htmlFor="">Email</label>
                    <div className='form'>
                        <input value={userDetal.email} onChange={handleChange} type="email" name="email" id="email" />
                    </div>
                </div>
                <div className="item-tk">
                    <label htmlFor=""></label>
                    <div className='form'>
                        <span onClick={()=> {handleSubmit()}}>Cập nhật thông tin</span>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default InfoUser;