import React, { useState, useEffect } from 'react';
import ImageGalleryZoom from "../../../library/imageGalleryZoom/imageGalleryZoom";

function ProductSlider(props) {
    const ImageURL  = "/Fabrikam-Images/"+props.img.img_url;
    const [productDetailsImage, setproductDetailsImage] = useState([]);
    useEffect(() => {
        if (props.img !== undefined) {
            setproductDetailsImage(ImageURL);  
        }
    }, [props.img, ImageURL]);



    return (
        <div className='p-slider'>
            <ImageGalleryZoom imgProps={productDetailsImage}></ImageGalleryZoom>
        </div>
    )
}

export default ProductSlider