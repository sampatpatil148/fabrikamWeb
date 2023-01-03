import React from 'react';

const sortingKeys = [
   {
     key: ' Relevance',
     value: ''
   },
   {
      key: 'Name: A-Z',
      value: 'productName asc'
   },
   {
      key: 'Name: Z-A',
      value: 'productName desc'
    },
   {
     key: 'Price: Low to High',
     value: 'Price asc'
   },
   {
     key: 'Price: High to Low',
     value: 'Price desc'
   }
 ];
const ProductSort = (props) => {
   return (
      <div className="ms-search-result-container__Sort-by-category">
         <label
            className="msc-l-dropdown__label reviews-list-sort-by"
            htmlFor="categorySortByDropdown"
         >
            Sort by:
         </label>
         <select
            id="categorySortByDropdown"
            className="msc-l-dropdown reviews-list-dropdown"
            onChange={props.sortCallBack}
            value={props.defaultSortingKey && props.defaultSortingKey.length && props.defaultSortingKey[0]}

         >
            {
               sortingKeys.map((item, index) => { 
                  return(<option
                     className="msc-l-dropdown__option"
                     value={item.value}
                     aria-selected="true"
                     key={ index}
                     >
                     { item.key}
                  </option>)
               })
            }
         </select>
      </div>
   );
};

export default ProductSort;