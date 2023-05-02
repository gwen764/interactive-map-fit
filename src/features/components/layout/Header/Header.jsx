import PropTypes from 'prop-types'

import { Title } from '@components/layout'

const _ = require("lodash");  

const styles = {
  header: {
    justifyContent: 'space-between',
    height: 'fit-content',
    textAlign: 'right',
    display: 'flex',
    paddingBlock: '16px'
  }
}

/**
 * A header component with a title and optional subtitle.
 * 
 * @memberof Features.Components.Layouts
 * @param {Object} props - The component props.
 * @param {React.ReactNode} [props.children] - Child elements to render within the header.
 * @param {string} [props.title="Title"] - The main title of the header.
 * @param {string} [props.subtitle="Subtitle"] - The optional subtitle of the header.
 * @returns {JSX.Element} - The rendered component.
 */
const Header = ({ children, title, subtitle }) => {
  return (
    <div 
      className='header'
      style={styles.header}>
      <Title 
        title={_.upperFirst(title)}
        subtitle={_.upperFirst(subtitle)}/>
        {children}
    </div>
  )
}

Header.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  subtitle: PropTypes.string
}

Header.defaultProps = {
  children: <></>,
  title: "Title",
  subtitle: "Subtitle"
}

export default Header