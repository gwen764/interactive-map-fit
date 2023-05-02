import * as d3 from 'd3'
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types'

import d3Utils from '@core/utils/d3Utils'

import LegendItem from './LegendItem/LegendItem';

import "./LegendTitle.scss"

const uuid = require('react-uuid')
const _ = require('lodash');

/**
 * The legend component renders a simple legend for an `<svg>`.
 * The legend is interactive and provides `onMouseOver`, `onMouseOut`, `onClick` and `onChange` events.
 * Upon hovering, the colors of the text change automatically. 
 * 
 * ### Tags
 * @version 0.0.1
 * @component
 * @memberof Visualisation.Legend
 * @type {React.Component}
 * @param {function} scale The d3 scale object to render the legend from
 * @param {Array} range The range array of colors
 * @param {Array} domain The domain array of the legend
 * @param {number} size The size of the legend items and text
 * @param {number} x The X starting position
 * @param {number} y The Y starting position
 * @param {number} padding Padding of the legend items 
 * @param {Object} data If specified replaces the domain with the given data values with keys as domain of this data
 * @param {string} title Optional title above the legend
 * @param {string} anchor The anchor of the legend text
 * @param {string} variant Layout variant
 * @param {bool} count Whether to include count of the items in title
 * @param {bool} interactive Whether is interactive
 * @param {function} onClick Called upon legend item clicked
 * @param {function} onMouseOver Called upon legend item mouse over
 * @param {function} onMouseOut Called upon legend item mouse out
 * @param {function} onChange Called upon legend state changes (in `interactive` mode). Carries an array of the active legend items.
 * 
 * @returns {React.ReactSVGElement} Returns the React component
 */
const Legend = ({
    scale,
    range,
    domain,
    title,
    size,
    x,
    y,
    interactive,
    data,
    anchor,
    variant,
    count,
    padding,
    onClick,
    onMouseOver,
    onMouseOut,
    onChange }) => {

    // Get scale or construct one from range and domain
    const legendScale = scale === undefined ? d3.scaleOrdinal(range).domain(domain) : scale
    const [active, setActive] = useState(legendScale.domain())

    const titleFontSize = title ? size * 2 : 0
    const legendOffset = _.size(_.maxBy(legendScale.domain(), (d) => _.size(d)))
    const translate = variant === 'horizontal' ? { x: x - legendOffset, y: y } : { x: x, y: y - legendOffset }

    const itemsOffset = titleFontSize + 10;
    var itemOffset = 0;
    var previousItemOffset = 0;

    /**
     * Changes the state of the interactive legend
     * 
     * @param {string|number} item 
     */
    const setActiveItem = (item) => {
        var f = [...active]
        active.includes(item) ? f.splice(f.indexOf(item), 1) : f.push(item)
        var newFilter = [...new Set(f)]

        setActive(newFilter)
        onChange(newFilter)
    }

    /**
     * Changes the state of the interactive legend
     * 
     * @param {React.MouseEvent} e The event
     */
    const onLegendItemClick = (e) => {
        if (onClick) onClick(e)

        var d = e.target.__data__
        if (interactive) setActiveItem(d.item)
    }

    useEffect(() => {
        setActive(Object.values(legendScale.domain()))
    }, [scale])

    return (
        <g className='legend'
            transform={d3Utils.translate(translate)}>
            {title &&
                <text
                    className='legend-title'
                    dx={-size}
                    fontSize={titleFontSize}>
                    {`${_.upperFirst(title)}`}{count ? ` (${legendScale.domain().length})` : ''}
                </text>}
            <g className='legend-items'
                transform={d3Utils.translate({ x: 0, y: itemsOffset })}>
                {legendScale.domain().map((d, i) => {
                    // Get the data if specified
                    var item = data ? (data[d] ? data[d] : d) : d
                    itemOffset += previousItemOffset
                    previousItemOffset = (_.size(item) * size) + 2 * size + padding;
                    itemOffset = variant === 'horizontal' ? itemOffset : i * size * padding
                    var itemTranslate = variant === 'horizontal' ? { x: itemOffset, y: 0 } : { x: 0, y: itemOffset }
                    return (
                        <LegendItem
                            key={uuid()}
                            transform={d3Utils.translate(itemTranslate)}
                            anchor={anchor}
                            radius={size}
                            data={d}
                            fontSize={size * 1.5}
                            color={legendScale(d)}
                            active={active?.includes(d)}
                            onClick={onLegendItemClick}
                            onMouseOut={onMouseOut}
                            onMouseOver={onMouseOver}>
                            {_.upperFirst(item)}
                        </LegendItem>)
                })}
            </g>
        </g>
    )
}

Legend.propTypes = {
    /** The d3 scale object to render the legend from */
    scale: PropTypes.any,
    /** The range array of colors */
    range: PropTypes.arrayOf(PropTypes.string),
    /** The domain array of the legend */
    domain: PropTypes.array,
    /** Optional title above the legend */
    title: PropTypes.string,
    /** The size of the legend items and text */
    size: PropTypes.number,
    /** The X starting position */
    x: PropTypes.number,
    /** The Y starting position */
    y: PropTypes.number,
    /** Whether is interactive */
    interactive: PropTypes.bool,
    /** If specified replaces the domain with the given data values with keys as domain of this data */
    data: PropTypes.object,
    /** The anchor of the legend text */
    anchor: PropTypes.oneOf(['start', 'middle', 'end']),
    /** Layout variant */
    variant: PropTypes.oneOf(['vertical', 'horizontal']),
    /** Whether to include count of the items in title */
    count: PropTypes.bool,
    /** Padding of the legend items */
    padding: PropTypes.number,
    /** Called upon legend item clicked */
    onClick: PropTypes.func,
    /** Called upon legend item mouse over */
    onMouseOver: PropTypes.func,
    /** Called upon legend item mouse out */
    onMouseOut: PropTypes.func,
    /** Called upon legend state changes (in `interactive` mode) */
    onChange: PropTypes.func
}

Legend.defaultProps = {
    scale: undefined,
    range: d3.schemeSet2,
    domain: ["a", "b", "c", "d", "e", "f", "g"],
    title: null,
    size: 14,
    x: 0,
    y: 0,
    data: null,
    interactive: false,
    anchor: 'start',
    variant: 'vertical',
    count: false,
    padding: 2.5,
    onClick: () => { },
    onMouseOver: () => { },
    onMouseOut: () => { },
    onChange: () => { }
}

export default Legend