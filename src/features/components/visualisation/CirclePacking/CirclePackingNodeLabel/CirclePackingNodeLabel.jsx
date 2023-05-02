import { useD3 } from '@core/hooks'

import "./CirclePackingNodeLabel.scss"

/**
 * The Circle packing node label component
 * 
 * ### Tags
 * @version 0.0.1
 * @component
 * @memberof Visualisation.CirclePacking
 * @type {React.Component}
 * @param {string} id The id of the current svg canvas
 * @param {Pack} node The given pack node 
 * @param {boolean} parentLabel Whether should render the parent label as well
 * 
 * @returns {React.ReactSVGElement} Returns the React component
 */
const CirclePackingNodeLabel = ({ id, node, parentLabel }) => {
    const text = `${node.parent && parentLabel ? node.parent.data.name : ""} ${node.data.name}`.toUpperCase()
    const ref = useD3((g) => {
        g.datum(node)
        g.classed(`group-${node.data.group}`, true)
    }, [node])

    return (
        <text
            ref={ref}
            className='circle-packing-node-label'
            dy={3}>
            <textPath
                xlinkHref={`#circle-packing-node-${node.data.name}-${node.data.label}-${id}`}
                startOffset={"50%"}>
                {text}
            </textPath>
        </text>
    )
}

export default CirclePackingNodeLabel