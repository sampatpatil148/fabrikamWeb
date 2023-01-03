import React from 'react';
import MirSlider from "../../../library/mirSlider/mirSlider";

const ProductItemCarousel = ({masterId}) => {
    return (
        <>
            <section className="product-slider">
                <div className="item-carousel-container">
                     {<MirSlider type={'relatedProduct'}  masterId ={masterId} title={"Similar looks"} nextLabel={"Similar looks Next"} prevLabel={"Similar looks Previous"} />}
                </div> 
            </section>

            <section className="product-slider heading-h2">
                <div className="item-carousel-container">
                    {<MirSlider type={'pal'}  masterId ={masterId} title={"People also like"} nextLabel={"Next"} prevLabel={"Prev"} />} 
                </div>
            </section>
        </>
    )
}

export default ProductItemCarousel;