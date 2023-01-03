import React from 'react';
import ProductSlider from '../components/productdetails/productSlider/productslider';
import ProductDetails from '../components/productdetails/productDetails/productDetails';
import ProductSpecification from '../components/productdetails/productspecification/productspecification';
import ProductItemCarousel from '../components/productdetails/productItemCarousel/productItemCarousel';
import ProductReview from '../components/productdetails/productreview/productreview';
import BreadCrumbs from '../library/breadCrumbs/breadCrumbs';
import { getURlarg } from "../library/common";
import ApiAxios from '../API/productService';

class Pdp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      productDetails: undefined,
      loading: true
    }
  }

   componentDidMount() {
     ApiAxios.azurlookup(getURlarg(2)).then((details) => { 
       this.setState({
         productDetails: details,
         loading:false
       })
        ApiAxios.getSliderValue('recentP',details.MasterProductId);
     });
    
  }

  render() {
    return (

      <div className="product-details">
        <div className='default-container default-container__2 container'>
          <BreadCrumbs data={this.state.productDetails} />
          { !this.state.loading && 
            <>
              <div className="ms-buybox">
                <ProductSlider img={this.state.productDetails} />
                <ProductDetails details={this.state.productDetails} />
              </div>
              <ProductItemCarousel masterId={this.state.productDetails.MasterProductId}/>
              <ProductSpecification />
              <ProductReview />
            </>
          }{
            this.state.loading && <div className='loader-container'>
            <div className="spinner-border loading" role="status">
            <span className="sr-only">Loading...</span>
              </div>
            </div>
          }
        </div>
      </div>
    );
  }
}
export default Pdp;
