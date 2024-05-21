import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import './Breadcrumb.scss';

const BreadCrumb = (props) => {

    const breadcrumbs = [
        <Link underline="hover" key="1" color="inherit" href="/" >
            Trang chủ
        </Link>,
        <Link
            underline="hover"
            key="2"
            color="inherit"
            href="/"
        >
            Core
        </Link>,
        <Typography key="3" color="text.primary">
            {props?.name}
        </Typography>,
    ];
    return (
        <div className="breadcrumb">
                <Breadcrumbs
                    separator={<NavigateNextIcon fontSize="small" />}
                    aria-label="breadcrumb"
                >
                    {breadcrumbs}
                </Breadcrumbs>
        </div>
    );
}

export default BreadCrumb;