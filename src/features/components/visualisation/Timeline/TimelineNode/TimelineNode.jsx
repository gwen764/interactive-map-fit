import Tooltip from '@mui/material/Tooltip';

import { useD3 } from '@core/hooks'

import "./TimelineNode.scss"

/**
 * The Timeline Link component
 * 
 * ### Tags
 * @version 0.0.1
 * @component
 * @memberof Visualisation.Timeline
 * @type {React.Component}
 * @param {Node} node The node object
 * @param {xScale} xScale Scale function of X axis
 * @param {yScale} yScale Scale function of Y axis
 * @param {number} strokeWidth Stroke width of the link
 * @param {boolean} selected Whether is selected currently
 * @param {function} onMouseOver Called upon mouse over
 * @param {function} onMouseOut Called upon mouse out
 * @param {function} onSelectNode Called upon node selection
 * 
 * @returns {React.ReactSVGElement} Returns the React component
 */
const TimelineNode = ({ node, r, xScale, yScale, selected, onSelectNode, onMouseOver, onMouseOut }) => {
  const ref = useD3((g) => {
    g.datum(node)
    g.classed("timeline-selected", selected)
  },[node])

  /**
   * Called upon mouse over
   * 
   * @param {React.MouseEvent} e The event 
   */
  const onMouseOverHandler = (e) => {
    if (onMouseOver) {
      onMouseOver(e)
    }
  }
  
  /**
   * Called upon mouse out
   * 
   * @param {React.MouseEvent} e The event 
   */
  const onMouseOutHandler = (e) => {
    if (onMouseOut) {
      onMouseOut(e)
    }
  }
  
  /**
   * Called upon node selection
   * 
   * @param {React.MouseEvent} e The event 
   */
  const onSelectNodeHandler = (e) => {
    if (onSelectNode) {
      onSelectNode(e)
    }
  }

  return (
    <Tooltip
      title={`${node.name}`}>
      <circle
        className='timeline-node'
        id={`timeline-node-${node.id}`}
        ref={ref}
        onClick={onSelectNodeHandler}
        onMouseOver={onMouseOverHandler}
        onMouseOut={onMouseOutHandler}
        r={r}
        cx={xScale(node.semester)}
        cy={yScale(node.label)}
        fill={node.color}>
      </circle>
    </Tooltip>
  )
}

export default TimelineNode