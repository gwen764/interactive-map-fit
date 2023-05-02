import Tooltip from '@mui/material/Tooltip';
import * as d3 from 'd3'

import { useD3 } from '@core/hooks'
import d3Utils from '@core/utils/d3Utils'

import "./KnowledgeNode.scss"

/**
 * The Knowledge Graph node component
 * 
 * ### Tags
 * @version 0.0.1
 * @component
 * @memberof Visualisation.Knowledge
 * @type {React.Component}
 * @param {Object} props - The component's props.
 * @param {Node} props.node Node object
 * @param {number} props.r Circle radius of the node
 * @param {boolean} props.selected Whether the current node is selected
 * @param {function} props.restartDrag Called upon restarting dragging
 * @param {function} props.stopDrag Called upon stopping dragging
 * @param {function} props.onSelectNode Called upon node click
 * 
 * @returns {React.ReactSVGElement} Returns the React component
 */
const KnowledgeNode = ({ node, r, restartDrag, stopDrag, selected, onSelectNode }) => {
  const ref = useD3((g) => {
    g.datum(node)
    g.call(d3Utils.drag(restartDrag, stopDrag));
    g.classed("knowledge-selected", selected)
    g.classed("expanded", node.expanded)
  }, [node])

  /**
   * Called upon click 
   * 
   * @param {React.MouseEvent} e The event
   */
  const onClickHandler = (e) => {
    if (onSelectNode) {
      onSelectNode(e)
    }
  }

  /**
   * Called upon mouse over 
   * 
   * @param {React.MouseEvent} e The event
   */
  const onMouseOverHandler = (e) => {
    d3.select(ref.current)
      .transition()
      .duration(333)
      .attr("r", r * 1.5)
  }

  /**
   * Called upon mouse out
   * 
   * @param {React.MouseEvent} e The event
   */
  const onMouseOutHandler = (e) => {
    d3.select(ref.current)
      .transition()
      .duration(333)
      .attr("r", r)
  }

  return (
    <Tooltip
      title={node.name}>
      <circle
        className={`knowledge-node`}
        ref={ref}
        onClick={onClickHandler}
        onMouseOver={onMouseOverHandler}
        onMouseOut={onMouseOutHandler}
        id={`knowledge-node-${node.type}`}
        r={r}
        cx={node.x}
        cy={node.y}>
      </circle>
    </Tooltip>
  )
}

export default KnowledgeNode