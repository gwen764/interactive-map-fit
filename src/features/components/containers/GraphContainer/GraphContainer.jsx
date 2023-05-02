import PropTypes from 'prop-types'
import { CircularProgress } from "@mui/material"

const styles = {
  backgroundColor: "white",
  borderRadius: "15px",
  position: "relative",
  alignItems: "center",
  display: "flex",
  justifyContent: "center",
  height: "85vh",
  writingMode: "horizontal-tb"
}

/**
 * A container for displaying graphs with optional loading indicator.
 * 
 * @memberof Features.Components.Containers
 * @param {Object} props - The component's props.
 * @param {Array|Object} props.data - The data to be displayed in the graph.
 * @param {ReactNode} props.children - The child components to be rendered inside the container.
 * @returns {JSX.Element} - The rendered component.
 */
const GraphContainer = ({ data, children }) => {
  const isLoading = !data || (Array.isArray(data) && !data.length)

  return (
    <div className="graph-container"
      style={styles}>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          {children}
        </>
      )
      }
    </div>
  )
}

GraphContainer.propTypes = {
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  children: PropTypes.node
}

GraphContainer.defaultProps = {
  data: [],
  children: <></>
}

export default GraphContainer;
