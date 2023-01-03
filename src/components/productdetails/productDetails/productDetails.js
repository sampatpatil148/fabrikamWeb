import React, { useState, useEffect } from 'react';

function ProductDetails(props) {

    const [productDetails, setProductDetails] = useState({})
    useEffect(() => {
        if (props.details !== undefined) {
            setProductDetails(props.details);
        }
    }, [props.details]);

    var [count, setCount] = useState(1);
    const plus = () => {
        if (count !== 10) {
            count++;
            setCount(count);
        }
    }

    const minus = () => {
        if (count !== 1) {
            count--;
            setCount(count);
        }
    }

    const quantity = () => {

    }

    return (
        <div className="p-content">
            <h1>{productDetails.productName}</h1>
            <h2>${productDetails.Price}</h2>
            <p>{productDetails.description}</p>
            <h3>Overnight shipping available</h3>
            <div className="star-area">
                <div className="star p-details-star">
                    <i area-hidden="true" className="fa fa-star"></i>
                    <i area-hidden="true" className="fa fa-star"></i>
                    <i area-hidden="true" className="fa fa-star"></i>
                    <i area-hidden="true" className="fa fa-star"></i>
                    <i area-hidden="true" className="fa fa-star"></i>
                </div>
                <div className="review">14</div>
            </div>
            <div className="p-dropdown-area">
                <label>
                    <span className="label">Size</span>
                    <select className="p-select" name="size">
                        <option hidden>Choose a size</option>
                        <option>XXS</option>
                        <option>XS</option>
                        <option>S</option>
                        <option>M</option>
                        <option>L</option>
                        <option>XL</option>
                    </select>
                </label>
            </div>
            <div className="p-quantity-area">
                <label>
                    <span className="label">Quantity</span>
                    <div className="p-quantity-input">
                        <button type="button" aria-label="q-button-minus" name="q-button-minus" title="Press to decrease the quantity by 1" className="p-btn-q" onClick={minus} disabled={count === 1 ? true : false}><i area-hidden="true" className="fa fa-minus"></i></button>
                        <input type="number" pattern="[0-9]*" className="p-input-q" value={count} onChange={quantity} />
                        <button type="button" aria-label="q-button-plus" name="q-button-plus" title="Press to increment quantity by 1" className="p-btn-q" onClick={plus} disabled={count === 10 ? true : false}><i area-hidden="true" className="fa fa-plus"></i></button>
                    </div>
                </label>
            </div>
            <div className="p-addTocart">
                <div className="p-button-area">
                    <a href="#" aria-label="cart" className="p-add-cart" area-label="Add to bag" title="Add to bag" name="Add-to-bag">Add to bag</a>
                    <a href="#" aria-label="whislist" className="p-add-whislist"><span className="sr-only">Whislist</span><i area-hidden="true" className="fa fa-heart" aria-hidden="true"></i></a>
                </div>
            </div>
            <div className="p-findInStore">
                <h4>Buy now, pick up in a store</h4>
                <p>This product is available for the following pick up methods.</p>
                <ul>
                    <li><i className="fa fa-check-circle" aria-hidden="true"></i>In Store pick up</li>
                    <li><i className="fa fa-check-circle" aria-hidden="true"></i>Curbside pick up</li>
                </ul>
                <p>Search for product availability at stores near you.</p>
                <a href="#" aria-label="find-store" className="p-btn">Find in store</a>
            </div>
        </div>
    )
}

export default ProductDetails