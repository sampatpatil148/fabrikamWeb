import React from 'react';
import Image from '../../library/Image';
const List = (props) => {
   let item;
   return (
      <div className="ms-search-result-container__Products">
         {
            props.data.length ? <ul className="list-unstyled">
               {
                  props.data.map((obj, index) => {
                     item = obj.document;
                     return (
                        <li className="ms-product-search-result__item" key={index}>
                           <a href={`/pdp/${item.productName.replace(/[^A-Z0-9]/ig, "_").toLowerCase()}/${item.productID}`} className="msc-product" area-label={item.productName} alt={item.productName}>
                              <div className="msc-product__image">
                                 <picture>
                                    <Image IsSameDomain={true} src={item.img_url} alt={item.productName} className="msc-main_image msc_image lazyloaded" />
                                 </picture>
                              </div>
                              <h4 className="msc-product__title">{item.productName}</h4>
                           </a>
                           
                           <div className="msc-product__details">
                              <span className="msc-price"><span className="msc-price__actual" itemProp="price">{parseInt(item.Price) === 0 ? "Free" : `$${item.Price.toFixed(2)}`}</span></span>
                           </div>
                        </li>
                     );
                  })
               }
            </ul>:<div className='no-product'>No products found for the given search term.</div>
         }
      </div>
  );
}

export default List;