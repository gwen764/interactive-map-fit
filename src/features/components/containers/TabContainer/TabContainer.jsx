import PropTypes from 'prop-types'

/**
 * A container for displaying tab panels.
 * 
 * @memberof Features.Components.Containers
 * @param {Object} props - The component's props.
 * @param {ReactNode} props.children - The child components to be rendered inside the container.
 * @param {number} props.value - The index of the currently selected tab.
 * @param {number} props.index - The index of the current tab panel.
 * @param {string} props.height - The maximum height of the tab panel container.
 * @returns {JSX.Element} - The rendered component.
 */
const TabContainer = ({ children, value, index, height, ...other }) => {
  const styles = {
    maxHeight: height,
    overflow: "auto",
  }

  return (
    <div
      role="tabpanel"
      className="tab-panel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      style={styles}
      {...other}>
      {children}
    </div>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node,
  value: PropTypes.number,
  index: PropTypes.number
}

TabContainer.defaultProps = {
  childrern: <></>,
  value: 0,
  index: 0,
}

export default TabContainer
