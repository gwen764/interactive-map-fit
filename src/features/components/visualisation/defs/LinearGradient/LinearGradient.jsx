import PropTypes from 'prop-types'

/**
 * Linear Gradient component
 * 
 * ### Tags
 * @version 0.0.1
 * @component
 * @memberof module:Defs
 * @type {React.Component}
 * @param {string} id The id of the gradient element
 * @param {number} x1 Starting X position 
 * @param {number} y1 Starting Y position 
 * @param {number} x2 Ending X position 
 * @param {number} y2 Ending Y position 
 * @param {string} startColor Starting color
 * @param {string} endColor Ending color
 * 
 * @returns {React.ReactSVGElement} Returns the React component
 */
const LinearGradient = ({ id, x1, y1, x2, y2, startColor, endColor }) => {
  return (
    <linearGradient id={id} x1={x1} y1={y1} x2={x2} y2={y2} gradientUnits="userSpaceOnUse">
      <stop offset="0" stopColor={startColor} />
      <stop offset="1" stopColor={endColor} />
    </linearGradient>
  )
}

LinearGradient.propTypes = {
  /** The id of the gradient element */
  id: PropTypes.string,
  /** Starting X position */
  x1: PropTypes.number,
  /** Starting Y position */
  y1: PropTypes.number,
  /** Ending X position */
  x2: PropTypes.number,
  /** Ending Y position  */
  y2: PropTypes.number,
  /** Starting color */
  startColor: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  /** Ending color */
  endColor: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
}

LinearGradient.defaultProps = {
  id: "gradient",
  x1: 0,
  y1: 0,
  x2: 1,
  y2: 1,
  startColor: "#ffffff",
  endColorr: "#000000"
}

export default LinearGradient