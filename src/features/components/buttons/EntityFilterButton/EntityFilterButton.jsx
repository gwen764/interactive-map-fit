import PropTypes from 'prop-types'
import { useState } from "react"
import { Button } from "@mui/material";
import Tooltip from '@mui/material/Tooltip';

import { EntityColors, EntityTypes } from "@core/utils/mapUtils";
import { COURSE } from "@core/utils/constants/acredationConstants";

/**
 * @typedef {object} EntityColors
 * @property {string} default - The default color for the entity
 * @property {string} light - A lighter shade of the default color
 * @property {string} dark - A darker shade of the default color
 */

/**
 * A button used to filter entities by type.
 * @memberof Features.Components.Buttons
 * @param {object} props - The component props.
 * @param {string} props.entityType - The type of entity to filter.
 * @param {number} props.count - The number of entities of the specified type.
 * @param {boolean} props.selected - Indicates if the button is selected.
 * @param {function} props.onClick - The function to call when the button is clicked.
 * @returns {JSX.Element} - The JSX element for the button.
 */
const EntityFilterButton = ({ entityType, count, selected, onClick }) => {
    const [isSelected, setIsSelected] = useState(selected);

    const text = EntityTypes[entityType].toUpperCase();
    const colors = EntityColors[entityType];

    const styles = {
        buttonActive: {
            backgroundColor: colors.default,
            '&:hover': {
                backgroundColor: colors.dark
            }
        },
        buttonDeactive: {
            borderColor: colors.default,
            color: colors.default,
            '&:hover': {
                borderColor: colors.default,
                color: colors.default,
                backgroundColor: colors.light
            }
        }
    };

    /**
     * The click event handler for the button.
     * @param {object} e - The click event object.
     * @returns {void}
     */
    const onClickHandler = (e) => {
        if (onClick) {
            onClick(entityType, !isSelected);
        }
        setIsSelected(!isSelected);
    };

    return (
        <Tooltip
            title={`${!isSelected ? "Zobrazit" : "Skrýt"} entity ${text}`}
        >
            <Button
                size="small"
                variant={isSelected ? "contained" : "outlined"}
                onClick={onClickHandler}
                sx={isSelected ? styles.buttonActive : styles.buttonDeactive}
            >
                {`${text} (${count})`}
            </Button>
        </Tooltip>
    );
};

EntityFilterButton.propTypes = {
    entityType: PropTypes.string,
    count: PropTypes.number,
    selected: PropTypes.bool,
    onClick: PropTypes.func
};

EntityFilterButton.defaultProps = {
    entityType: COURSE,
    count: 0,
    selected: true
};

export default EntityFilterButton;