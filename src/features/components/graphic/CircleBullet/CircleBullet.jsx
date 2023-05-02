import PropTypes from 'prop-types'

/**
 * React component for a circular bullet point.
 * 
 * @memberof Features.Components.Graphic
 * @param {Object} props - The props object.
 * @param {string} [props.color="#000000"] - The background color of the circle.
 * @param {number} [props.size=20] - The size of the circle in pixels.
 * @returns {JSX.Element} - A React span element with a circular shape and the specified color and size.
 */
const CircleBullet = ({ color, size }) => {
    const styles = {
        span: {
            backgroundColor: color,
            display: 'inline-block',
            flexGrow: 0,
            flexShrink: 0,
            width: size,
            height: size,
            borderRadius: '50%',
            marginRight: "8px",
            verticalAlign: "middle"
        }
    }
    return (
        <span style={styles.span}/>
    )
}

CircleBullet.propTypes = {
    color: PropTypes.string,
    size: PropTypes.number
}

CircleBullet.defaultProps = {
    color: "#000000",
    size: 20
}

export default CircleBullet