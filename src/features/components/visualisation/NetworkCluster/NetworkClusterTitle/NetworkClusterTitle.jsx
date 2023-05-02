import { useEffect } from 'react'
import * as d3 from 'd3'

import { useD3 } from '@core/hooks';
import d3Utils from '@core/utils/d3Utils';

import "./NetworkClusterTitle.scss"

/**
 * The Network Cluster Title component
 * 
 * ### Tags
 * @version 0.0.1
 * @component
 * @memberof Visualisation.NetworkCluster
 * @type {React.Component}
 * @param {Node} node Node object
 * @param {string} color The color of the title
 * @param {number} fontSize The size of the font
 * @param {number} transitionTime Transition time for enabling clusters animation
 * @param {boolean} visible Is currently visible
 * @param {function} restartDrag Called upon restarting dragging
 * @param {function} stopDrag Called upon stopping dragging
 * 
 * @returns {React.ReactSVGElement} Returns the React component
 */
const NetworkClusterTitle = ({ node, color, fontSize, transitionTime, visible, drag }) => {
    const draggable = drag()

    const ref = useD3((g) => {
        g.datum(node)

        if(draggable)
            g.call(draggable);

    }, [node])

    useEffect(() => {
        d3.select(ref.current)
            .transition()
            .duration(transitionTime)
            .attr('opacity', visible ? 1 : 0)
    }, [visible])

    return (
        <text
            className='network-cluster-title'
            ref={ref}
            x={node.x}
            y={node.y}
            fontSize={fontSize}
            fill={color}>
            {`#${node.cluster} ${node.name}`}
        </text>
    )
}

export default NetworkClusterTitle