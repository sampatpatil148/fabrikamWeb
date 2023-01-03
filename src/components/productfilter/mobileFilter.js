import React, { useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import Filter from "./filter";
import ProductSort from './productSort';

const MobileFilter = React.memo((props) => {
   const [show, setShow] = useState(false);
   return (
      <div className='mobileFilter'>
         <div className="ms-search-result-container__Sort-by-category-lower-viewports">
            <button onClick={() => setShow(true)} className="msc-button" aria-label="Sort &amp; filter">Sort &amp; filter</button>
         </div>
         <Modal
            show={show}
            onHide={() => setShow(false)}
            className='mobileFilter-modal'
            dialogClassName="modal-90w"
            aria-labelledby="example-custom-modal-styling-title"
         >
            <Modal.Header closeButton>
               <Modal.Title>
                  Sort &amp; filter
               </Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <div className='mobile-filter'>
                  <div className='mobile-sorting'>
                  <ProductSort
                      sortCallBack={props.sortCallBack}
                      defaultSortingKey={props.sortBy}
                    />
                  </div>
                  <div className='mobile-filter-category'>
                     <Filter
                        factset={props.factset}
                        callback={props.callback}
                        filters={props.filters}
                     />
                  </div>
               </div>
            </Modal.Body>
            <Modal.Footer>
               <button type="button" className="ms-sort-and-filter-modal-close msc-btn" area-label="Close" onClick={() => setShow(false)}>Close</button>
            </Modal.Footer>
            
         </Modal>
      </div>
   );
});

export default MobileFilter;