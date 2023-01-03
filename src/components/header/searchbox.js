import React, { useEffect, useState } from 'react'
import AutosuggestBox from './autocomplete/autoComplete';
import { isEmpty } from "../../library/common";
import useMediaQuery from "./mediaSearchBox";

const Searchbox = () => {
    const isMobile = useMediaQuery("(max-width: 992px)");
    const [showForm, setshowForm] = useState(false);
    useEffect(() => {
        if (isMobile) {
            setshowForm(true);
        }
        else {
            setshowForm(false);
        }
    }, [isMobile]);
    const [inputValue, setinputValue] = useState('');
    const SearchItemSubmit = (e) => {
        if (isEmpty(inputValue)) {
            e.preventDefault();
        }
    }
    return (
        <div className="ms-search__label bx-show">
            {!showForm &&
                <button type="button" aria-label="Search" tabIndex="1"
                    className="ms-search__icon msc-btn" onClick={() => { setshowForm(!showForm) }}>
                    <i className="fa fa-search fa-1" aria-hidden="true"></i>
                    <span className="ms-search__icon-text" >Search</span>
                </button>
            }
            {showForm && <div className='search-form'>
                <form className="ms-search__searchForm" aria-label="Search"
                    name="searchForm" role="search" action='/search' onSubmit={SearchItemSubmit}
                    autoComplete="off">
                    <div className="autocomplete">
                        {<AutosuggestBox callBack={setinputValue} />}
                    </div>
                    <button type="button" aria-label="Cancel" tabIndex="1"
                        className="ms-search__form-cancelSearch msc-btn d-none d-lg-block d-xl-block d-xxl-block" onClick={() => { setshowForm(!showForm) }}>
                        <i className="fa fa-times" aria-hidden="true"></i>
                    </button>
                    <button type="submit" aria-label="Submit search" tabIndex="1"
                        className="ms-search__form-submitSearch msc-btn">
                        <i className="fa fa-search fa-1" aria-hidden="true"></i>
                    </button>
                </form>
            </div>
            }
        </div>
    );
};

export default Searchbox;