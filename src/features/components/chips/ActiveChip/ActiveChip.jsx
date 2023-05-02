import PropTypes from 'prop-types'
import { Chip } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

const styles = {
  chip: {
    width: "120px"
  }
}

/**
 * A component that displays a chip indicating whether something is active or inactive.
 * @memberof Features.Components.Chips
 * @param {Object} props - The props object.
 * @param {boolean} [props.active=true] - Whether the item is active or not.
 * @returns {JSX.Element} - A React component that displays a chip indicating whether something is active or inactive.
 */
const ActiveChip = ({ active }) => {
  return (
    <Chip
      label={active ? "Aktivní" : "Neaktivní"}
      color={active ? "success" : "error"}
      icon={active ? <CheckIcon fontSize='small' /> : <CloseIcon fontSize='small' />}
      sx={styles.chip}>
    </Chip>
  )
}

ActiveChip.propTypes = {
  active: PropTypes.bool
}

ActiveChip.defaultProps = {
  active: true
}

export default ActiveChip
