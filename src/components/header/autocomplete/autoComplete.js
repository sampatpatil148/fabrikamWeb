import React, { useState, useEffect, useRef } from 'react';
import ApiAxios from '../../../API/productService';
import {isEmpty} from "../../../library/common";


function AutosuggestBox({ callBack }) {

  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);
  useEffect(() => {
    !isEmpty(searchTerm) && ApiAxios.azurSuggestion(searchTerm).then((response) => {
      response && response.suggestions && setData(response.suggestions);
    });
  }, [searchTerm])
  
  const updateState = (event) => {
    setSearchTerm(event.target.value);
    if (!isEmpty(event.target.value)) {
      callBack(event.target.value);
    } else {
      hideListPanel();
    }
  }
  
  const hideListPanel = () => { 
    setData([])
  }
  const actionEvent = (event) => {
      if(event.keyCode === 27) {
        setData([])
      }
  };

  const textInput = useRef(null);
  useEffect(() => {
    textInput.current.focus();
    document.addEventListener("keydown", actionEvent, false);
    document.addEventListener("click", hideListPanel, false);
    return () => {
      document.removeEventListener("keydown", actionEvent, false);
      document.removeEventListener("click", hideListPanel, false);
    };
  }, []);

  return (
    <div className='AutoSuggestion'>
      <input onChange={ updateState } ref={textInput} type="text" autoComplete="off" className="react-autosuggest__input" placeholder="Search in Fabrikam" name="q" />
      {
        !isEmpty(data) && <div role="listbox" className="react-autosuggest__suggestions-container react-autosuggest__suggestions-container--open">
          <ul role="listbox" className="react-autosuggest__suggestions-list">
            {
              data.map((val, i) => {
                return (
                  <li key={"data" + i.toString()} role="option" aria-selected="false" className="react-autosuggest__suggestion react-autosuggest__suggestion--first">
                    <div key={"dataDiv" + i.toString()}>
                      <a href={`/pdp/${val.text.replace(/\s+/g, '-').toLowerCase()}/${val.document.productID}`} key={"data-list" + i.toString()}>
                        {
                          val.text.split(new RegExp(`(${searchTerm})`, 'gi')).map((part, j) => part.toLowerCase() === searchTerm.toLowerCase() ? <b key={"data-list-bold" + i.toString() + j}>{part}</b> : <span key={"data-list-normal" + i.toString() + j}>{part}</span>)
                        }
                      </a>
                    </div>
                  </li>
                )
              })
            }
          </ul>
        </div>
      }
    </div>
  )
}

export default AutosuggestBox;