import { useState } from 'react'

import { useD3 } from '@core/hooks';
import d3Utils from '@core/utils/d3Utils'

import "./NetworkClusterNodeLabel.scss"

/**
 * The Network Cluster Node Label component
 * 
 * ### Tags
 * @version 0.0.1
 * @component
 * @memberof Visualisation.NetworkCluster
 * @type {React.Component}
 * @param {Node} node Node object
 * @param {string} color The color of the title
 * @param {number} fontSize The size of the font
 * @param {number} padding Padding of the text inside the rectangle
 * @param {number} borderRadius Border radius of the rectangle
 * @param {function} restartDrag Called upon restarting dragging
 * @param {function} stopDrag Called upon stopping dragging
 * 
 * @returns {React.ReactSVGElement} Returns the React component
 */
const NetworkClusterNodeLabel = ({ node, fontSize, padding, borderRadius, drag }) => {
    const draggable = drag()
    const [box, setBox] = useState(null)

    const text = useD3((g) => {
        g.datum(node)
        g.call(d3Utils.getBB)
        setBox(g.node().getBBox())

        if(draggable)
            g.call(draggable);

    }, [node])
    
    const rect = useD3((g) => {
        g.datum(node)
        
        if(draggable)
            g.call(draggable);

    }, [node])

    return (
        <g
            className='network-cluster-label'>
            <rect
                className='network-cluster-label-rect'
                ref={rect}
                x={node.x}
                y={node.y}
                width={box && box.width + padding*2}
                height={box && box.height + padding*2}
                rx={borderRadius}>
            </rect>
            <text
                className='network-cluster-label-text'
                fontSize={fontSize}
                ref={text}
                x={node.x}
                y={node.y}
                dy={padding}
                dx={padding}>
                {node.name}
            </text>
        </g>
        
    )
}

export default NetworkClusterNodeLabel