import React, { useCallback, useEffect, useState } from 'react';

export default ({ src, IsSameDomain,alt,className }) => {
    const imgFolder = `/Fabrikam-Images/`;
    const placeholderImg = `/images/spinning-loading.gif`;
    const errorImg = `/images/no-image.png`;
    const [imgSrc, setSrc] = useState(placeholderImg || src);
    
    const onLoad = useCallback(() => {
        setSrc(IsSameDomain === true ? `${imgFolder + src}` : src);
    }, [src,IsSameDomain,imgFolder]);

    const onError = useCallback(() => {
        setSrc(errorImg || placeholderImg);
    }, [errorImg, placeholderImg]);

    useEffect(() => {
        const img = new Image();
        img.src = IsSameDomain === true ? `${imgFolder + src}` : src;
        img.addEventListener("load", onLoad);
        img.addEventListener("error", onError);
        return () => {
            img.removeEventListener("load", onLoad);
            img.removeEventListener("error", onError);
        };
    }, [src, onLoad, onError,IsSameDomain,imgFolder]);

    return <img className={className} alt={alt} src={imgSrc} />;
};

