import { Tooltip } from '@mui/material'
import { useState } from "react"
import * as d3 from 'd3'

import { useD3 } from '@core/hooks'

import "./CirclePackingNode.scss"

/**
 * The Circle packing node component
 * 
 * ### Tags
 * @version 0.0.1
 * @component
 * @memberof Visualisation.CirclePacking
 * @type {React.Component}
 * @param {string} id The id of the current svg canvas
 * @param {Pack} node The given pack node 
 * @param {boolean} leaf Whethe is leaf
 * @param {Object} style Style object of the node
 * @param {string} d Attribute of the `path` element to be drawn
 * @param {boolean} selected Whether is selected or not
 * @param {function} onSelectNode Called upon node selecting
 * 
 * @returns {React.ReactSVGElement} Returns the React component
 */
const CirclePackingNode = ({ id, node, leaf, style, d, selected, onSelectNode }) => {
    const [hover, setHover] = useState(selected)

    const ref = useD3((g) => {
        g.datum(node)
        g.classed(`group-${"group" in node.data ? node.data.group : "none"}`, true)
        g.classed("leaf", leaf)
    }, [node])

    style = {
        ...style,
        pointerEvents: style.strokeWidth || d3.color(style.fill) ? "all" : "none"
    }

    /**
     * On Click 
     * 
     * @param {React.MouseEvent} e The event
     */
    const onClickHandler = (e) => {
        if (onSelectNode) onSelectNode(e)
    }

    /**
     * On Mouser Over 
     * 
     * @param {React.MouseEvent} e The event
     */
    const onMouseOverHandler = (e) => {
        d3.select(ref.current)
            .transition()
            .duration(200)
            .style("stroke-width", 6)
            .style("stroke", () => style.fill === "none" ?
                d3.color(style.stroke).darker(1.2) : d3.color(style.fill).darker(1.2))

        if (!selected)
            setHover(true)
    }

    /**
     * On Mouser Out 
     * 
     * @param {React.MouseEvent} e The event
     */
    const onMouseOutHandler = (e) => {
        d3.select(ref.current)
            .transition()
            .duration(200)
            .style("stroke", style.stroke)
            .style("stroke-width", style.strokeWidth)

        if (!selected)
            setHover(false)
    }

    return (
        <Tooltip
            title={leaf && node.data.name}>
            <path
                className='circle-packing-node'
                ref={ref}
                id={hover && !leaf ? `circle-packing-node-${node.data.name}-${node.data.label}-${id}` : null}
                d={d}
                transform={`translate(${node.x}, ${node.y})`}
                onMouseOver={onMouseOverHandler}
                onMouseOut={onMouseOutHandler}
                onClick={onClickHandler}
                style={style}>
            </path>
        </Tooltip>
    )
}

export default CirclePackingNode