
import React, { useState, useEffect } from 'react';
const BackToTop = () => {

  const [display, setdisplay] = useState(false)

  useEffect(() => {
    window.addEventListener('scroll', checkScrollTop)
    return function cleanup() {
      window.removeEventListener('scroll', checkScrollTop)
    }
  })

  const checkScrollTop = () => {
    if (!display && window.pageYOffset > 400) {
      setdisplay(true)
    } else if (display && window.pageYOffset <= 400) {
      setdisplay(false)
    }
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={display ? 'backtotop' : 'backtotop backtotop-none'} >
      <button type='button' onClick={scrollTop} className="scrollTop back-to-top ms-back-to-top" aria-label="Back to top">
        <i className="fa fa-chevron-up" aria-hidden="true"></i>
      </button>
    </div>
  );
}

export default BackToTop;