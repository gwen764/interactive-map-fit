import PropTypes from 'prop-types'
import { useEffect, useState } from "react"
import * as d3 from 'd3'

import graphUtils from '@core/utils/graphUtils'

import { NetworkClusterGraphView } from '@components/visualisation/NetworkCluster'

import "@assets/stylesheets/graph.scss"

const _ = require("lodash")

/**
 * The Network Cluster Graph main component.
 * Network provides the view of clustered nodes. Nodes can be pulled together into a cluster defined by convex hull.
 * Clusters are distinguished by color. The links between nodes define a similarity between nodes and direct connection through defined `values` on the link.
 * Graph uses semantic zoom for node exploration. When zooming the graph the elements don't change their size.
 * 
 * ### Tags
 * @version 0.0.1
 * @component
 * @memberof Visualisation.NetworkCluster
 * @type {React.Component}
 * @param {Object} props Defines the props specified in `propTypes` property of `NetworkClusterGraph` component
 * 
 * @returns {React.ReactElement} Returns the React component
 */
const NetworkClusterGraph = (props) => {
  var { data, ...other } = props

  const [updatedData, setUpdatedData] = useState(null)
  
  /**
   * Initiliazes the input data
   * 
   * @param {Object} data 
   */
  const initData = (data) => {
    var filterEdges = graphUtils.initFilterEdges(data, "name")
    var filterNetwork = graphUtils.initFilterNetwork(filterEdges)
    var result = graphUtils.addDegreeCentrality(filterNetwork)

    setUpdatedData(result)
  }

  useEffect(() => {
    initData(data)
  }, [])

  return (
    <div className='graph'>
      {updatedData && 
        <NetworkClusterGraphView {...{...props,
          data: updatedData}}/>}
    </div>
  )
}

NetworkClusterGraph.propTypes = {
  /** Sets the width of the `<svg>` canvas */
  width: PropTypes.number,
  /** Sets the height of the `<svg>` canvas */
  height: PropTypes.number,
  /** Sets the data Object. Expects a JavaScript Object */
  data: PropTypes.shape({
    nodes: PropTypes.array,
    links: PropTypes.arrayOf(PropTypes.shape({
      source: PropTypes.any.isRequired,
      target: PropTypes.any.isRequired,
      values: PropTypes.array.isRequired
    }))
  }),
  /** Sets the minimal and maximal values for graph zooming. */
  scaleExtent: PropTypes.arrayOf(PropTypes.number),
  /** Sets the padding between nodes */
  circlePadding: PropTypes.number,
  /** Sets the base circle radius of the node */
  baseCircleRadius: PropTypes.number,
  /** Sets the padding in label rectange */
  rectPadding: PropTypes.number,
  /** Sets the border radius of the rectangle label */
  rectRadius: PropTypes.number,
  /** Sets the padding between cluster hulls */
  clusterPadding: PropTypes.number,
  /** Sets the opacity of the cluster hull */
  clusterOpacity: PropTypes.number,
  /** Sets the base font size for the node labels */
  baseFontSize: PropTypes.number,
  /** Sets the cluster font size */
  clusterFontSize: PropTypes.number,
  /** Sets the transition time of the cluster enabling */
  transitionTime: PropTypes.number,
  /** Sets the force strength of the nodes */
  nodeStrength: PropTypes.number,
  /** Sets the minimal link distance between nodes */
  linkDistance: PropTypes.number,
  /** Sets the minimal stroke width of the link */
  minLinkStrokeWidth: PropTypes.number,
  /** Sets the maximal stroke width of the link */
  maxLinkStrokeWidth: PropTypes.number,
  /** Enables or disables the link labels */
  linkLabels: PropTypes.bool,
  /** Enables or disables the clusters visuals */
  clusters: PropTypes.bool,
  /** Enabels or disables the legend */
  legend: PropTypes.bool,
  /** Enabels or draggin the nodes*/
  drag: PropTypes.bool,
  /** Sets the color scheme for the clusters */
  colorScheme: PropTypes.arrayOf(PropTypes.string)
}

NetworkClusterGraph.defaultProps = {
  width: 2200,
  height: 1000,
  data: { nodes: [], links: [] },
  scaleExtent: [1, 10],
  circlePadding: 15,
  baseCircleRadius: 6,
  rectPadding: 8,
  rectRadius: 4,
  clusterPadding: 80,
  clusterOpacity: 0.25,
  transitionTime: 800,
  baseFontSize: 14,
  clusterFontSize: 32,
  nodeStrength: -30,
  linkDistance: 40,
  minLinkStrokeWidth: 0.8,
  maxLinkStrokeWidth: 3,
  drag: true,
  linkLabels: false,
  clusters: false,
  legend: false,
  colorScheme: d3.schemeSet2
}

export default NetworkClusterGraph
