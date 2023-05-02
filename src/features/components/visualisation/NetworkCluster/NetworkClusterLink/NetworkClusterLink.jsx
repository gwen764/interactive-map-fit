import * as d3 from "d3"

import { useD3 } from '@core/hooks'

import "./NetworkClusterLink.scss"

/**
 * The Network Cluster Link component
 * 
 * ### Tags
 * @version 0.0.1
 * @component
 * @memberof Visualisation.NetworkCluster
 * @type {React.Component}
 * @param {Link} link The link object
 * @param {number} strokeWidth Stroke width of the link
 * @param {function} onMouseOver Called upon mouse over
 * @param {function} onMouseOut Called upon mouse out
 * 
 * @returns {React.ReactSVGElement} Returns the React component
 */
const NetworkClusterLink = ({ link, strokeWidth, onMouseOver, onMouseOut }) => {
  const ref = useD3((g) => {
    g.datum(link)
  }, [link])

  /**
   * Called upon mouse over
   * 
   * @param {React.MouseEvent} e The event
   */
  const onMouseOverHandler = (e) => {
    d3.select(ref.current).style("stroke-width", strokeWidth * 2)

    if(onMouseOver) onMouseOver(e)
  }

  /**
   * Called upon mouse out
   * 
   * @param {React.MouseEvent} e The event
   */
  const onMouseOutHandler = (e) => {
    d3.select(ref.current).style("stroke-width", strokeWidth)

    if(onMouseOut) onMouseOut(e)
  }

  return (
    <line
      className="network-cluster-link"
      id={`network-cluster-link-${link.source.name}-${link.target.name}`}
      ref={ref}
      onMouseOver={onMouseOverHandler}
      onMouseOut={onMouseOutHandler}
      x1={link.source.x}
      x2={link.target.x}
      y1={link.source.y}
      y2={link.target.y}
      strokeWidth={strokeWidth}>
    </line>
  )
}

export default NetworkClusterLink