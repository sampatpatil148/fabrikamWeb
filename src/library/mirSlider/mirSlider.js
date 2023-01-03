import React, { useEffect, useState } from 'react';
import Carousel from "../Carousel/Carousel";
import ApiAxios from '../../API/productService';
import { isEmpty } from '../common';

const MirSlider = (props) => {

    const [show, setShow] = useState("4");
    const [sliderItems, setsliderItems] = useState([]);
    function checkScreen() {
        const checkSmall = window.matchMedia('screen and (max-width: 541px)');
        const checkMobile = window.matchMedia('screen and (min-width: 542px) and (max-width: 667px)');
        const checkTablet = window.matchMedia('screen and (min-width: 668px) and (max-width: 991px)');
        const checkDesktop = window.matchMedia('screen and (min-width: 992px)');

        checkSmall.addListener(function (e) {
            if (e.matches) {
                setShow(1);
            }
        });

        checkMobile.addListener(function (e) {
            if (e.matches) {
                setShow(2);
            }
        });

        checkTablet.addListener(function (e) {
            if (e.matches) {
                setShow(3);
            }
        });

        checkDesktop.addListener(function (e) {
            if (e.matches) {
                setShow(4);
            }
        });
    }
    const fetchData = async (type,MasterId) => {
        return await ApiAxios.getSliderValue(type,MasterId);
    }
    
    function checkScreenLoad(type) {
        let w = window.innerWidth;
        if (w > 991) {
            setShow(4);
        }
        if (w < 992 && w > 667) {
            setShow(3);
        }
        if (w < 668 && w > 541) {
            setShow(2);
        }
        if (w < 542) {
            setShow(1);
        }
    }

    useEffect(() => {
        fetchData(props.type,props.masterId).then(data => {
            setsliderItems(data);
        })
        checkScreen();
        checkScreenLoad()
    },[props.type,props.masterId])
    return (
        <>
           { 
            !isEmpty(sliderItems) ? <Carousel
                show={show} name={props.title} tooltipsNext={props.nextLabel} tooltipsPrev={props.prevLabel}
                images={sliderItems}
            />:<div className='empty'>&nbsp;</div>
           }
        </>
    );
}

export default MirSlider;
