import { useD3 } from '@core/hooks'

import "./CirclePackingLeafSublabel.scss"

/**
 * The Circle packing leaf sublabel component
 * 
 * ### Tags
 * @version 0.0.1
 * @component
 * @memberof Visualisation.CirclePacking
 * @type {React.Component}
 * @param {Pack} node The given pack node 
 * @param {string|number} label The sublabel of the leaf pack
 * @returns {React.ReactSVGElement} Returns the React component
 */
const CirclePackingLeafSublabel = ({ node, label }) => {
    const ref = useD3((g) => {
        g.datum(node)
        g.classed(`group-${"group" in node.data ? node.data.group : "none"}`, true)
        g.classed("leaf", true)
    }, [node])

    return (
        <text
            className='circle-packing-leaf-sublabel'
            ref={ref}
            dy={node.children ? 10 : 0}
            transform={`translate(${node.x}, ${node.y})`}>
            {`${node.children.length} ${label !== undefined ? label : ""}`}
        </text>
    )
}

export default CirclePackingLeafSublabel