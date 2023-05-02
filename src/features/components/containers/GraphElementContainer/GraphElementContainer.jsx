import PropTypes from 'prop-types'

/**
 * A container for positioning graph elements with a specified position.
 * 
 * @memberof Features.Components.Containers
 * @param {Object} props - The component's props.
 * @param {Object} props.direction - Direction of the elements
 * @param {Object} props.position - The position object containing top, right, left and bottom values.
 * @param {ReactNode} props.children - The child components to be rendered inside the container.
 * @returns {JSX.Element} - The rendered component.
 */
const GraphElementContainer = ({ position, direction, children }) => {
    const styles = {
        position: 'absolute',
        top: position?.top,
        right: position?.right,
        left: position?.left,
        bottom: position?.bottom,
        padding: '16px',
        display: 'flex',
        gap: '8px',
        flexWrap: 'wrap',
        flexDirection: direction
    }
  return (
    <div className='graph-element-container'
        style={styles}>
        {children}
    </div>
  )
}

GraphElementContainer.propTypes = {
    /**
     * The position object containing top, right, left and bottom values.
     */
    position: PropTypes.shape({
        top: PropTypes.number,
        right: PropTypes.number,
        left: PropTypes.number,
        bottom: PropTypes.number,
    }),
    direrction: PropTypes.oneOf(["row", "column", "row-reverse", "column-reverse"])
}

GraphElementContainer.defaultProps = {
    direction: "row",
    position: { top: 0, right: 0, left: 0, bottom: 0 }
}

export default GraphElementContainer