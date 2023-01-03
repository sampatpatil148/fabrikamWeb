import React from 'react';
import MirSlider from "../../../library/mirSlider/mirSlider";

const BestSelling = () => {
    return (
        <>
            <section className="product-slider">
                <div className="item-carousel-container">
                    {<MirSlider type={'bestselling'}  title={"Best Selling"} nextLabel={"Best Selling Next"} prevLabel={"Best Selling Previous" } />}
                </div>
            </section>
        </>
    )
}

export default BestSelling;