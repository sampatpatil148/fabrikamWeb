import React, { useState, useEffect } from 'react';

import ImageGallery from 'react-image-gallery';


function ImageGalleryZoom(props) {

    const { imgProps } = props;
    const [imageGalleryZoom, setImageGalleryZoom] = useState([]);

    useEffect(() => {
        if (imgProps.length > 0) {
            setImageGalleryZoom([
                {
                    original: imgProps,
                    thumbnail: imgProps,
                    thumbnailAlt: "Product thumbnail"
                }
            ]);
        }
    }, [imgProps]);


    useEffect(() => {
        setTimeout(() => {
            const thumbnail = document.getElementsByClassName("image-gallery-thumbnail");
            const icon = document.getElementsByClassName("image-gallery-icon");
            const bullet = document.getElementsByClassName("image-gallery-bullet");
            const figureCreate = document.getElementsByTagName("figure");
            const lens = document.getElementsByClassName("img-zoom-lens");
            var gallerySlide = document.getElementsByClassName("image-gallery-slide");
            for (let i = 0; i < thumbnail.length; i++) {
                thumbnail[i].addEventListener("click", function (e) {
                    if (figureCreate.length > 0) {
                        figureCreate[0].remove();
                        lens[0].remove();
                        for (let i = 0; i < gallerySlide.length; i++) {
                            gallerySlide[i].classList.remove("image-zoom");
                        }
                    }
                })
            }
            for (let i = 0; i < icon.length; i++) {
                icon[i].addEventListener("click", function (e) {
                    if (figureCreate.length > 0) {
                        figureCreate[0].remove();
                        lens[0].remove();
                    }
                })
            }
            for (let i = 0; i < bullet.length; i++) {
                bullet[i].addEventListener("click", function (e) {
                    if (figureCreate.length > 0) {
                        figureCreate[0].remove();
                        lens[0].remove();
                    }
                })
            }
        });
    }, []);

    function _onImageClick(event) {
        var imageGallery = document.querySelector(".image-gallery-image").offsetHeight;
        event.target.parentElement.classList.toggle("image-zoom");
        var imageZoom = document.querySelector(".image-zoom");
        var figure = document.createElement("figure");
        figure.setAttribute("class", "zoom");
        var src = event.target.src;
        figure.setAttribute("style", "background-image: url(" + src + ")");
        if (imageZoom) {
            imageZoom.appendChild(figure);
            var zoom = document.querySelector(".zoom");
            zoom.style.height = imageGallery + "px";
            var lens = document.createElement("DIV");
            lens.setAttribute("class", "img-zoom-lens");
            zoom.parentElement.insertBefore(lens, zoom);
            var cx = zoom.offsetWidth / lens.offsetWidth;
            var cy = zoom.offsetHeight / lens.offsetHeight;
            zoom.style.backgroundSize = (zoom.offsetWidth * cx) + "px " + (zoom.offsetHeight * cy) + "px";

            lens.addEventListener("mousemove", moveLens);
            zoom.addEventListener("mousemove", moveLens);
            lens.addEventListener("touchmove", moveLens);
            zoom.addEventListener("touchmove", moveLens);

            function moveLens(e) {
                var pos, x, y;
                e.preventDefault();
                pos = getCursorPos(e);
                x = pos.x - (lens.offsetWidth / 2);
                y = pos.y - (lens.offsetHeight / 2);
                if (x > zoom.offsetWidth - lens.offsetWidth) { x = zoom.offsetWidth - lens.offsetWidth; }
                if (x < 0) { x = 0; }
                if (y > zoom.offsetHeight - lens.offsetHeight) { y = zoom.offsetHeight - lens.offsetHeight; }
                if (y < 0) { y = 0; }
                lens.style.left = x + "px";
                lens.style.top = y + "px";
                zoom.style.backgroundPosition = "-" + (x * cx) + "px -" + (y * cy) + "px";
            }

            function getCursorPos(e) {
                var a, x = 0, y = 0;
                e = e || window.event;
                a = zoom.getBoundingClientRect();
                x = (e.pageX - a.left) - window.pageXOffset;
                y = (e.pageY - a.top) - window.pageYOffset;
                return { x: x, y: y };
            }

            moveLens(event)
        }
        else {
            const figureCreate = document.getElementsByTagName("figure");
            const lens = document.getElementsByClassName("img-zoom-lens");
            if (figureCreate.length > 0) {
                figureCreate[0].remove();
                lens[0].remove();
            }
        }
    }


    return (
        <ImageGallery onClick={_onImageClick} items={imageGalleryZoom} showPlayButton={false} showBullets={true} thumbnailPosition={"left"} showFullscreenButton={false} />
    )
}

export default ImageGalleryZoom;