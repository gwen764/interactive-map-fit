import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

const styles = {
    listItem : {
        display: 'block' 
    },
    listItemButton : {
        minHeight: 80,
        justifyContent: 'center',
        px: 2.5,
        padding: 2
    },
    listItemIcon : {
        minWidth: 0,
        justifyContent: 'center',
        display: 'block',
        textAlign: "center",
        color: "#f7fafe"
    }
}

/**
 * A reusable component for a button with an icon and text.
 * 
 * @memberof Features.Components.Buttons
 * @param {Object} props - The component props.
 * @param {string} [props.text="Button"] - The button text.
 * @param {ReactNode} [props.icon=<></>] - The icon element to display in the button.
 * @param {string} [props.link="/"] - The link to redirect to when the button is clicked.
 * 
 * @returns {JSX.Element} - The IconTextButton component.
 */
const IconTextButton = ({ text, icon, link }) => {
    return (
        <ListItem
            key={text}
            disablePadding
            sx={styles.listItem}>
            <ListItemButton
                component={Link}
                to={link}
                sx={styles.listItemButton}>
                <ListItemIcon
                    sx={styles.listItemIcon}>
                    {icon}
                    <ListItemText>
                        {text}
                    </ListItemText>
                </ListItemIcon>
            </ListItemButton>
        </ListItem>
    )
}

IconTextButton.propTypes = {
    text: PropTypes.string,
    icon: PropTypes.node,
    link: PropTypes.string
}

IconTextButton.defaultProps = {
    text: "Button",
    icon: <></>,
    link: "/"
}
export default IconTextButton