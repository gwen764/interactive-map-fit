import PropTypes from 'prop-types'
import { Button } from '@mui/material'

/**
 * A rectangular chip button.
 *
 * @memberof Features.Components.Chips
 * @param {Object} props - The component props.
 * @param {string} [props.text="Chip"] - The text displayed on the button.
 * @param {string} [props.color="#5491f5"] - The background color of the button.
 * @returns {JSX.Element} - The component's markup.
 */
const RectangleChip = ({ text, color }) => {
  const styles = {
    button: {
      '&:disabled': {
        backgroundColor: color,
        boxShadow: "none",
        color: "white"
      }
    }
  }

  return (
    <Button
      disabled
      disableElevation
      variant='contained'
      size="small"
      sx={styles.button}>
      {text}
    </Button>
  )
}

RectangleChip.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string
}

RectangleChip.defaultProps = {
  text: "Chip",
  color: "#5491f5"
}

export default RectangleChip