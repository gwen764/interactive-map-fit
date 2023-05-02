import { useState } from 'react'

import { useD3 } from '@core/hooks'
import d3Utils from '@core/utils/d3Utils'

import "./KnowledgeLink.scss"

/**
 * The Knowledge Graph link component 
 * 
 * ### Tags
 * @version 0.0.1
 * @component
 * @memberof Visualisation.Knowledge
 * @type {React.Component}
 * @param {Link} link Link object
 * @param {string} id The id of the current svg canvas
 * @param {boolean} selected Whether is a link of selected node
 * @param {boolean} labels Whether labels are enabled
 * @param {boolean} oriented Whether should be oriented
 * @param {boolean} arrow Whether should have arrow
 * @param {boolean} edge The edge type to be used
 * @returns {React.ReactSVGElement} Returns the React component
 */
const KnowledgeLink = ({ link, id, selected, oriented, labels, arrow, edge }) => {
  const [isHovering, setIsHovering] = useState(labels || selected)

  const d = (edge === "arc") ? d3Utils.linkArc(link) : d3Utils.linkLine(link)

  // Determine the markers on both side depending on the options
  const markerStart = oriented && (arrow || ("oriented" in link))
  const markerEnd = oriented && arrow

  const ref = useD3((g) => {
    g.datum(link)
    g.classed("knowledge-link-selected", selected)
  }, [link])


  /**
   * 
   * On mouse over
   * @param {React.MouseEvent} e The event
   */
  const onMouseOverHandler = (e) => {
    if(!(labels || selected))
      setIsHovering(true)
  }

  /**
   * 
   * On mouse out
   * @param {React.MouseEvent} e 
   */
  const onMouseOutHandler = (e) => {
    if(!(labels || selected))
      setIsHovering(false)
  }

  return (
    <path
      className="knowledge-link"
      ref={ref}
      d={d}
      id={isHovering ? `knowledge-link-${link.source.id}-${link.target.id}-${id}` : null}
      markerStart={markerStart ? "url(#arrowStart)" : null}
      markerEnd={markerEnd ? "url(#arrowEnd)" : null}
      onMouseOver={onMouseOverHandler}
      onMouseOut={onMouseOutHandler}>
    </path>
  )
}

export default KnowledgeLink