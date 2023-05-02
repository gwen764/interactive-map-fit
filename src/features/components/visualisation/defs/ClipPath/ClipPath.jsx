import PropTypes from 'prop-types'

/**
 * Clip Path component for clipping the `<svg>` elements with a rectangle
 * 
 * ### Tags
 * @version 0.0.1
 * @component
 * @memberof module:Defs
 * @type {React.Component}
 * @param {string} id The id of the clip path
 * @param {number} x Starting X position 
 * @param {number} y Starting Y position 
 * @param {number} width The width of the clipped area
 * @param {number} height The height of the clipped area
 * 
 * @returns {React.ReactSVGElement} Returns the React component
 */

const ClipPath = ({ id, x, y, width, height }) => {
  return (
    <clipPath
      className="clip-path"
      id={id}>
      <rect
        x={x}
        y={y}
        width={width - x}
        height={height - y} />
    </clipPath>
  )
}

ClipPath.propTypes = {
  id: PropTypes.string,
  x: PropTypes.number,
  y: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number
}

ClipPath.defaultProps = {
  id: "clip",
  x: 0,
  y: 0,
  width: 200,
  height: 200
}

export default ClipPath