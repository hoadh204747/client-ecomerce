import "./Footer.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBuildingFlag, faEnvelope, faLocationArrow, faPhone } from '@fortawesome/free-solid-svg-icons'
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import SyncOutlinedIcon from '@mui/icons-material/SyncOutlined';
import PaymentOutlinedIcon from '@mui/icons-material/PaymentOutlined';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';

const Footer = () => {
    return (
        <div className="footer">
            <div className="chinh-sach" style={{ width: '1650px', maxWidth: '100%', padding: '0 10px', marginLeft: 'auto', marginRight: 'auto' }}>
                <div className="content-container">
                    <div className="policy-container">
                        <div className="policy-icon">
                            <LocalShippingOutlinedIcon className="icon" />
                        </div>
                        <div className="policy-info">
                            <span className="policy-info-title">CHÍNH SÁCH GIAO HÀNG</span>
                            <span className="policy-info-content">Nhận hàng và thanh toán tại nhà</span>
                        </div>
                    </div>
                    <div className="policy-container">
                        <div className="policy-icon">
                            <SyncOutlinedIcon className="icon" />
                        </div>
                        <div className="policy-info">
                            <span className="policy-info-title">ĐỔI TRẢ DỄ DÀNG</span>
                            <span className="policy-info-content">Nhận hàng và thanh toán tại nhà</span>
                        </div>
                    </div>
                    <div className="policy-container">
                        <div className="policy-icon">
                            <PaymentOutlinedIcon className="icon" />
                        </div>
                        <div className="policy-info">
                            <span className="policy-info-title">THANH TOÁN TIỆN LỢI</span>
                            <span className="policy-info-content">Nhận hàng và thanh toán tại nhà</span>
                        </div>
                    </div>
                    <div className="policy-container">
                        <div className="policy-icon">
                            <SupportAgentOutlinedIcon className="icon" />
                        </div>
                        <div className="policy-info">
                            <span className="policy-info-title">HỖ TRỢ NHIỆT TÌNH</span>
                            <span className="policy-info-content">Nhận hàng và thanh toán tại nhà</span>
                        </div>
                    </div>

                </div>
            </div>

            <div className="gioi-thieu" style={{ width: '1650px', maxWidth: '100%', padding: '0 10px', marginLeft: 'auto', marginRight: 'auto' }}>
                <div className="links-container">
                    <div className="link-group">
                        <span className="link-group-title">GIỚI THIỆU ComputerShop</span>
                        <p><b>Giới thiệu về công ty</b></p>
                        <p><b>Liên hệ hợp tác kinh doanh</b></p>
                        <p><b>Thông tin truyền thông</b></p>
                        <p><b>Tin tức</b></p>
                    </div>
                    <div className="link-group">
                        <span className="link-group-title">HỖ TRỢ KHÁCH HÀNG</span>
                        <p><b>Giới thiệu về công ty</b></p>
                        <p><b>Liên hệ hợp tác kinh doanh</b></p>
                        <p><b>Thông tin truyền thông</b></p>
                        <p><b>Tin tức</b></p>
                    </div>
                    <div className="link-group">
                        <span className="link-group-title">CHÍNH SÁCH CHUNG</span>
                        <p><b>Giới thiệu về công ty</b></p>
                        <p><b>Liên hệ hợp tác kinh doanh</b></p>
                        <p><b>Thông tin truyền thông</b></p>
                        <p><b>Tin tức</b></p>
                    </div>
                    <div className="link-group">
                        <span className="link-group-title">THÔNG TIN KHUYẾN MÃI</span>
                        <p><b>Giới thiệu về công ty</b></p>
                        <p><b>Liên hệ hợp tác kinh doanh</b></p>
                        <p><b>Thông tin truyền thông</b></p>
                        <p><b>Tin tức</b></p>
                    </div>
                </div>

            </div>

            <div className="contact">
                <div className="contact-container" style={{ width: '1650px', maxWidth: '100%', padding: '0 10px', marginLeft: 'auto', marginRight: 'auto' }}>
                    <div className="list-contact">
                        <div>
                            <FontAwesomeIcon icon={faBuildingFlag} />
                            <span>Công ty cổ phần Kỹ thuật máy tính Bách Khoa</span>
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faLocationArrow} />
                            <span>Số 1 Đại Cồ Việt</span>
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faEnvelope} />
                            <span>backkhoa@hust.com</span>
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faPhone} />
                            <span>099999999</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;