import React, { useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Image from '../../library/Image';
import ToolTip from "../../library/tooltip/tooltip";
const nextIcon = (<ToolTip text='Next'><span aria-hidden="true" className="carousel-control-next-icon"></span></ToolTip>);
const prevIcon = (<ToolTip text='Previous'><span aria-hidden="true" className="carousel-control-prev-icon"></span></ToolTip>);

const Hero = () => {

    useEffect(() => {
        var btn = document.querySelector(".carousel-indicators").getElementsByTagName("button");
        for (let i = 0; i < btn.length; i++) {
            btn[i].addEventListener("mouseenter", onMouseEnter);
            btn[i].addEventListener("mouseleave", onMouseLeave);
        }
    }, []);

    function onMouseEnter(e) {
        var elm = document.createElement("div");
        var elmChild = document.createElement("div");
        var txt = e.target.getAttribute("aria-label");
        elmChild.setAttribute("class", "tooltip-text");
        elmChild.append(txt);
        elm.setAttribute("class", "tooltip-dots");
        elm.append(elmChild);
        e.target.append(elm);
    }

    function onMouseLeave() {
        var tooltip = document.querySelector(".tooltip-dots");
        tooltip.remove();
    }

    return (
        <Carousel slide nextIcon={nextIcon} prevIcon={prevIcon}>
            <Carousel.Item>
                <Image
                    className="d-block w-100"
                    src="/images/hero1.jfif"
                    alt="First slide"
                />
                <Carousel.Caption className="text-left">
                    <h1>NEW ARRIVAL</h1>
                    <p>Into the summer breeze with all new designer dresses</p>
                    <a href="/fabrikam-fashion/new-arrival" className="shopnow-anchor text-white" role="button" title="Shop now" aria-label="Shop now">Shop now</a>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <Image
                    className="d-block w-100"
                    src="/images/hero2.jfif"
                    alt="Second slide"
                />

                <Carousel.Caption className="text-center">
                    <h1 className="text-white">NEW ARRIVAL</h1>
                    <p className="text-white">Tasteful accessories walking a fine line between vintage and modern</p>
                    <a href="/fabrikam-fashion/new-arrival" className="shopnow-anchor text-white" role="button" title="Shop now" aria-label="Shop now">Shop now</a>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <Image
                    className="d-block w-100"
                    src="/images/hero3.jfif"
                    alt="Third slide"
                />

                <Carousel.Caption className="text-end">
                    <h1>NEW ARRIVAL</h1>
                    <p>Ethically sourced ultra-comfortable knitwear</p>
                    <a href="/fabrikam-fashion/new-arrival" className="shopnow-anchor text-white" role="button" title="Shop now" aria-label="Shop now">Shop now</a>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
}

export default Hero;
