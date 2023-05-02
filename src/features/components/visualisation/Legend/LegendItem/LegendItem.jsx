import PropTypes from 'prop-types'
import * as d3 from 'd3'

import { useD3 } from 'core/hooks/useD3/useD3';

import "./LegendItem.scss"

/**
 * The wrapper for item of the `Legend` component
 * 
 * ### Tags
 * @version 0.0.1
 * @component
 * @memberof Visualisation.Legend
 * @type {React.Component}
 * @param {string|number} data The data of the item
 * @param {number} radius Radius of the circle
 * @param {number} fontSize Font size of the text
 * @param {string} color Color of the item
 * @param {string} anchor Anchor of the item 
 * @param {string} transform Transform of the item
 * @param {boolean} active Whether is the item currently active
 * @param {function} onClick Called upon mouse click the item
 * @param {function} onMouseOut Called upon mouse out the item
 * @param {function} onMouseOver Called upon mouse over the item
 * @param {string} children The text element to be rendered as the item
 * 
 * @returns {React.ReactSVGElement} Returns the React component
 */
const LegendItem = ({
    data,
    radius,
    fontSize,
    color,
    anchor,
    transform,
    onClick,
    active,
    onMouseOut,
    onMouseOver,
    children }) => {

    const circle = useD3((g) => {
        g.datum({ item: data })
    }, [data])

    const text = useD3((g) => {
        g.datum({ item: data })
    }, [data])

    /**
     * Called upon clicking the item
     * 
     * @param {React.MouseEvent} e 
     */
    const onClickHandler = (e) => {
        if (onClick) onClick(e)
    }

    /**
     * Called upon mouse over the item
     * 
     * @param {React.MouseEvent} e 
     */
    const onMouseOverHandler = (e) => {
        if (onMouseOver) onMouseOver(e)

        d3.select(text.current)
            .classed("hover", true)
            .style("stroke", d3.color(color).brighter(0.2))
    }

    /**
     * Called upon mouse out the item
     * 
     * @param {React.MouseEvent} e 
     */
    const onMouseOutHandler = (e) => {
        if (onMouseOut) {
            onMouseOut(e)
        }

        d3.select(circle.current)
            .classed("hover", false)
            .style("fill", active ? color : "gray")
            .style("stroke", "white")

        d3.select(text.current)
            .classed("hover", false)
            .style("stroke", "white")
    }

    return (
        <g className='legend-item'
            pointerEvents='all'
            id={`legend-item-${data}`}
            transform={transform}
            cursor='pointer'
            onClick={onClickHandler}
            onMouseOver={onMouseOverHandler}
            onMouseOut={onMouseOutHandler}>
            <circle
                className='legend-circle'
                ref={circle}
                r={radius}
                fill={active ? color : "gray"}>
            </circle>
            <text
                className='legend-text'
                ref={text}
                x={fontSize}
                fontSize={fontSize}
                textAnchor={anchor}
                alignmentBaseline={"middle"}>
                {children}
            </text>
        </g>
    )
}

LegendItem.propTypes = {
    /** The data of the item */
    data: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    /** Radius of the circle */
    radius: PropTypes.number,
    /** Font size of the text */
    fontSize: PropTypes.number,
    /** Color of the item */
    color: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    /** Anchor of the item */
    anchor: PropTypes.oneOf(['start', 'middle', 'end']),
    /** Transform of the item */
    transform: PropTypes.string,
    /** Whether is the item currently active */
    active: PropTypes.bool,
    /** Called upon mouse click the item */
    onClick: PropTypes.func,
    /** Called upon mouse out the item */
    onMouseOut: PropTypes.func,
    /** Called upon mouse over the item */
    onMouseOver: PropTypes.func,
    /** The text element to be rendered as the item */
    children: PropTypes.node
}

LegendItem.defaultProps = {
    radius: 14,
    fontSize: 16,
    color: "#000000",
    anchor: 'start',
    active: true,
    transform: "translate(0, 0)",
    onClick: (e) => { },
    onMouseOut: (e) => { },
    onMouseOver: (e) => { },
}

export default LegendItem