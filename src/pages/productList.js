import React, { useEffect, useState } from "react";
import ApiAxios from '../API/productService';
import { filterAzur, getUrlParameter, isEmpty, getURlarg, removeSpecials } from '../library/common';
import List from "../components/productlist/list";
import Pager from '../components/Pager/Pager';
import BreadCrumbs from '../library/breadCrumbs/breadCrumbs';
import BestSelling from '../components/productlist/bestSelling/bestSelling';
import Filter from "../components/productfilter/filter";
import ProductSort from "../components/productfilter/productSort";
import MobileFilter from "../components/productfilter/mobileFilter";
import FilterCategory from '../components/productfilter/filterCategory';


export default function ProductList() {
  const [filters, setFilters] = useState(filterAzur());
  const [results, setResults] = useState([]);
  const [resultCount, setResultCount] = useState(0);
  const [sortBy, setsortBy] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [q] = useState(getUrlParameter('q') ?? "*");
  const [top] = useState(getUrlParameter('top') ?? process.env.REACT_APP_productPerPage);
  const [skip, setSkip] = useState(getUrlParameter('skip') ?? 0);
  const [facets, setFacets] = useState({});
  const [loadiing, setLoadiing] = useState(true);
  const [callCount, setCallCount] = useState(0);

  const fetchData = async (q, top, skip, filter, sortBy) => {
    return await ApiAxios.azurSearch(q, top, skip, filter, sortBy, getURlarg().pop());
  }

  let updatePagination = (newPageNumber) => {
    setCurrentPage(newPageNumber);
    setSkip((newPageNumber - 1) * top);
  }
  const sortCallBack = (event) => {
    const sort = event.target.value;
    //if (sort.trim() !== '') {
    let sortValue = [sort];
    setsortBy(sortValue);
    //}
  }
  const resetFilter = (key) => {
    if (key === 'all') {
      setFilters(filterAzur())
    } else {
      const [category, ...value] = key.split('-');
      setFilters(filters.filter(e => e.field === category && e.value === value.join('-') ? false : true))
    }
  }
  const searchHeading = () => {
    let searchKey = getUrlParameter('q');
    return (
      <h2>
        <span className="ms-search-result__collection-title-prefix">
          Results for
        </span>
        <span className="ms-search-result__collection-title-text">
          {" " + removeSpecials(!isEmpty(searchKey) ? `"${searchKey}"` : getURlarg().pop())}
        </span>
        <span className="brackets m-l-4">(</span>
        <span className="ms-search-result__collection-title-count">
          {!loadiing ?
            <>
              {resultCount}
              {
                resultCount === 1 ? " product" : " products"
              }
            </> : "..."
          }
        </span>
        <span className="brackets">)</span>
      </h2>
    )
  }

  useEffect(() => {
    setLoadiing(true);
    fetchData(q, top, skip, filters, sortBy).then(response => {
      if (response && response.data) {
        setResults(response.data.results);
        setResultCount(response.data.count);
        callCount === 0 && setFacets(response.data.facets);
        setLoadiing(false);
        setCallCount(callCount + 1);//prevent render componenets
      }
    });
  }, [skip, sortBy, filters, q, top]);


  return (
    <div className="product-list">
      <div className="default-container default-container__2 container">
        {<BreadCrumbs />}
        <div
          className="ms-search-result-container"
          data-m-t="search-result-container"
          data-m-layout="mediumWidth"
        >
          <div className="ms-search-result-container__refine-product-section">

            {
              <Filter
                factset={facets}
                callback={setFilters}
                filters={filters}
              />
            }
            <div className="ms-search-result-container__product-section">
              <div className="ms-feature-search-result"></div>
              <div className="ms-search-result-wrapper-title-choice-summary">
                {
                  <div className="ms-search-result-container__title result-count-category">
                    {searchHeading()}
                  </div>
                }
                {
                  <FilterCategory searchCategory={filters} callback={resetFilter} />
                }
              </div>
              <div className="ms-search-result-wrapper-sort-by-category">
                {
                  <MobileFilter
                    factset={facets}
                    callback={setFilters}
                    filters={filters}
                    sortCallBack={sortCallBack}
                    defaultSortingKey={sortBy}
                  />
                }
                {
                  isEmpty(getUrlParameter('q')) && <ProductSort
                    sortCallBack={sortCallBack}
                    defaultSortingKey={sortBy}
                  />
                }
              </div>
              {
                !loadiing && <List
                  data={results}
                />
              }
              {
                loadiing && <div className="spinner-border loading" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              }
              {
                results.length !== 0 && !loadiing && <Pager
                  className="pager-style"
                  currentPage={currentPage}
                  resultCount={resultCount}
                  resultsPerPage={top}
                  setCurrentPage={updatePagination} />
              }
            </div>
          </div>
        </div>
        <BestSelling />
      </div>
    </div>
  );
}