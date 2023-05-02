import PropTypes from 'prop-types'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

/**
 * A basic select component with a label, list of values, and an onChange handler.
 * 
 * @memberof Features.Components.Forms
 * @param {Object} props - The component's props.
 * @param {string} props.label - The label to be displayed above the select component.
 * @param {string} props.width - The width of the select component.
 * @param {string} props.selected - The currently selected value in the select component.
 * @param {Array<string>} props.values - An array of string values to be displayed in the select component.
 * @param {function} props.onChange - The function to be called when the selected value changes.
 * @returns {JSX.Element} - The rendered component.
 */
const BasicSelect = ({ label, width, selected, values, onChange }) => {
    const styles = {
        form: {
          width: width
        }
    }    

    return (
        <FormControl
            sx={styles.form}>
        <InputLabel id="value-label">
            {label}
        </InputLabel>
            <Select
                labelId="value-label"
                value={selected}
                label={label}
                onChange={(e) => onChange(e)}>
                {values?.map((v) => (
                    <MenuItem 
                        key={v}
                        value={v}>
                            {v.toUpperCase()}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}

BasicSelect.propTypes = {
    label: PropTypes.string,
    width: PropTypes.string,
    selected: PropTypes.string,
    values: PropTypes.arrayOf(PropTypes.string),
    onChange: PropTypes.func
}

BasicSelect.defaultProps = {
    label: "Select",
    selected: "",
    values: [],
    onChange: (e) => {}
}

export default BasicSelect