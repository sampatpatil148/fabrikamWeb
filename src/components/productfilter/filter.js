import React from 'react';
import Accordion from 'react-bootstrap/Accordion'
import { isEmpty,capitalizeStr,getURlarg } from "../../library/common";
import MultiRangeSlider from '../priceslider/priceSlider'
import { useLocation  } from "react-router-dom";

const labelsMapping = [
   {
      key: 'category1',
      value: 'category'
   },
   {
      key: 'Price',
      value: 'Price',
   },
   {
      key: 'Color',
      value: 'Color'
   },
   {
      key: 'AgeGroup',
      value: 'Age',
   },
   {
      key: 'Material',
      value: 'Fabric',
   },
   {
      key: 'Style',
      value: 'Style'
   },
   {
      key: 'Gender',
      value: 'Gender'
   },
   {
      key: 'Size',
      value: 'Size'
   }
   
];

function accodionItem(props) { 
   const filterData = (e) => {
      let newFilters;
      const keySet = labelsMapping.find((e) => e.value === props.options.label);
      const searchValue = e.target.value
      if (e.target.checked) {
         newFilters = props.userFilter.concat({ field: keySet.key, value: searchValue });
      } else {
         newFilters = props.userFilter.filter((item) => {
            if (item.field.trim().toLowerCase() === keySet.key.trim().toLowerCase() && item.value.trim().toLowerCase() === searchValue.trim().toLowerCase()) { 
               return false;
            }
            return true;
         });
        
      }
      props.callback(newFilters);
   }
   if (props.options.label.toLowerCase() === 'price') {
      return props.options.filter && accodionItemPrice(props);
   } else {
      return (
         <Accordion.Item eventKey={props.options.label} key={props.options.label}>
            <Accordion.Header area-label={ props.options.label}>{props.options.label}</Accordion.Header>
            <Accordion.Body>
               <ul className="ms-refine-submenu__list Category" area-label={props.options.label} key={props.options.label}>
                  {
                     
                     props.options.filter && props.options.filter.map(function (f, i) {
                        
                        let id = `html${f.value}_${i}`.replace(/\s+/g, '_');
                        let isSelected = props.userFilter.some(facet => facet.value.toLowerCase() === f.value.toLowerCase());
                        return (
                           !isEmpty(f.value) && <li className="ms-refine-submenu-item" key={i} >
                              <a href={props.location.pathname} className="ms-refine-submenu-item multi-select">
                                 <input type='checkbox' id={id} checked={ isSelected }
                                    className="ms-refine-option form-check-input custom-control-input"
                                    onChange={filterData} value={f.value} />
                                 <label htmlFor={id} className="ms-refine-submenu-item__label" area-label={f.value}>
                                 {`${capitalizeStr(f.value)}`}<span>({f.count})</span>
                                 </label>
                              </a>
                           </li>
                        );
                     })
                  }
               </ul>
            </Accordion.Body>
         </Accordion.Item>

      );
   }
}
function accodionItemPrice(props) { 
   
   const maxPrice = Math.max.apply(Math, props.options.filter.map(i=>i.value));
   const minPrice = Math.min.apply(Math, props.options.filter.map(i => i.value));

   const onchangePrice = (min, max) => { 
      props.callback(props.userFilter.filter(e=>e.field!==props.options.label).concat({ field: props.options.label, value: `${min}-${max}` }));
   }
   const reset = props.userFilter.findIndex((e) => e.field === props.options.label);

   return (
      <Accordion.Item eventKey={props.options.label} key={props.options.label}>
         <Accordion.Header area-label={ props.options.label}>{ props.options.label}</Accordion.Header>
      <Accordion.Body>
         <MultiRangeSlider
            min={minPrice}
            max={maxPrice}
               reset={reset}   
            onChange={({ min, max }) =>onchangePrice( min, max)}
         />
      </Accordion.Body>
   </Accordion.Item>
   );
}
function htmlCollaspe(filters, location, userFilter,callback) {
   
   return (
      <Accordion flush key={'filter'} defaultActiveKey={['0']} alwaysOpen={ true}>
         {
            filters && filters.map((e) => {
              
               return   e.filter && accodionItem({
                  location: location,
                  options: e,
                  userFilter: userFilter,
                  callback:callback
               });
            })
         }
      </Accordion>
   );

}

const Filter = (props) => {
   const { factset,filters,callback } = props;
   const location = useLocation()

   const filterCategory = !isEmpty(factset) && (filterfaceSetValue(factset) ||[]);

   return (
      <div className="ms-search-result-container__refiner-section">
         <div className="ms-search-result-container__refine-menu">
            { htmlCollaspe(filterCategory,location,filters||[],callback) }  
         </div>
      </div>
    );
}

const filterfaceSetValue = (factset) => {
   const excludedCategory = ['Fabrikam Fashion', 'Womenswear', 'Menswear', 'Accessories'];
   let excludedFaceSets = labelsMapping
   //exclude gender if for other gender;
  if(getURlarg(1) && ['womenswear','menswear'].includes(getURlarg(1)) ){
   excludedFaceSets = labelsMapping.filter(e=>e.key !== 'Gender');
  }
   const filterApp = [];
   if (!isEmpty(factset)) {
      excludedFaceSets.forEach((apiLabel) => {
         let options = factset[apiLabel.key];
         if (apiLabel.value === 'category') {
            options = options && options.filter((e) => {
               return !excludedCategory.some((element) => element === e.value)
            });    
         }
         options = options && options.filter(e => e.value !== '');
         options && options.length !== 0 && filterApp.push({
            label: apiLabel.value,
            filter: options
         })
      })
   }
 
   return filterApp;
}


export default Filter