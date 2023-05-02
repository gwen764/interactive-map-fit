import { useState, useEffect } from "react"
import PropTypes from 'prop-types'
import ToggleButton from '@mui/material/ToggleButton';
import Tooltip from '@mui/material/Tooltip';

/**
 * A component that displays an icon toggle button with a tooltip.
 *
 * @memberof Features.Components.Buttons
 * @param {Object} props - The component props.
 * @param {Node} props.icon - The icon to be displayed in the button.
 * @param {string} props.label - The label text to display in the tooltip.
 * @param {boolean} props.selected - A boolean indicating whether the button is initially selected.
 * @param {Function} props.setSelectedFunc - A callback function to set the selected state of the button.
 * @returns {JSX.Element} - A JSX.Element containing the icon toggle button with a tooltip.
 */
const IconToggleButton = ({ icon, selected, label, setSelectedFunc }) => {
    const [isSelected, setIsSelected] = useState(selected);
    
    useEffect(() => {
        setSelectedFunc(isSelected)
    }, [isSelected])

        return (
            <div 
                className='icon-toggle'>
                <Tooltip
                    title={label}>
                    <ToggleButton
                        color="primary"
                        value="labels"
                        selected={isSelected}
                        onChange={() => setIsSelected(!isSelected)}>
                        {icon}
                    </ToggleButton>
                </Tooltip>
            </div>
        )
}

IconToggleButton.propTypes = {
    icon: PropTypes.node,
    label: PropTypes.string,
    selected: PropTypes.bool,
    setSelectedFunc: PropTypes.func.isRequired
}

IconToggleButton.defaultProps = {
    icon: <></>,
    label: "Toggle",
    selected: true,
    setSelectedFunc: (selected) => {}
}

export default IconToggleButton