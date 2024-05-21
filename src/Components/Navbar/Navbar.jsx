import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faCartShopping, faUser } from '@fortawesome/free-solid-svg-icons'
import Dropdown from 'react-bootstrap/Dropdown';

import './Navbar.scss'
import logo from '../Assets/images/zyro-image.png';
import { Link } from 'react-router-dom';
import LoginSignup from '../LoginSignup/LoginSignup';
import { logoutUser } from '../../services/authService';
import { getCart } from '../../services/orderService';
import { searchProduct } from '../../services/productService';
import { SearchContext } from '../../Context/SearchContext';

const Navbar = () => {
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = (value) => {
        setOpen(false);
      };

    const [cart, setCart] = useState([])
    useEffect(() => {
        if (localStorage.getItem('token')) {
            getProductCart();
        }
    }, []);

    const getProductCart = async () => {
        const data = await getCart();
        setCart(data.cart.items);
    };
    const navigate = useNavigate()

    const [state, setState] = useState('');
    //const [loginSignupVisible, setLoginSignupVisible] = useState(false);

    const toggleLoginSignupState = () => {
        setState(prevState => prevState === 'login' ? 'signup' : 'login');
    }

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

    const [search, setSearch] = useState("")
    const { setSearchResults } = useContext(SearchContext);
    const handleSearch = (e) => {
        setSearch(e.target.value)
    }
    const handleSearchSubmit = async () => {
        const res = await searchProduct({search: search})
        if(res.success){
            setSearchResults(res.data)
            navigate('/search')

        }
    }
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
          handleSearchSubmit();
        }
      };

    return (
        <div className="navbar-wrapper">

            <Link to={`/`}>
                <div className="nav-logo">
                    <img src={logo} alt="" />
                    <p>ComputerShop</p>
                </div>
            </Link>

            <div className="nav-search">
                <input type="text" value={search} onChange={handleSearch} onKeyDown={handleKeyPress} placeholder="Nhập sản phẩm, từ khóa cần tìm" />
                <FontAwesomeIcon className='search-icon' icon={faSearch} />
            </div>

            <div className="nav-cart-user">
                <div className="nav-cart">
                    <Link to={'/cart'}><FontAwesomeIcon className='cart-icon' icon={faCartShopping} /></Link>
                    <div className="nav-cart-count">{cart.length}</div>
                </div>
                {
                    localStorage.getItem('token')

                        ?

                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                <FontAwesomeIcon className='user-icon' icon={faUser} />
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item ><Link to={'/account/info'}>Thông tin cá nhân</Link></Dropdown.Item>
                                <Dropdown.Item ><Link to={'/account/orders'} >Đơn hàng của bạn</Link></Dropdown.Item>
                                <Dropdown.Item onClick={logout} >Đăng xuất</Dropdown.Item>

                            </Dropdown.Menu>
                        </Dropdown>

                        :

                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                Tài khoản
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                {/* <Dropdown.Item onClick={() => { setState('login'); setLoginSignupVisible(true) }} >Đăng nhập</Dropdown.Item>
                                <Dropdown.Item onClick={() => { setState('signup'); setLoginSignupVisible(true) }} >Đăng ký</Dropdown.Item> */}
                                <Dropdown.Item onClick={() => { setState('login'); handleClickOpen() }} >Đăng nhập</Dropdown.Item>
                                <Dropdown.Item onClick={() => { setState('signup'); handleClickOpen() }} >Đăng ký</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                }


            </div>

            {/* {
                loginSignupVisible && <LoginSignup state={state} onClose={() => setLoginSignupVisible(false)} toggleState={toggleLoginSignupState} />
            } */}
            <LoginSignup state={state} open={open} onClose={handleClose} toggleState={toggleLoginSignupState}/>
        </div>
    );
}

export default Navbar;