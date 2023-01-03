import { Nav, Navbar } from "react-bootstrap";
import Dropdown from 'react-bootstrap/Dropdown';
import React, { useEffect, useState } from 'react';
import Searchbox from './searchbox'
import ToolTip from "../../library/tooltip/tooltip";
import ApiAxios from '../../API/productService';

const Navigation = () => {
    const [appStates, setappStates] = useState([]);

    async function fetchData() {
        const appStates = await ApiAxios.getMenu();
        setappStates(appStates);
    }
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Navbar.Collapse>
            <div className="nav-top-area"></div>
            <div className="nav-bottom">
                <Nav>
                    <ul className="nav-top navbar-nav ml-auto">
                        <li className="nav-item d-none d-lg-block d-xl-block d-xxl-block" key="search">
                            {<Searchbox />}
                        </li>
                        <li className="nav-item" key="signin">
                            <a aria-label="Sign in" title="Sign in" className="nav-link" href="#" tabIndex="1"> <i
                                className="far fa-user d-s" aria-hidden="true"></i> Sign in</a>
                        </li>
                        <li className="nav-item" key="whislist">
                            <ToolTip text='My Whislist'>
                                <a aria-label="My whislist" className="nav-link pr-10" href="#" tabIndex="1"><i
                                    className="far fa-heart" aria-hidden="true"></i> <span className="d-s">My
                                        Whislist</span></a>
                            </ToolTip>
                        </li>
                        <li className="nav-item" key="divider">
                            <div className="divider"></div>
                        </li>
                    </ul>
                    {
                        appStates.length !== 0 && appStates.map((item, i) => {
                            return (
                                item.key && <Dropdown key={"navDropdown" + i.toString()}>
                                    <Dropdown.Toggle>
                                        {item.key}
                                        <i className="fa fa-chevron-down" aria-hidden="true"></i>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        {generateMenuItem(item.value, item.key)}
                                    </Dropdown.Menu>
                                </Dropdown>

                            );
                        })
                    }
                </Nav>
            </div>
        </Navbar.Collapse>
    );
}

const generateMenuItem = (MenuItem, masterMenu) => {
    if (masterMenu === undefined) {
        return [];
    }
    let urlHref = '/fabrikam-fashion';
    const menus = MenuItem.map((item, i) => {
        urlHref = `/fabrikam-fashion/${masterMenu.trim().toLowerCase()}/${item.trim().toLowerCase()}`;
        return (
            <Dropdown.Item href={urlHref} key={"navDropdownItem" + i.toString()}>
                <span className="dropdownsub-menu">{item}</span>
            </Dropdown.Item>
        );
    })
    menus.unshift(<Dropdown.Item key={"navDropdownItem-all"} href={`/fabrikam-fashion/${masterMenu.trim().toLowerCase()}`}>
        <span className="dropdownsub-menu">All</span>
    </Dropdown.Item>);
    return menus;
}
export default Navigation;