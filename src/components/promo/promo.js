import React from 'react';

const Promo = () => {
    var counterPromo = 0;
    var promoItem = document.getElementsByClassName("promo-item");
    var promoShop = document.getElementsByClassName("promoShop");
    
    setInterval(() => {
        if (counterPromo !== 2 && promoItem.length) {
            counterPromo++;
            promoItem[0].classList.remove("activefirst");
            promoItem[0].classList.remove("active-promo1");
            promoItem[0].classList.add("remove-promo1");
            promoItem[promoItem.length - 1].classList.add("active-promo2");
            promoItem[promoItem.length - 1].classList.remove("remove-promo2");
            promoShop[0].setAttribute("tabIndex", -1);
            promoShop[promoShop.length - 1].setAttribute("tabIndex", 1);
            if (counterPromo === 2) {
                counterPromo = 0;
                promoItem[0].classList.add("active-promo1");
                promoItem[0].classList.remove("remove-promo1");
                promoItem[promoItem.length - 1].classList.remove("active-promo2");
                promoItem[promoItem.length - 1].classList.add("remove-promo2");
                promoShop[0].setAttribute("tabIndex", 1);
                promoShop[promoShop.length - 1].setAttribute("tabIndex", -1);
            }
        }
    }, 4000);

    return (
        <section className="promo-header">
            <div className="promo-item activefirst" aria-live="polite" role="marquee">
                <span className="sr-only">sdasda</span>
                <span className="promo-header-text" suppressContentEditableWarning={true}>Buy 2 or more shoes and get 25% off! </span>
                <span className="promo-header-link"><a href="/fabrikam-fashion/menswear" aria-label="Shop now"
                    title="Shop now" className='promoShop' tabIndex="1">Shop now</a></span>
            </div>
            <div className="promo-item" aria-live="polite" role="marquee">
                <span className="sr-only">sadsadasd</span>
                <span className="promo-header-text" suppressContentEditableWarning={true}>Winter collection online now! </span>
                <span className="promo-header-link"><a href="/fabrikam-fashion/womenswear" aria-label="Shop now"
                    title="Shop now" className='promoShop'>Shop now</a></span>
            </div>
        </section>
    )
}

export default Promo