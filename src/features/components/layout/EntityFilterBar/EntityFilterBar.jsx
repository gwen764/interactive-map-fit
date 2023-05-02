import { useState, useEffect } from "react"

import graphUtils from "@core/utils/graphUtils";

import { EntityFilterButton } from "@components/buttons";

const uuid = require('react-uuid')

/**
 * Renders an EntityFilterBar component.
 *
 * @memberof Features.Components.Layouts
 * @param {Object} props - The props object.
 * @param {Array} props.data - The array of data to be filtered.
 * @param {Array} props.types - The array of filter types.
 * @param {Function} props.setTypes - The function to set the filter types.
 * @returns {JSX.Element} - The EntityFilterBar component.
 */
const EntityFilterBar = ({ data, types, setTypes }) => {
    const [filterTypes, setFilterTypes] = useState(types)
    const countTypes = graphUtils.countNodeTypes(data?.nodes, types)

    /**
     * Filters entity types on click
     *
     * @param {string} type - The filter type.
     * @param {boolean} selected - The boolean indicating whether the filter type is selected.
     */
    const filterOnClickHandler = (type, selected) => {
        var filter = [...filterTypes]
        selected ? filter = [...filter, type] : filter.splice(filter.indexOf(type), 1)

        var newFilter = [...new Set(filter)]
        setFilterTypes(newFilter)
    }

    useEffect(() => {
        if (setTypes) {
            setTypes(filterTypes)
        }
    }, [filterTypes])

    return (
        <>
            {types.map((type) =>
                <EntityFilterButton
                    key={uuid()}
                    selected={filterTypes.includes(type)}
                    entityType={type}
                    count={countTypes ? countTypes[type] : 0}
                    onClick={filterOnClickHandler} />)}
        </>
    )
}

export default EntityFilterBar