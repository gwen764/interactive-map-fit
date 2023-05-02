import { useD3 } from '@core/hooks'
import d3Utils from '@core/utils/d3Utils'

import "./NetworkClusterLinkLabel.scss"

/**
 * The Network Cluster Link Label component
 * 
 * ### Tags
 * @version 0.0.1
 * @component
 * @memberof Visualisation.NetworkCluster
 * @type {React.Component}
 * @param {Link} link The link object
 * @param {string|number} label The shown label content
 * 
 * @returns {React.ReactSVGElement} Returns the React component
 */
const NetworkClusterLinkLabel = ({ link, label }) => {
    const ref = useD3((g) => {
        g.datum(link)
    }, [link])
    
    return (
        <text
            ref={ref}
            className="network-cluster-link-label"
            x={d3Utils.getMiddle(link.source.x, link.target.x)}
            y={d3Utils.getMiddle(link.source.y, link.target.y)}>
            {label}
        </text>
  )
}

export default NetworkClusterLinkLabel