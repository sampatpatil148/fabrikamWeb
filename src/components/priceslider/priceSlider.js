import PropTypes from "prop-types";
import React, { useState, useRef, useCallback, useEffect } from "react";
import classnames from 'classnames'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from "react-bootstrap/Tooltip";

const MultiRangeSlider = ({ min, max, onChange, reset }) => {
    const [minVal, setMinVal] = useState(min);
    const [maxVal, setMaxVal] = useState(max);
    const minValRef = useRef(null);
    const maxValRef = useRef(null);
    const range = useRef(null);

    const getPercent = useCallback(
        (value) => Math.round(((value - min) / (max - min)) * 100),
        [min, max]
    );
    useEffect(() => {
        if (maxValRef.current) {
            const minPercent = getPercent(minVal);
            const maxPercent = getPercent(+maxValRef.current.value); // Preceding with '+' converts the value from type string to type number

            if (range.current) {
                range.current.style.left = `${minPercent}%`;
                range.current.style.width = `${maxPercent - minPercent}%`;
            }
        }
    }, [minVal, getPercent]);
    useEffect(() => {
        if (reset === -1) {
            setMinVal(min);
            setMaxVal(max)
        }
    }, [max, min,reset]);
    
    useEffect(() => {
        if (minValRef.current) {
            const minPercent = getPercent(+minValRef.current.value);
            const maxPercent = getPercent(maxVal);

            if (range.current) {
                range.current.style.width = `${maxPercent - minPercent}%`;
            }
        }
    }, [maxVal, getPercent]);

    return (
        <div className="container mt-3">
            <div className='PriceSlider'>
                <OverlayTrigger
                    delay={{ hide: 450, show: 300 }}

                    style={{ 'left': '-98px' }}
                    overlay={(props) => (
                        <Tooltip {...props}>
                            {"$" + minVal + ".00"}
                        </Tooltip>
                    )}
                    placement="top"
                >
                    <input
                        type="range"
                        min={min}
                        max={max}
                        value={minVal}
                        ref={minValRef}
                        onChange={(event) => {
                            const value = Math.min(+event.target.value, maxVal - 1);
                            setMinVal(value);
                            onChange({ min: minVal, max: maxVal });
                            event.target.value = value.toString();
                        }}
                        className={classnames("thumb thumb--zindex-3", {
                            "thumb--zindex-5": minVal > max - 100
                        })}
                    />
                </OverlayTrigger>

                <OverlayTrigger
                    delay={{ hide: 450, show: 300 }}

                    style={{ 'left': '-98px' }}
                    overlay={(props) => (
                        <Tooltip {...props} >
                            {"$" + maxVal + ".00"}
                        </Tooltip>
                    )}
                    placement="top"
                >
                    <input
                        type="range"
                        min={min}
                        max={max}
                        value={maxVal}
                        ref={maxValRef}
                        onChange={(event) => {
                            const value = Math.max(+event.target.value, minVal + 2);
                            setMaxVal(value);
                            onChange({ min: minVal, max:Math.round(maxVal+2) });
                            event.target.value = value.toString();
                        }}
                        className="thumb thumb--zindex-4"
                    />
                </OverlayTrigger>

                <div className="slider">
                    <div className="slider__track" />
                    <div ref={range} className="slider__range" />
                    <div className="slider__left-value d-inline-block pt-4 mb-3">{"$" + min + ".00"}</div>
                    <div className="slider__right-value float-right pt-4 mb-3">{"$" + max + ".00"}</div>
                </div>
            </div>
        </div>
    );
};

MultiRangeSlider.propTypes = {
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired
};

export default MultiRangeSlider;
