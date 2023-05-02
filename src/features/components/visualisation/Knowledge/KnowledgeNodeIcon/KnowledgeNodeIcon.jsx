import { useD3 } from '@core/hooks'
import d3Utils from '@core/utils/d3Utils'

import "./KnowledgeNodeIcon.scss"

/**
 * The Knowledge Graph node icon component
 * 
 * ### Tags
 * @version 0.0.1
 * @component
 * @memberof Visualisation.Knowledge
 * @type {React.Component}
 * @param {Node} node Node object
 * @param {string} icon Unicode string defining the icon
 * @param {number} circleRadius Circle radius of the node
 * @param {function} restartDrag Called upon restarting dragging
 * @param {function} stopDrag Called upon stopping dragging
 * @returns {React.ReactSVGElement} Returns the React component
 */
const KnowledgeNodeIcon = ({ node, icon, circleRadius, restartDrag, stopDrag }) => {
  const ref = useD3((text) => {
    text.datum(node)
    text.call(d3Utils.drag(restartDrag, stopDrag));
  }, [node])

  return (
    <text
      className='knowledge-node-icon'
      ref={ref}
      x={node.x}
      y={node.y}
      fontSize={circleRadius * 3 / 4}>
      {icon}
    </text>
  )
}

export default KnowledgeNodeIcon