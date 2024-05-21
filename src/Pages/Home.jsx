import Banner from "../Components/Banner/Banner";
import BestSeller from "../Components/BestSeller/BestSeller";
import CateHomePage from "../Components/CateHomePage/CateHomePage";

const Home = () => {
    return (
        <div>
            <div style={{ width: '1650px', maxWidth: '100%', padding: '0 10px', marginLeft: 'auto', marginRight: 'auto' }}>
                <Banner />
                <BestSeller />
                <CateHomePage/>
            </div>
        </div>
    );
}

export default Home;