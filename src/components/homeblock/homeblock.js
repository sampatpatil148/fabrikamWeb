import React from 'react';
import MirSlider from "../../library/mirSlider/mirSlider";
const Homeblock = () => {
    return (
        <>
            <section className="product-slider">
                <div className="default-container default-container__2 container">
                    {<MirSlider type={'recent'} title={"Based on Your Recent Activity"} nextLabel={"Next"} prevLabel={"Previous"} />}
                </div>
            </section>
            <section className="product-slider">
                <div className="default-container default-container__2 container">
                    {<MirSlider type={'trending'} title={"Trending"} nextLabel={"Trending Next"} prevLabel={"Trending Previous"} />}
                </div>
            </section>
            <section className="product-slider">
                <div className="default-container default-container__2 container">
                    {<MirSlider type={'new'} title={"New Arrivals"} nextLabel={"New Arrivals Next"} prevLabel={"New Arrivals Previous"} />}
                </div>
                <div className="ms-spacer"></div>
            </section>
        </>
    );
}

export default Homeblock;
