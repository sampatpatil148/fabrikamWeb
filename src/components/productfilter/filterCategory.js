import React from 'react';
import { filterAzur, isEmpty } from '../../library/common';
const FilterCategory = (props) => {
    const searchCategory = excludeOption(props.searchCategory);
    return (
        <>
            {
                !isEmpty(searchCategory) && <div className="msc-choice-summary" key={`div-main-${props.searchCategory.lenght}`}>
                    <ul className="ms-choice-summary-by-category msc-choice-summary__list list-unstyled" key={`main-${props.searchCategory.lenght}`}>
                        {
                            searchCategory && searchCategory.map((i) => {
                                return (
                                    <li key={`${i.field}-${i.value}`} className="msc-choice-summary__list-item" aria-posinset="0" aria-setsize="1">
                                        <button className="msc-choice-summary__item" aria-label="Close" onClick={() => { props.callback(`${i.field}-${i.value}`) }}>
                                            <span className="item-name">{i.value}</span>
                                            <span className="msi-close-btn msc-choice-summary__glyph" role="button" aria-label="Remove filter."><i className="fa fa-times" aria-hidden="true"></i></span>
                                        </button>
                                    </li>
                                );
                            })
                        }

                    </ul>
                    {!isEmpty(searchCategory) && <div className="msc-choice-summary__list-item" key={`All-clear-${props.searchCategory.lenght}`}>
                        <button className="msc-choice-summary__clear-all hide" area-label="clear All" onClick={() => { props.callback('all') }}>Clear all</button>
                    </div>
                    }
                </div>
            }
        </>
    );
}

function excludeOption(filterCategory) {
    let rootFilter = filterAzur();
    rootFilter = rootFilter.map(e => e.value)
    return filterCategory.filter(e => !rootFilter.includes(e.value));
}

export default FilterCategory;