import './loginsignup.css';
import logo from '../Assets/images/logo-login.png';
import { useState } from 'react';
import * as authService from '../../services/authService';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import * as message from '../Message/message'


const LoginSignup = ({ state, open, onClose, toggleState }) => {


    const [formData, setFormData] = useState({
        name: "",
        mobile: "",
        email: "",
        password: ""
    })

    const changeHandle = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const signup = async () => {
        try {
            const data = await authService.registerUser(formData);
            if (data.success) {
                message.success("Đăng ký thành công")
                toggleState()
            }
            else{
                message.error(data.msg)
            }
        } catch (e) {
            console.error(e)
        }
    }


    const login = async () => {
        try {
            const data = await authService.loginUser(formData);
            if (data.success) {
                onClose();
                localStorage.setItem('token', data.accessToken);
                localStorage.setItem('name', data.user.name);
                window.location.reload()
            } else {
                message.error(data.msg)
            }
        } catch (e) {
            console.error(e)
        }
    }

    // const refreshToken = async () => {

    //     try {
    //         const resp = await httpRequest.get('auth/refresh');
    //         localStorage.setItem('token', resp.data.accessToken);
    //         return resp.data;
    //     } catch (e) {
    //         console.log(e)
    //     }
    // }
    // useEffect(() => {
    //     refreshToken();
    // }, []);

    // httpRequest.interceptors.response.use(
    //     (res) => res,
    //     async (error) => {
    //         const status = error.response ? error.response.status : null;
    //         if (status === 401 || status === 403) {
    //             // const data = refreshToken();
    //             // error.config.headers["Authorization"] = "Bearer " + data.accessToken;
    //             // localStorage.setItem('token', data.accessToken);

    //             await httpRequest
    //                 .get('auth/refresh', {
    //                     withCredentials: true,
    //                 })
    //                 .then(res => {
    //                     error.config.headers["Authorization"] = "Bearer " + res.data.accessToken;
    //                     localStorage.setItem("token", res.data.accessToken)
    //                 })
    //                 .catch((refreshTokenAPIError) => {
    //                     localStorage.removeItem('token');
    //                     return Promise.reject(refreshTokenAPIError);
    //                 });
    //             return httpRequest(error.config)
    //         }
    //         return Promise.reject(error);
    //     }
    // )


    return (
        <Dialog open={open} onClick={onClose}>
            <DialogContent onClick={(e) => e.stopPropagation()}>
            <div className='login-signup' >
            <span className='btn-close' onClick={onClose}>x</span>
            <div className="content">
                <div className="content-left">
                    {state === 'signup' ? <div className="title">Đăng ký tài khoản</div> : <div className="title">Đăng nhập</div>}
                    <div className="form">
                        {
                            state === 'signup' ? <>
                                <div className="item-field">
                                    <span>Tên của bạn</span>
                                    <input value={formData.name} onChange={changeHandle} type="text" name="name" required />
                                </div>
                                <div className="item-field">
                                    <span>Số điện thoại</span>
                                    <input value={formData.mobile} onChange={changeHandle} type="text" name="mobile" required minLength={10} maxLength={10} />
                                </div>
                            </>
                                : <></>
                        }
                        <div className="item-field">
                            <span>Email</span>
                            <input value={formData.email} onChange={changeHandle} type="email" name="email" required />
                        </div>
                        <div className="item-field">
                            <span>Mật khẩu</span>
                            <input value={formData.password} onChange={changeHandle} type="password" name="password" required minLength={3} />
                        </div>
                    </div>
                    {
                        state === 'signup' ? <button onClick={() => { signup() }}>Đăng ký</button> : <button onClick={() => { login() }}> Đăng nhập</button>
                    }
                    {state === 'signup' ? <div className='already'>Đã có tài khoản, đăng nhập <span onClick={toggleState}>tại đây</span></div> :
                        <div className='already' >Chưa có tài khoản, đăng ký <span onClick={toggleState}>tại đây</span></div>
                    }

                </div>
                <div className="content-right">
                    <img src={logo} alt="" />
                    <div className="text">
                        <span className='text-1'>Mua sắm tại ComputerShop</span>
                        <span className='text-2'>Siêu ưu đãi mỗi ngày</span>
                    </div>
                </div>
            </div>
        </div>
            </DialogContent>
        </Dialog>
    );
}

export default LoginSignup;