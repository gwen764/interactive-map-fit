import PropTypes from 'prop-types'
import { Avatar, Link } from '@mui/material'

const _ = require("lodash");

const styles = {
  avatarTextButton: {
    textAlign: 'center',
    minWidth: '70px',
    alignSelf: 'center',
    rowGap: '4px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  text: {
    fontSize: 'smaller'
  }
}

/**
 * A component that renders an avatar and text as a button with an optional link
 * @memberof Features.Components.Buttons
 * @param {Object} props - The component props
 * @param {string} [props.link="/"] - The link URL to open when the button is clicked
 * @param {string} [props.text="Label"] - The text to display next to the avatar
 * @returns {JSX.Element} - The JSX element that represents the component
 */
const AvatarTextButton = ({ link, text }) => {
  return (
    <div
      className='avatar-text-button'
      style={styles.avatarTextButton}>
      <Link
        target="_blank"
        underline="none"
        rel="noopener"
        href={link}>
        <Avatar
          size='medium'>
          {_.head(text)?.toUpperCase()}
        </Avatar>
      </Link>
      <div
        style={styles.text}>
        {text}
      </div>
    </div>
  )
}

AvatarTextButton.defaultProps = {
  link: "/",
  text: "Label"
}

AvatarTextButton.propTypes = {
  link: PropTypes.string,
  text: PropTypes.string
}

export default AvatarTextButton