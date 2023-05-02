import * as d3 from 'd3'
import { useEffect } from 'react'

import { useD3 } from '@core/hooks'

import "./NetworkClusterHull.scss"

/**
 * The Network Cluster Hull component
 * 
 * ### Tags
 * @version 0.0.1
 * @component
 * @memberof Visualisation.NetworkCluster
 * @type {React.Component}
 * @param {Array} points The array of points from which is the hull constructed
 * @param {number} opacity Opacity of the hull
 * @param {number} transitionTime Transition time of the hull animation
 * @param {Object} cluster Cluster object with nodes
 * @param {string} color Color of the cluster
 * @param {boolean} visible Whtether is the hull visible
 * 
 * @returns {React.ReactSVGElement} Returns the React component
 */
const NetworkClusterHull = ({ points, opacity, transitionTime, cluster, color, visible }) => {
    const line = d3.line().curve(d3.curveBasisClosed)

    const ref = useD3((g) => {
        g.datum(cluster)
    }, [cluster])

    useEffect(() => {
        d3.select(ref.current)
            .transition()
            .duration(transitionTime)
            .attr('opacity', visible ? opacity : 0)
    }, [visible])
    
    return (
        <path
            className='network-cluster-hull'
            ref={ref}
            d={line(d3.polygonHull(points))}
            fill={color}>
        </path>
    )
}

export default NetworkClusterHull