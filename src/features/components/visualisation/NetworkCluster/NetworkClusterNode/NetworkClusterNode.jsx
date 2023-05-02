import { useD3 } from '@core/hooks';
import d3Utils from '@core/utils/d3Utils';

import "./NetworkClusterNode.scss"

/**
 * The Network Cluster Node component
 * 
 * ### Tags
 * @version 0.0.1
 * @component
 * @memberof Visualisation.NetworkCluster
 * @type {React.Component}
 * @param {Node} node The node object
 * @param {number} radius The radius of the node
 * @param {number} color The color of the node
 * @param {function} restartDrag Called upon restarting dragging
 * @param {function} stopDrag Called upon stopping dragging
 * @param {function} onMouseOver Called upon mouse over
 * @param {function} onMouseOut Called upon mouse out
 * @param {function} onClick Called upon click
 * 
 * @returns {React.ReactSVGElement} Returns the React component
 */
const NetworkClusterNode = ({ node, radius, color, drag, onMouseOver, onMouseOut, onClick }) => {
  const draggable = drag()

  const ref = useD3((g) => {
    g.datum(node)
    
    if(draggable)
      g.call(draggable);

  }, [node])

  /**
   * Called upon mouse over
   * 
   * @param {React.MouseEvent} e The event 
   */
  const onMouseOverHandler = (e) => {
    if(onMouseOver) onMouseOver(e)
  }

  /**
   * Called upon mouse out
   * 
   * @param {React.MouseEvent} e The event 
   */
  const onMouseOutHandler = (e) => {
    if(onMouseOut) onMouseOut(e)
  }

  /**
   * Called upon mouse click
   * 
   * @param {React.MouseEvent} e The event 
   */
  const onClickHandler = (e) => {
    if(onClick) onClick(e)
  }

  return (
    <circle
      className='network-cluster-node'
      id={`network-cluster-node-${node.name}`}
      ref={ref}
      r={radius}
      cx={node.x}
      cy={node.y}
      fill={color}
      onClick={onClickHandler}
      onMouseOver={onMouseOverHandler}
      onMouseOut={onMouseOutHandler}>
    </circle>
  )
}

export default NetworkClusterNode