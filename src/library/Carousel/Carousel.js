import React, { useState, useEffect } from 'react'
import ToolTip from "../tooltip/tooltip";
import Image from '../Image';
const Carousel = (props) => {
    const {show, name, tooltipsNext, tooltipsPrev} = props;
    const [currentIndex, setCurrentIndex] = useState(0);
    const [length, setLength] = useState(props.images.length);

    const [touchPosition, setTouchPosition] = useState(null);

    useEffect(() => {
        if(props.images.length > 0){
            setLength(props.images.length);
        }
    }, [props.images]);

    var w = window.innerWidth;
    const next = () => {
        if (currentIndex < (length - show)) {
            if (w > 991) {
                if (length - currentIndex === 5) {
                    setCurrentIndex(prevState => prevState + 1);
                }
                else if (length - currentIndex === 6) {
                    setCurrentIndex(prevState => prevState + 2);
                }
                else {
                    setCurrentIndex(prevState => prevState + 3);
                }
            }
            if (w < 992 && w > 667) {
                if (length - currentIndex === 4) {
                    setCurrentIndex(prevState => prevState + 1);
                }
                else {
                    setCurrentIndex(prevState => prevState + 2);
                }
            }
            if (w < 668 && w > 541) {
                setCurrentIndex(prevState => prevState + 1);
            }
            if (w < 542) {
                setCurrentIndex(prevState => prevState + 1);
            }
        }
    }

    const prev = () => {
        if (currentIndex > 0) {
            if (w > 991) {
                if (currentIndex === 1) {
                    setCurrentIndex(prevState => prevState - 1);
                }
                else if (currentIndex === 2) {
                    setCurrentIndex(prevState => prevState - 2);
                }
                else {
                    setCurrentIndex(prevState => prevState - 3);
                }
            }
            if (w < 992 && w > 667) {
                if (length - currentIndex === 4) {
                    setCurrentIndex(prevState => prevState - 1);
                }
                else {
                    setCurrentIndex(prevState => prevState - 2);
                }
            }
            if (w < 668 && w > 541) {
                setCurrentIndex(prevState => prevState - 1);
            }
            if (w < 542) {
                setCurrentIndex(prevState => prevState - 1);
            }
        }
    }

    const handleTouchStart = (e) => {
        const touchDown = e.touches[0].clientX
        setTouchPosition(touchDown)
    }

    const handleTouchMove = (e) => {
        const touchDown = touchPosition

        if (touchDown === null) {
            return
        }

        const currentTouch = e.touches[0].clientX
        const diff = touchDown - currentTouch

        if (diff > 5) {
            next()
        }

        if (diff < -5) {
            prev()
        }

        setTouchPosition(null)
    }

    return (
        <>
            <div className="row">
                <div className="col-md-8 col-sm-6 col-6"><h2 className="heading2">{name}</h2></div>
                <div className="col-md-4 col-sm-6 col-6 text-end">
                    <ToolTip text={tooltipsPrev}>
                        <button type="button" name="left-carousel" title="left-carousel" aria-label="left-carousel" onClick={prev} area-hidden={currentIndex === 0 ? "true" : "false"} disabled={currentIndex === 0 ? true : false} className={`left-arrow ${currentIndex === 0 ? "btn-disable" : ""}`}>
                            <i className="fa fa-chevron-left" area-hidden="true"></i>
                        </button>
                    </ToolTip>

                    <ToolTip text={tooltipsNext}>
                        <button type="button" name="right-carousel" title="right-carousel" aria-label="right-carousel" onClick={next} area-hidden={currentIndex < (length - show) ? "false" : "true"} disabled={currentIndex < (length - show) ? false : true} className={`right-arrow ${currentIndex < (length - show) ? "" : "btn-disable"}`}>
                            <i className="fa fa-chevron-right" area-hidden="true"></i>
                        </button>
                    </ToolTip>
                </div>
            </div>
            <div className="carousel-container">
                <div className="carousel-wrapper">
                    <div
                        className="carousel-content-wrapper"
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                    >
                        <ul
                            className={`carousel-content show-${show}`}
                            style={{ transform: `translateX(-${currentIndex * (100 / show)}%)` }}
                        >
                            {
                                listImage(props.images)
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

function listImage(images) { 
    return images.map((e,i) => {
        return (
            <li key={i}>
                <div className="slide-item">
                    <a href={`/pdp/${e.productName.replace(/[^A-Z0-9]/ig, "_").toLowerCase()}/${e.productID}`} aria-label={e.productName}>
                        <div className="cards">
                            <Image IsSameDomain={true} src={ e.img_url} className="card-img-top" alt={e.productName} />
                            <h4>{ e.productName }</h4>
                        </div>
                    </a>
                    <p>${e.Price}</p>
                    <div className="star-area">
                        <div className="star">
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                        </div>
                        <div className="review">{e.Price+1}</div>
                    </div>
                </div>
            </li>
        );
    });
}

export default Carousel
