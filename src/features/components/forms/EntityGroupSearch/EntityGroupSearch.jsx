import PropTypes from 'prop-types'
import { useState } from "react"
import { createFilterOptions } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import ListItemText from '@mui/material/ListItemText';

import { EntityTypes, EntityColors } from "@core/utils/mapUtils";

import { CircleBullet } from '@components/graphic';

const _ = require("lodash");  

/**
 * A component that provides a search functionality for entities, using Autocomplete.
 * 
 * @memberof Features.Components.Forms
 * @param {Object} props - The props object containing the component's properties.
 * @param {Array} props.values - The list of entities to search from.
 * @param {number} [props.width=400] - The width of the search input.
 * @param {Object} [props.selected] - The currently selected entity.
 * @param {string} [props.label="Hledat entitu..."] - The label text for the search input.
 * @param {function} [props.onChange=(e, item) => {}] - The function to call when the selected entity changes.
 * @returns {JSX.Element} A JSX element that renders the EntityGroupSearch component.
 */
const EntityGroupSearch = ({ values, width, selected, label, onChange }) => {
  const [selectedEntity, setSelectedEntity] = useState(selected)

  const styles = {
    aucomplete: {
      width: width
    }
  }

  const filterOptions = createFilterOptions({
    matchFrom: 'any',
    stringify: (option) => option.name + option.label
  })

   /**
   * The function to call when the selected entity changes.
   * @param {Object} e - The event object.
   * @param {Object} item - The selected item object.
   * @returns {void}
   */
  const onChangeHandler = (e, item) => {
    onChange(e, item)
    setSelectedEntity(item)
  }

  return (
    <Autocomplete
      id="search"
      options={_.sortBy(values, ['type', 'name'])}
      groupBy={(option) => EntityTypes[option.type].toUpperCase()}
      getOptionLabel={(option) => option.name ? option.name : ""}
      filterOptions={filterOptions}
      sx={styles.aucomplete}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      value={selectedEntity}
      onChange={onChangeHandler}
      noOptionsText={"Žádné výsledky"}
      renderOption={(props, option) => (
        <li {...props} key={option.id}>
          <CircleBullet
            size={20}
            color={EntityColors[option.type].default}/>
          <ListItemText
            primary={option.name}
            secondary={option.label}/>
        </li> 
      )}
      renderInput={(params) => (
        <TextField {...params}
          label={label}/>)}
    />
  )
}

EntityGroupSearch.propTypes = {
  width: PropTypes.number,
  label: PropTypes.string,
  onChange: PropTypes.func
}

EntityGroupSearch.defaultProps = {
  width: 400,
  label: "Hledat entitu...",
  onChange: (e, item) => {}
}

export default EntityGroupSearch
