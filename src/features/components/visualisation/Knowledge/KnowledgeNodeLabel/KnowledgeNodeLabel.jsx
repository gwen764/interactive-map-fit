import { useD3 } from '@core/hooks'
import d3Utils from '@core/utils/d3Utils'

import "./KnowledgeNodeLabel.scss"

/**
 * The Knowledge Graph node label component
 * 
 * ### Tags
 * @version 0.0.1
 * @component
 * @memberof Visualisation.Knowledge
 * @type {React.Component}
 * @param {Node} node Node object
 * @param {number} circleRadius Circle radius of the node
 * @param {function} restartDrag Called upon restarting dragging
 * @param {function} stopDrag Called upon stopping dragging
 * @returns {React.ReactSVGElement} Returns the React component
 */
const KnowledgeNodeLabel = ({ node, circleRadius, restartDrag, stopDrag }) => {
  const label = "label" in node ? node.label : node.name
  const ref = useD3((g) => {
    g.datum(node)
    g.call(d3Utils.drag(restartDrag, stopDrag));
  }, [node])

  return (
    <text
      className='knowledge-node-label'
      ref={ref}
      x={node.x}
      y={node.y}
      dy={`${circleRadius / 10}em`}>
      {label}
    </text>
  )
}

export default KnowledgeNodeLabel