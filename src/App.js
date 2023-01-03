import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import  AppEvent  from './library/Storage/event';
import 'bootstrap/dist/css/bootstrap.css';
import Promo from "./components/promo/promo";
import Header from './components/header/header';
import Home from './pages/home';
import ProductList from './pages/productList';
import Pdp from './pages/pdp'
import NotFound from './pages/404';
import Footer from "./components/footer/footer";
import BackToTop from "./components/backtotop/backtotop";
import Chat from "./components/chat/chat";
import { getURlarg } from './library/common';



const App = ()=> {
    return (
          <div className='main' >
            <AppEvent/>
            <Promo />
            <Header/>
            <Router>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/productlist/*" element={<ProductList />} />
                <Route path="/fabrikam-fashion/*" element={<ProductList />} />
                <Route path="/search/*" element={<ProductList />} />
                <Route path="/pdp/*" element={<Pdp />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Router>
            <Footer />
            {
              //check home page 
              getURlarg().length === 0 && <Chat />
            }
        <BackToTop />
        
        </div >
        
      );
  };

export default App;
