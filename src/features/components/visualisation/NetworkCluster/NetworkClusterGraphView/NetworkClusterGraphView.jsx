import { useRef, useEffect } from 'react'
import * as d3 from 'd3'

import d3Utils from '@core/utils/d3Utils'
import { useIsVisible } from "@core/hooks";

import { Legend } from '@components/visualisation/Legend';
import {
  NetworkClusterNode,
  NetworkClusterLink,
  NetworkClusterHull,
  NetworkClusterNodeLabel,
  NetworkClusterTitle,
  NetworkClusterLinkLabel
} from '@components/visualisation/NetworkCluster'

const uuid = require('react-uuid')
const _ = require('lodash')

/**
 * @typedef {Object} Node
 * @memberof Visualisation.NetworkCluster
 * @property {number|string} id The identification of the node
 * @property {number|string} name The full name of the node
 * @property {number|string} cluster The cluster the node is located in
 */

/**
 * @typedef {Object} Link
 * @memberof Visualisation.NetworkCluster
 * @property {number|string} source The `id` of the source node
 * @property {number|string} target The `id` of the target node
 * @property {Array} values The values of the link
 */

/**
 * The Network Cluster Graph View component renders the `<svg>` of the visualisation 
 * 
 * ### Tags
 * @version 0.0.1
 * @component
 * @memberof module:NetworkCluster
 * @type {React.Component}
 * @param {number} width Sets the width of the `<svg>` canvas
 * @param {number} height Sets the height of the `<svg>` canvas
 * @param {Object} data Sets the data Object. Expects a JavaScript Object
 * @param {number} circlePadding Sets the padding between nodes
 * @param {number} baseCircleRadius Sets the base circle radius of the node
 * @param {number} rectRadius Sets the border radius of the rectangle label
 * @param {number} rectPadding Sets the padding in label rectange
 * @param {number} clusterPadding Sets the padding between cluster hulls
 * @param {number} clusterOpacity Sets the opacity of the cluster hull
 * @param {number} baseFontSize Sets the base font size for the node labels
 * @param {number} clusterFontSize Sets the cluster font size
 * @param {number} transitionTime Sets the transition time of the cluster enabling
 * @param {number} nodeStrength Sets the force strength of the nodes
 * @param {number} linkDistance Sets the minimal link distance between nodes
 * @param {number} minLinkStrokeWidth Sets the minimal stroke width of the link
 * @param {number} maxLinkStrokeWidth Sets the maximal stroke width of the link
 * @param {boolean} linkLabels Enables or disables the link labels
 * @param {boolean} cluster Enables or disables the clusters visuals
 * @param {boolean} legend Enabels or disables the legend
 * @param {boolean} drag Enabels or disables the drag function of nodes
 * @param {Array} scaleExtent Sets the minimal and maximal values for graph zooming.
 * @param {Array} colorScheme Sets the color scheme for the clusters
 * 
 * @returns {React.ReactSVGElement} Returns the React component
 */
const NetworkClusterGraphView = ({
  width,
  height,
  data,
  scaleExtent,
  circlePadding,
  baseCircleRadius,
  rectRadius,
  rectPadding,
  clusterPadding,
  clusterOpacity,
  baseFontSize,
  transitionTime,
  clusterFontSize,
  nodeStrength,
  linkDistance,
  colorScheme,
  legend,
  drag,
  minLinkStrokeWidth,
  maxLinkStrokeWidth,
  linkLabels,
  clusters }) => {

  // Initialize the force simulation
  var simulation = undefined;

  var indexLinks = {};
  var clusterInfluences = {};

  // The <svg> element reference
  const svg = useRef(null)
  // Checks the visibility of element
  const isVisible = useIsVisible(svg)

  const extent = [[0, 0], [width, height]]
  const degrees = [...new Set(data.nodes.map(node => node.degreeCentrality))]
  const clusterSet = [...new Set(data.nodes.map(node => node.cluster))]

  // Construct the convex hull path
  const hullPath = d3.line().curve(d3.curveBasisClosed)

  // Color scale by clusters 
  const colorScale = d3.scaleOrdinal(colorScheme).domain(clusterSet)

  // Stroke scale by number of values
  const minValues = _.minBy(data.links, d => d.values.length).values.length
  const maxValues = _.maxBy(data.links, d => d.values.length).values.length
  const strokeScale = d3.scaleLinear()
    .domain([minValues, maxValues])
    .range([minLinkStrokeWidth, maxLinkStrokeWidth])

  // Cluster data preparation
  const clusterNodes = clusterSet.map((c) => ({ cluster: c, nodes: data.nodes.filter(d => d.cluster === c) }))
  const clusterGroups = _.groupBy(data.nodes, (d) => d.cluster)

  const influences = Object.keys(clusterGroups).reduce((filtered, group) => {
    var max = _.maxBy(clusterGroups[group], (d) => d.degreeCentrality)
    filtered[group] = max.name

    return filtered
  }, {})

  /**
   * Updates the data
   */
  const updateData = () => {
    data.links.forEach((link) => {
      indexLinks[`${link.source.index},${link.target.index}`] = 1;
    });

    data.nodes.forEach((node) => {
      if (!clusterInfluences[node.cluster] || (node.degreeCentrality > clusterInfluences[node.cluster].degreeCentrality)) {
        clusterInfluences[node.cluster] = node;
      }
    });
  }

  updateData()

  /**
   * Computes the node radius
   * 
   * @param {Node} node 
   * @returns new node radius
   */
  const nodeRadius = (node) => {
    return baseCircleRadius + node.degreeCentrality
  }

  /**
   * Checks the node connection
   * 
   * @param {Node} a 
   * @param {Node} b 
   * @returns true if nodes are connected with index
   */
  const isConnected = (a, b) => {
    return indexLinks[`${a.index},${b.index}`] || indexLinks[`${b.index},${a.index}`] || a.index === b.index;
  }

  /**
   * Checks if the node is in the cluster of the other
   * 
   * @param {Node} a 
   * @param {Node} b 
   * @returns true if nodes are in same cluster
   */
  const isInHull = (a, b) => {
    return a.cluster === b.cluster
  }

  /**
   * Restars the simulation drag
   */
  const restartDrag = () => {
    if (simulation) simulation.alphaTarget(0.3).restart()
  }

  /**
   * Stops the simulation drag
   */
  const stopDrag = () => {
    if (simulation) simulation.alphaTarget(0)
  }

  /**
   * Node is draggable 
   */
  const draggable = () => {
    return drag ? d3Utils.drag(restartDrag, stopDrag) : null
  }

  /**
   * Selects the graph elements
   * 
   * @returns selection of graph elements
   */
  const selectElements = () => {
    const node = d3.select(svg.current).selectAll(".network-cluster-node")
    const link = d3.select(svg.current).selectAll(".network-cluster-link")
    const hull = d3.select(svg.current).selectAll(".network-cluster-hull")
    const text = d3.select(svg.current).selectAll(".network-cluster-label-text")
    const rect = d3.select(svg.current).selectAll(".network-cluster-label-rect")
    const title = d3.select(svg.current).selectAll(".network-cluster-title")
    const values = d3.select(svg.current).selectAll(".network-cluster-link-label")

    return { node, link, hull, text, rect, title, values }
  }

  /**
   * Resets all connections
   */
  const resetConnections = () => {
    const s = selectElements()

    s.node.style("opacity", 1)
    s.link.style("opacity", 1)
    s.text.style("opacity", 0)
    s.rect.style("opacity", 0)
    s.values.style("opacity", 0)
    s.hull.style("opacity", clusters ? clusterOpacity : 0)
    s.title.style("opacity", clusters ? 1 : 0)
  }

  /**
   * Shows all connections of the given node `d`
   * 
   * @param {Node} d 
   * @param {number} opacity Opacity applied to hidden elements
   */
  const showConnections = (d, opacity) => {
    const s = selectElements()

    s.node.style("opacity", n => isConnected(d, n) ? 1 : opacity)
    s.link.style("opacity", n => n.source === d || n.target === d ? 1 : opacity)
    s.hull.style("opacity", n => isInHull(d, n) ? (clusters ? clusterOpacity : 0) : (clusters ? opacity : 0))
    s.text.style("opacity", n => isConnected(d, n) ? 1 : 0)
    s.rect.style("opacity", n => isConnected(d, n) ? 1 : 0)
    s.title.style("opacity", n => isInHull(d, n) ? 1 : 0)
  }

  /**
   * Shows the edge with source and target of the given link `d`
   * 
   * @param {Link} d 
   * @param {number} opacity Opacity applied to hidden elements
   */
  const showEdge = (d, opacity) => {
    const s = selectElements()

    s.node.style("opacity", n => n === d.source || n === d.target ? 1 : opacity)
    s.rect.style("opacity", n => n === d.source || n === d.target ? 1 : 0)
    s.text.style("opacity", n => n === d.source || n === d.target ? 1 : 0)
    s.link.style("opacity", n => n.source === d.source && n.target === d.target ? 1 : opacity)
    s.values.style("opacity", n => n.source === d.source && n.target === d.target ? 1 : 0)
    s.title.style("opacity", n => (isInHull(d.source, n) || isInHull(d.target, n)) ? 1 : 0)
    s.hull.style("opacity", n => (isInHull(d.source, n) || isInHull(d.target, n)) ? (clusters ? clusterOpacity : 0) : (clusters ? opacity : 0))
  }

  /**
   * Shows the given hull element and nodes in it
   * 
   * @param {number|string} d Cluster
   * @param {number} opacity Opacity applied to hidden elements
   */
  const showHull = (d, opacity) => {
    const s = selectElements()

    s.node.style("opacity", n => n.cluster === d ? 1 : opacity)
    s.hull.style("opacity", n => n.cluster === d ? (clusters ? clusterOpacity : 0) : (clusters ? opacity : 0))
    s.title.style("opacity", n => n.cluster === d ? 1 : opacity)
    s.link.style("opacity", opacity)
  }

  /**
   * Computes the cluster collission
   * Source: https://bl.ocks.org/mbostock/7882658
   * 
   * @param {number} alpha The extent of collision, 0 - 1
   * @returns 
   */
  const collide = (alpha) => {
    const quadtree = d3.quadtree()
      .x((d) => d.x)
      .y((d) => d.y)
      .extent(extent)
      .addAll(data.nodes)

    return (d) => {
      let r = nodeRadius(d) + (_.max(degrees)) * 8 + Math.max(circlePadding, clusterPadding),
        nx1 = d.x - r,
        nx2 = d.x + r,
        ny1 = d.y - r,
        ny2 = d.y + r;
      quadtree.visit((quad, x1, y1, x2, y2) => {
        let data = quad.data;
        if (data && data !== d) {
          let x = d.x - data.x,
            y = d.y - data.y,
            l = Math.sqrt(x * x + y * y),
            r = nodeRadius(d) + nodeRadius(data) + (d.cluster == data.cluster ? circlePadding : clusterPadding);
          if (l < r) {
            l = (l - r) / l * alpha;
            d.x -= x *= l;
            d.y -= y *= l;
            data.x += x;
            data.y += y;
          }
        }
        return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
      });
    }
  }

  /**
   * Changes the force layout of nodes for enabled clusters 
   * Source:  https://bl.ocks.org/mbostock/7881887
   * 
   * @param {number} alpha The extent of the collision, 0 - 1
   * @returns 
   */
  const cluster = (alpha) => {
    return (d) => {
      const cluster = clusterInfluences[d.cluster];
      if (cluster === d || d.cluster == 0) return;
      let x = d.x - cluster.x,
        y = d.y - cluster.y,
        l = Math.sqrt(x * x + y * y),
        r = nodeRadius(d) + nodeRadius(cluster) + 3;
      if (l != r) {
        l = (l - r) / l * alpha;
        d.x -= x *= l;
        d.y -= y *= l;
        cluster.x += x;
        cluster.y += y;
      }
    }
  }

  /**
   * Computes the hull points from given nodes
   * 
   * @param {Node[]} nodes 
   * @returns 
   */
  const hullPoints = (nodes) => {
    let pointArr = [];

    nodes?.forEach(d => {
      const pad = nodeRadius(d) + circlePadding;
      pointArr = pointArr.concat([
        [d.x - pad, d.y - pad],
        [d.x - pad, d.y + pad],
        [d.x + pad, d.y - pad],
        [d.x + pad, d.y + pad]
      ]);
    });
    return pointArr;
  }

  /**
   * Adds zoom to the <svg> element
   */
  const addZoom = () => {
    d3.select(svg.current).call(zoomer)
  }

  /**
   * Applies semantic zoom on elements based on the `transform.k`
   * 
   * @param {Array} props.transform 
   */
  const semanticZoom = ({ transform }) => {
    const s = selectElements()

    // Semantic zoom requires changing the actual element attributes based on `transform.k`
    s.node
      .attr("transform", transform)
      .attr("r", d => nodeRadius(d) / transform.k)
      .style("stroke-width", 2 / transform.k)

    s.link
      .attr("transform", transform)
      .style("stroke-width", d => strokeScale(d.values.length) / transform.k)

    s.hull
      .attr("transform", transform)

    s.text
      .attr("transform", transform)
      .attr("dy", rectPadding / transform.k)
      .attr("dx", rectPadding / transform.k)
      .style("font-size", d => (baseFontSize + nodeRadius(d)) / transform.k)

    s.rect
      .attr("transform", transform)
      .attr("width", d => (d.bbox.width + rectPadding * 2) / transform.k)
      .attr("height", d => (d.bbox.height + rectPadding * 2) / transform.k)
      .attr("rx", rectRadius / transform.k)

    s.title
      .attr("transform", transform)
      .style("font-size", clusterFontSize / transform.k)

    s.values
      .attr("transform", transform)
      .style("font-size", clusterFontSize / 2 / transform.k)
      .style("stroke-width", 3 / transform.k)
  }

  // Zoom object
  const zoomer = d3.zoom()
    .scaleExtent(scaleExtent)
    .on("zoom", semanticZoom)

  /**
   * Simulate positions of the force graph elements.
   * Called upon update 
   */
  const simulatePositions = () => {
    const tick = () => {
      const s = selectElements()

      s.node
        .attr("cx", d => d.x = Math.max(nodeRadius(d), Math.min(width - nodeRadius(d), d.x)))
        .attr("cy", d => d.y = Math.max(nodeRadius(d), Math.min(height - nodeRadius(d), d.y)))

      s.link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y)

      s.hull
        .attr("d", d => hullPath(d3.polygonHull(hullPoints(d.nodes))))

      s.text
        .attr("x", d => d.x)
        .attr("y", d => d.y)

      s.rect
        .attr("x", d => d.x)
        .attr("y", d => d.y)

      s.title
        .attr("x", d => d.x)
        .attr("y", d => d.y)

      s.values
        .attr("x", d => d3Utils.getMiddle(d.source.x, d.target.x))
        .attr("y", d => d3Utils.getMiddle(d.source.y, d.target.y))

      if (clusters) {
        s.node
          .each(cluster(0.2))
          .each(collide(0.1))
      }
    }

    // The force layout for the network

    const forceNode = d3
      .forceManyBody()
      .strength(nodeStrength)

    const forceLink = d3
      .forceLink(data.links)
      .id(d => d.name)
      .distance(linkDistance)

    const forceCenter = d3
      .forceCenter()
      .x(width / 2)
      .y(height / 2)

    const forceCollide = d3
      .forceCollide(d => nodeRadius(d) + circlePadding)
      .radius(circlePadding)

    simulation = d3.forceSimulation(data.nodes)
      .force("link", forceLink)
      .force("charge", forceNode)
      .force("center", forceCenter)
      .force('collide', forceCollide)
      .on('tick', tick)
      .restart()
  }

  /**
   * Called upon mouse over link
   * 
   * @param {React.MouseEvent} e The event
   */
  const onLinkOverHandler = (e) => {
    var d = e.target.__data__
    showEdge(d, 0.1)
  }

  /**
   * Called upon mouse out link
   * 
   * @param {React.MouseEvent} e The event
   */
  const onLinkOutHandler = (e) => {
    resetConnections()
  }

  /**
   * Called upon mouse over node
   * 
   * @param {React.MouseEvent} e The event
   */
  const onNodeOverHandler = (e) => {
    var d = e.target.__data__
    showConnections(d, 0.1)
  }

  /**
   * Called upon mouse out node
   * 
   * @param {React.MouseEvent} e The event
   */
  const onNodeOutHandler = (e) => {
    resetConnections()
  }

  /**
   * Called upon mouse over legend item
   * 
   * @param {React.MouseEvent} e The event
   */
  const onLegendMouseOverHandler = (e) => {
    var d = e.target.__data__
    showHull(d.item, 0.05)
  }

  /**
   * Called upon mouse out legend item
   * 
   * @param {React.MouseEvent} e The event
   */
  const onLegendMouseOutHandler = (e) => {
    resetConnections()
  }

  useEffect(() => {
    updateData()
    addZoom()
    simulatePositions()
    return () => simulation.stop()
  }, [isVisible, data, clusters, linkLabels, circlePadding,
      baseCircleRadius, rectRadius, rectPadding, clusterPadding, 
      clusterOpacity, baseFontSize, transitionTime, clusterFontSize,
      nodeStrength, linkDistance, colorScheme, minLinkStrokeWidth, maxLinkStrokeWidth, drag ])

  return (
    <svg
      ref={svg}
      viewBox={[0, 0, width, height]}>
      {isVisible &&
        <g className='vis'>
          <g className='network-cluster-links'>
            {data.links.map((link) =>
              <NetworkClusterLink
                key={uuid()}
                link={link}
                strokeWidth={strokeScale(link.values.length)}
                onMouseOver={onLinkOverHandler}
                onMouseOut={onLinkOutHandler} />)}
          </g>
          <g className='network-cluster-nodes'>
            {data.nodes.map((node) =>
              <NetworkClusterNode
                key={uuid()}
                node={node}
                radius={nodeRadius(node)}
                color={colorScale(node.cluster)}
                drag={draggable}
                onMouseOver={onNodeOverHandler}
                onMouseOut={onNodeOutHandler} />)}
          </g>
          <g className='network-cluster-hulls'>
            {clusterNodes.map((c) =>
              <NetworkClusterHull
                key={uuid()}
                opacity={clusterOpacity}
                cluster={c}
                points={hullPoints(c?.nodes)}
                transitionTime={transitionTime}
                color={colorScale(c.cluster)}
                visible={clusters} />)}
          </g>
          <g className='network-cluster-labels'>
            {data.nodes.map((node) =>
              <NetworkClusterNodeLabel
                key={uuid()}
                node={node}
                fontSize={baseFontSize + nodeRadius(node)}
                borderRadius={rectRadius}
                padding={rectPadding}
                drag={draggable} />)}
          </g>
          {linkLabels &&
            <g className='network-cluster-link-labels'>
              {data.links.map((link) =>
                <NetworkClusterLinkLabel
                  key={uuid()}
                  link={link}
                  label={`${link.values.length} hodnoty`} />)}
            </g>}
          <g className='network-cluster-titles'>
            {clusterSet.map((c) =>
              <NetworkClusterTitle
                key={uuid()}
                fontSize={clusterFontSize}
                color={colorScale(clusterInfluences[c].cluster)}
                node={clusterInfluences[c]}
                visible={clusters}
                transitionTime={transitionTime}
                drag={draggable} />)}
          </g>
          {legend &&
            <Legend
              scale={colorScale}
              variant='vertical'
              anchor='start'
              x={50}
              y={50}
              data={influences}
              count
              size={13}
              title={"Tématické shluky"}
              onMouseOver={onLegendMouseOverHandler}
              onMouseOut={onLegendMouseOutHandler} />}
        </g>
      }
    </svg>
  )
}

export default NetworkClusterGraphView