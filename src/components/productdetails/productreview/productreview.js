import React from 'react';

function ProductReview() {
    return (
        <div className="productReview">
            <h2>Reviews</h2>
            <div className="productReview-line">
                <button type="button" className="productReview-btn" area-label="Product Review">
                    <span className="productReview-star">5</span>
                    <div className="p-progressbar" aria-busy="true">
                        <div className="p-progressbar-percentage" style={{width: "42.857142857142854%"}} role="progressbar" aria-valuemax="100" aria-valuenow="42.857142857142854" aria-label="5 stars, 43% of users gave 5 stars" aria-busy="true"></div>
                        <span className="p-percentage">43%</span>
                    </div>
                </button>
                <button type="button" className="productReview-btn" area-label="Product Review">
                    <span className="productReview-star">4</span>
                    <div className="p-progressbar" aria-busy="true">
                        <div className="p-progressbar-percentage" style={{width: "28.57142857142857%"}} role="progressbar" aria-valuemax="100" aria-valuenow="28.57142857142857" aria-label="4 stars, 29% of users gave 4 stars" aria-busy="true"></div>
                        <span className="p-percentage">29%</span>
                    </div>
                </button>
                <button type="button" className="productReview-btn" area-label="Product Review">
                    <span className="productReview-star">3</span>
                    <div className="p-progressbar" aria-busy="true">
                        <div className="p-progressbar-percentage" style={{width: "21.428571428571427%"}} role="progressbar" aria-valuemax="100" aria-valuenow="21.428571428571427" aria-label="3 stars, 21%% of users gave 3 stars" aria-busy="true"></div>
                        <span className="p-percentage">21%</span>
                    </div>
                </button>
                <button type="button" className="productReview-btn" area-label="Product Review">
                    <span className="productReview-star">2</span>
                    <div className="p-progressbar" aria-busy="true">
                        <div className="p-progressbar-percentage" style={{width: "7.142857142857142%"}} role="progressbar" aria-valuemax="100" aria-valuenow="7.142857142857142" aria-label="2 stars, 7%% of users gave 2 stars" aria-busy="true"></div>
                        <span className="p-percentage">7%</span>
                    </div>
                </button>
                <button type="button" className="productReview-btn" area-label="Product Review">
                    <span className="productReview-star">1</span>
                    <div className="p-progressbar" aria-busy="true">
                        <div className="p-progressbar-percentage" style={{width: "0%"}} role="progressbar" aria-valuemax="100" aria-valuenow="0" aria-label="1 stars, 0%% of users gave 1 stars" aria-busy="true"></div>
                        <span className="p-percentage">0%</span>
                    </div>
                </button>
            </div>
            <p>Please sign in to rate and review.</p>
            <a href="#" aria-labelledby="signin" className="p-signin">Sign in</a>
            <div className="row">
                <div className="col-md-12 col-lg-12 col-xl-12 col-sm-12 col-xs-12">
                    <div className="reviews-list">
                        <div className="col-md-4 col-lg-6 col-xl-6 col-sm-12 col-xs-4">
                            <div className="rating no-rating">
                                <div className="rating-group">
                                    <span className="rating-star" role="presentation"></span>
                                    <span className="rating-star" role="presentation"></span>
                                    <span className="rating-star" role="presentation"></span>
                                    <span className="rating-star" role="presentation"></span>
                                    <span className="rating-empty-star" role="presentation"></span>
                                </div>
                                <p className="rating-count">4.1 / 5 (15)</p>
                            </div>
                        </div>
                        <div className="col-md-8 col-lg-6 col-xl-6 col-sm-12 col-xs-8">
                            <div className="reviews-list-refiners">
                                <label className="dropdown-label" htmlFor="reviewsListSortBy">Sort by:</label>
                                <select id="reviewsListSortBy" className="dropdown-select">
                                    <option className="dropdown-option" aria-selected="true">Most helpful</option>
                                    <option className="dropdown-option" aria-selected="false">Most recent</option>
                                    <option className="dropdown-option" aria-selected="false">Highest rated</option>
                                    <option className="dropdown-option" aria-selected="false">Lowest rated</option>
                                </select>
                                <label className="dropdown-label" htmlFor="reviewsListFilterBy">Filter by:</label>
                                <select id="reviewsListFilterBy" className="dropdown-select">
                                    <option className="dropdown-option" aria-selected="true">All ratings</option>
                                    <option className="dropdown-option" aria-selected="false">5 stars</option>
                                    <option className="dropdown-option" aria-selected="false">4 stars</option>
                                    <option className="dropdown-option" aria-selected="false">3 stars</option>
                                    <option className="dropdown-option" aria-selected="false">2 stars</option>
                                    <option className="dropdown-option" aria-selected="false">1 star</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-12 col-lg-12 col-xl-12 col-sm-12 col-xs-12">
                            <div className="reviews-list-reviews">
                                <div className="row reviews-list-card">
                                    <div className="col-md-3 col-lg-2 col-xl-2 col-sm-12 col-xs-12">
                                        <div className="reviews-list-card-header">
                                            <div className="reviews-list-rating">
                                                <div className="rating-group">
                                                    <span className="rating-star" role="presentation"></span>
                                                    <span className="rating-star" role="presentation"></span>
                                                    <span className="rating-star" role="presentation"></span>
                                                    <span className="rating-star" role="presentation"></span>
                                                    <span className="rating-star" role="presentation"></span>
                                                </div>
                                            </div>
                                            <p className="reviews-list-name">Lexy</p>
                                            <p className="reviews-list-date">April 15, 2021</p>
                                        </div>
                                    </div>
                                    <div className="col-md-9 col-lg-10 col-xl-10 col-sm-12 col-xs-12">
                                        <div className="reviews-list-card-body">
                                            <div className="reviews-list-review">
                                                <h4 className="reviews-list-title">Great shoe</h4>
                                                <p className="reviews-list-text">I find this shoe to be perfect. It fits very well, Just needed a short break-in period.</p>
                                            </div>
                                            <div className="reviews-list-card-controls">
                                                <p className="reviews-list-helpful">Was this helpful?</p>
                                                <a href="#" aria-label="Upvote this review" title="(6)" className="reviews-list-like">(6)</a>
                                                <a href="#" aria-label="Downvote this review" title="(0)" className="reviews-list-dislike">(0)</a>
                                                <a href="#" className="reviews-list-report"> Report</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row reviews-list-card">
                                    <div className="col-md-3 col-lg-2 col-xl-2 col-sm-12 col-xs-12">
                                        <div className="reviews-list-card-header">
                                            <div className="reviews-list-rating">
                                                <div className="rating-group">
                                                    <span className="rating-star" role="presentation"></span>
                                                    <span className="rating-star" role="presentation"></span>
                                                    <span className="rating-star" role="presentation"></span>
                                                    <span className="rating-star" role="presentation"></span>
                                                    <span className="rating-star" role="presentation"></span>
                                                </div>
                                            </div>
                                            <p className="reviews-list-name">Sadie</p>
                                            <p className="reviews-list-date">May 25, 2021</p>
                                        </div>
                                    </div>
                                    <div className="col-md-9 col-lg-10 col-xl-10 col-sm-12 col-xs-12">
                                        <div className="reviews-list-card-body">
                                            <div className="reviews-list-review">
                                                <h4 className="reviews-list-title">Exactly what I was looking for.</h4>
                                                <p className="reviews-list-text">I was nervous about buying shoes like this online, but turned out to be one of the best shoe deals I have found in a long time.</p>
                                            </div>
                                            <div className="reviews-list-card-controls">
                                                <p className="reviews-list-helpful">Was this helpful?</p>
                                                <a href="#" aria-label="Upvote this review" title="(5)" className="reviews-list-like">(5)</a>
                                                <a href="#" aria-label="Downvote this review" title="(0)" className="reviews-list-dislike">(0)</a>
                                                <a href="#" className="reviews-list-report"> Report</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row reviews-list-card">
                                    <div className="col-md-3 col-lg-2 col-xl-2 col-sm-12 col-xs-12">
                                        <div className="reviews-list-card-header">
                                            <div className="reviews-list-rating">
                                                <div className="rating-group">
                                                    <span className="rating-star" role="presentation"></span>
                                                    <span className="rating-star" role="presentation"></span>
                                                    <span className="rating-star" role="presentation"></span>
                                                    <span className="rating-star" role="presentation"></span>
                                                    <span className="rating-star" role="presentation"></span>
                                                </div>
                                            </div>
                                            <p className="reviews-list-name">Jonathan</p>
                                            <p className="reviews-list-date">May 24, 2021</p>
                                        </div>
                                    </div>
                                    <div className="col-md-9 col-lg-10 col-xl-10 col-sm-12 col-xs-12">
                                        <div className="reviews-list-card-body">
                                            <div className="reviews-list-review">
                                                <h4 className="reviews-list-title">Great fit and comfortable</h4>
                                                <p className="reviews-list-text">One can't go wrong with these . Great fit and comfortable.</p>
                                            </div>
                                            <div className="reviews-list-card-controls">
                                                <p className="reviews-list-helpful">Was this helpful?</p>
                                                <a href="#" aria-label="Upvote this review" title="(5)" className="reviews-list-like">(5)</a>
                                                <a href="#" aria-label="Downvote this review" title="(0)" className="reviews-list-dislike">(0)</a>
                                                <a href="#" className="reviews-list-report"> Report</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row reviews-list-card">
                                    <div className="col-md-3 col-lg-2 col-xl-2 col-sm-12 col-xs-12">
                                        <div className="reviews-list-card-header">
                                            <div className="reviews-list-rating">
                                                <div className="rating-group">
                                                    <span className="rating-star" role="presentation"></span>
                                                    <span className="rating-star" role="presentation"></span>
                                                    <span className="rating-star" role="presentation"></span>
                                                    <span className="rating-star" role="presentation"></span>
                                                    <span className="rating-star" role="presentation"></span>
                                                </div>
                                            </div>
                                            <p className="reviews-list-name">Bradford</p>
                                            <p className="reviews-list-date">May 23, 2021</p>
                                        </div>
                                    </div>
                                    <div className="col-md-9 col-lg-10 col-xl-10 col-sm-12 col-xs-12">
                                        <div className="reviews-list-card-body">
                                            <div className="reviews-list-review">
                                                <h4 className="reviews-list-title">The shoes are nice, but they were a tiny bit big</h4>
                                                <p className="reviews-list-text">The shoes are nice, but they were a tiny bit too big for me. The color is a little lighter than shown.</p>
                                            </div>
                                            <div className="reviews-list-card-controls">
                                                <p className="reviews-list-helpful">Was this helpful?</p>
                                                <a href="#" aria-label="Upvote this review" title="(4)" className="reviews-list-like">(4)</a>
                                                <a href="#" aria-label="Downvote this review" title="(0)" className="reviews-list-dislike">(0)</a>
                                                <a href="#" className="reviews-list-report"> Report</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row reviews-list-card">
                                    <div className="col-md-3 col-lg-2 col-xl-2 col-sm-12 col-xs-12">
                                        <div className="reviews-list-card-header">
                                            <div className="reviews-list-rating">
                                                <div className="rating-group">
                                                    <span className="rating-star" role="presentation"></span>
                                                    <span className="rating-star" role="presentation"></span>
                                                    <span className="rating-star" role="presentation"></span>
                                                    <span className="rating-star" role="presentation"></span>
                                                    <span className="rating-star" role="presentation"></span>
                                                </div>
                                            </div>
                                            <p className="reviews-list-name">Algernon</p>
                                            <p className="reviews-list-date">May 17, 2021</p>
                                        </div>
                                    </div>
                                    <div className="col-md-9 col-lg-10 col-xl-10 col-sm-12 col-xs-12">
                                        <div className="reviews-list-card-body">
                                            <div className="reviews-list-review">
                                                <h4 className="reviews-list-title">Love these shoes</h4>
                                                <p className="reviews-list-text">Love these shoes! Looking for a while to find this color and style. So happy I came across this deal at $100. Very comfortable compared to my other dress shoes</p>
                                            </div>
                                            <div className="reviews-list-card-controls">
                                                <p className="reviews-list-helpful">Was this helpful?</p>
                                                <a href="#" aria-label="Upvote this review" title="(4)" className="reviews-list-like">(4)</a>
                                                <a href="#" aria-label="Downvote this review" title="(0)" className="reviews-list-dislike">(0)</a>
                                                <a href="#" className="reviews-list-report"> Report</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductReview;