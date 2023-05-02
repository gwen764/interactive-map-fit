import PropTypes from 'prop-types'

import "./ArrowMarker.scss"

/**
 * Arrow Marker component to draw arrows on link endings
 * 
 * ### Tags
 * @version 0.0.1
 * @component
 * @memberof module:Defs
 * @type {React.Component}
 * @param {string} id The id of the arrow marker
 * @param {string} offsetX The offset on X line of the link
 * @param {number} width The width of the arrow marker
 * @param {number} height The height of the arrow marker
 * @param {number} arrowWidth The width of the arrow marker
 * @param {number} arrowHeight The height of the arrow marker
 * 
 * @returns {React.ReactSVGElement} Returns the React component
 */

const ArrowMarker = ({ id, offsetX, width, height, arrowWidth, arrowHeight }) => {
  return (
    <marker
      id={id}
      refX={offsetX + arrowWidth}
      refY={arrowHeight / 2}
      markerWidth={width}
      markerHeight={height}
      markerUnits="userSpaceOnUse"
      overflow="visible"
      orient='auto-start-reverse'>
      <path
        className='arrow-marker'
        d={`M0,0 L0,${arrowHeight} L${arrowWidth},${arrowHeight / 2} z`}>
      </path>
    </marker>
  )
}

ArrowMarker.propTypes = {
  /** The id of the arrow marker */
  id: PropTypes.string,
  /** The offset on X line of the link */
  offsetX: PropTypes.number,
  /** The width of the arrow marker */
  width: PropTypes.number,
  /** The height of the arrow marker */
  height: PropTypes.number,
  /** The width of the arrow marker */
  arrowWidth: PropTypes.number,
  /** The height of the arrow marker */
  arrowHeight: PropTypes.number
}

ArrowMarker.defaultProps = {
  id: "arrow",
  offsetX: 5,
  width: 20,
  height: 12,
  arrowWidth: 12,
  arrowHeight: 12
}

export default ArrowMarker