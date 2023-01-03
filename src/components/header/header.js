import React, {useState} from 'react';
import { Navbar } from "react-bootstrap";
import Navigation from './navigation';
import Searchbox from './searchbox';
const Header = () => {
    const [showCart, setshowCart] = useState(false);
    return (
        <section className="header">
            <div className="container-fluid">
                <Navbar collapseOnSelect expand="lg">
                    <div className="brand">
                        <Navbar.Toggle tabIndex="1" aria-controls="responsive-navbar-nav" />
                        <Navbar.Brand className="navbar-brand" href="/" aria-label="Fabrikam" title="Fabrikam" tabIndex="1">
                            <img className="header-logo" src="/images/logo.png" alt="Fabrikam Logo" />
                        </Navbar.Brand>
                    </div>
                    <div className='m-22px  d-lg-none d-md-block'>
                        {<Searchbox />}
                    </div>
                    <div className="cart-bag" onMouseEnter={() => { setshowCart(true) }} onMouseLeave={() => { setshowCart(false) }}>
                        <a href="#" title="Shopping bag, (0) items" aria-label="Shopping bag, (0) items" tabIndex="2">
                            <i className="fa fa-shopping-bag" aria-hidden="true"></i> (0)</a>
                    </div>
                    {
                        showCart &&
                        <div className='shopping-cart-popup' onMouseEnter={() => { setshowCart(true) }} onMouseLeave={() => { setshowCart(false) }}>
                            <button type="button" className="close-button" onClick={() => { setshowCart(false) }}><i className="fa fa-times" aria-hidden="true"></i></button>
                            <p><strong>Your shopping bag</strong></p>
                            <hr></hr>
                            <div className='cart-icon-btn-div'>
                                <a href="#" title="View shopping bag (0)" aria-label='View shopping bag' className="cart-icon-btn">View shopping bag (0)</a>
                            </div>
                        </div>
                    }
                    {<Navigation />}
                </Navbar>
            </div>
        </section>
    );
};

export default Header;