import { useD3 } from '@core/hooks'

import "./CirclePackingLeafLabel.scss"

/**
 * The Circle packing leaf label component
 * 
 * ### Tags
 * @version 0.0.1
 * @component
 * @memberof Visualisation.CirclePacking
 * @type {React.Component}
 * @param {Pack} node The given pack node 
 * @param {string|number} label The label of the leaf pack
 * @returns {React.ReactSVGElement} Returns the React component
 */
const CirclePackingLeafLabel = ({ node, label }) => {
  const ref = useD3((g) => {
    g.datum(node)
    g.classed(`group-${"group" in node.data ? node.data.group : "none"}`, true)
    g.classed("leaf", true)
  }, [node])

  return (
    <text
      className='circle-packing-leaf-label'
      ref={ref}
      dy={node.children ? -10 : 0}
      transform={`translate(${node.x}, ${node.y})`}>
      {label.toUpperCase()}
    </text>
  )
}

export default CirclePackingLeafLabel