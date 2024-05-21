import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css';
import Footer from './Components/Footer/Footer';
import Navbar from './Components/Navbar/Navbar';
import Home from './Pages/Home';
import ShopCategory from './Pages/ShopCategory/ShopCategory';
import ProductDisplay from './Pages/Product/ProductDisplay';
import Cart from './Pages/Cart/Cart';
import Order from './Pages/Order/Order';
import MyAccount from './Pages/MyAccount/MyAccount';
import NewsLetter from './Components/NewsLetter/NewsLetter';
import { SearchProvider } from './Context/SearchContext';
import SearchResult from './Pages/SearchResult/SearchResult';
import { PayPalScriptProvider} from "@paypal/react-paypal-js";

function App() {

  const initialOptions = {
    clientId: "AbFO142hkOdG2KDXhLCjvRHqv8O8TFlzJA0_BNjvSNZPW1Cp1Mii3XaqeiOyN9uMWQfkgWzn7CTUbzb7",
    currency: "USD",
    intent: "capture",
};

  return (
    <PayPalScriptProvider  options={initialOptions}>
      <SearchProvider>
      <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/'>
            <Route path='product/:productId' element={<ProductDisplay />} />
            <Route path=':categoryId' element={<ShopCategory />} />
            <Route path='cart' element={<Cart />} />
            <Route path='order' element={<Order />} />
            <Route path='account/'>
              <Route path='orders' element={<MyAccount prop='order' />} />
              <Route path='info' element={<MyAccount prop='info' />} />
            </Route>
          </Route>
          <Route path='/search' element={<SearchResult/>}/>
        </Routes>
        <NewsLetter/>
        <Footer />
      </BrowserRouter>
    </div>
    </SearchProvider>
    </PayPalScriptProvider>
  );
}

export default App;
