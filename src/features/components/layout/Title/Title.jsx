import PropTypes from 'prop-types'

const styles = {
  title: {
    textAlign: 'left'
  }
}

/**
 * A component that displays a title and subtitle.
 * 
 * @memberof Features.Components.Layouts
 * @param {Object} props - The component props.
 * @param {string} [props.title="Title"] - The main title to display.
 * @param {string} [props.subtitle="Subtitle"] - The subtitle to display.
 * 
 * @returns {JSX.Element} A `div` element containing the title and subtitle.
 */
const Title = ({ title, subtitle }) => {
  return (
    <div
      className='title'
      style={styles.title}>
        <h1>{title}</h1>
        <h3>{subtitle}</h3>
    </div>
  )
}

Title.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string
}

Title.defaultProps = {
  title: "Title",
  subtitle: "Subtitle"
}

export default Title