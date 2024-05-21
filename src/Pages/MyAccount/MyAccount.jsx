import React, { useState } from "react";
import './MyAccount.scss';
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import ViewListOutlinedIcon from '@mui/icons-material/ViewListOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import ListOrder from "../../Components/ListOrder/ListOrder";
import InfoUser from "../../Components/InfoUser/InfoUser";
import { logoutUser } from "../../services/authService";

const MyAccount = (props) => {
    const navigate = useNavigate()

    const [box, setBox] = useState(props.prop);

    const logout = async () => {
        try {
            const result = await logoutUser();
            console.log(result);
            if (result.success) {
                localStorage.removeItem('token')
                navigate('/');
                window.location.reload()
            }
        } catch (e) {
            console.error(e)
        }
    }
    
    return (  
        <div style={{width: '1650px', maxWidth: '100%', padding: '0 10px', marginLeft: 'auto', marginRight: 'auto'}}>
            <div className="account">
                <div className="acc-left">
                    <div className="acc-header">
                        <AccountCircleOutlinedIcon className="icon"/>
                        <div className="acc-header-name">
                            <span>Tài khoản của</span>
                            <span>{localStorage.getItem('name')}</span>
                        </div>
                    </div>
                    <div className="acc-list-menu">
                        <Link to={'/account/info'} onClick={() => {setBox('info')}}>
                            <PermIdentityOutlinedIcon className="icon"/>
                            <span>Thông tin tài khoản</span>
                        </Link>
                        <Link to={'/account/orders'} onClick={() => {setBox('order')}}>
                            <ViewListOutlinedIcon className="icon"/>
                            <span>Đơn hàng của tôi</span>
                        </Link>
                        <Link>
                            <ExitToAppOutlinedIcon className="icon"/>
                            <span onClick={logout}>Đăng xuất</span>
                        </Link>
                    </div>
                </div>
                <div className="acc-right">
                    {box === 'order' && <ListOrder/>}   
                    {box === 'info' && <InfoUser/>}
                </div>
            </div>
        </div>
    );
}
 
export default MyAccount;