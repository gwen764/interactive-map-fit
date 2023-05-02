import { useState } from 'react'
import PropTypes from 'prop-types'

import { CirclePackingGraphView } from "@components/visualisation/CirclePacking"

const _ = require('lodash');

/**
 * @typedef {Object} Level
 * @memberof Visualisation.CirclePacking
 * @property {number|string} name The Level name
 * @property {number|string} short The Level label (short)
 * @property {number|string} group The group the level is part of
 * @property {Array} children The childen of the level
 */

/**
 * The Circle Packing main component.
 * The visualisation defines the hierarchical relationships in the domain.
 * Levels can be specified and color grouped by specific values.
 * Legend provides highlighting the different groups in the current level.
 * 
 * ### Tags
 * @version 0.0.1
 * @component
 * @memberof Visualisation.CirclePacking
 * @type {React.Component}
 * @param {Object} props Defines the props specified in `propTypes` property of `CirclePacking` component
 * 
 * @returns {React.ReactElement} Returns the React component
 */
const CirclePackingGraph = (props) => {
    var { data, groups, ...other } = props

    const [updatedData, setUpdatedData] = useState(data)

    return (
        <CirclePackingGraphView {...{
            ...props,
            data: updatedData
        }} />
    )
}

CirclePackingGraph.propTypes = {
    /** Sets the width of the `<svg>` canvas */
    width: PropTypes.number,
    /** Sets the height of the `<svg>` canvas */
    height: PropTypes.number,
    /** Sets the data Object. Expects a JavaScript Object */
    data: PropTypes.shape({
        children: PropTypes.array
    }),
    /** Object defining levels of the hierarchy */
    levels: PropTypes.object,
    /** Object definng the grorups of the hierarchy levels */
    groups: PropTypes.object,
    /** Circle padding between circles */
    circlePadding: PropTypes.number,
    /** Minimal radius of the circle */
    minRadius: PropTypes.number,
    /** Maximal radius of the circle */
    maxRadius: PropTypes.number,
    /** Initial zoom extent */
    zoomExtent: PropTypes.number,
    /** Zoom speed of the animation when zooming on circle */
    zoomSpeed: PropTypes.number,
    /** Enables or disables the last level mode */
    lastLevel: PropTypes.bool,
    /** Enables of disables to see the parent label in the child node label */
    parentLabel: PropTypes.bool,
    /** Default color of the circles */
    defaultColor: PropTypes.string,
    /** Array of color schemes to be applies to the levels */
    colorSchemes: PropTypes.arrayOf(PropTypes.array),
    /** Fires given event on node selection */
    onSelectNode: PropTypes.func,
}

CirclePackingGraph.defaultProps = {
    width: 1500,
    height: 1000,
    levels: {},
    groups: undefined,
    data: { children: [] },
    circlePadding: 4,
    minRadius: 5,
    maxRadius: 10,
    zoomExtent: 4,
    zoomSpeed: 800,
    lastLevel: false,
    parentLabel: false,
    defaultColor: "#bebada",
    colorSchemes: [
        ["#8dd3c7",
            "#ffffb3",
            "#bebada",
            "#fb8072",
            "#80b1d3",
            "#fdb462",
            "#b3de69",
            "#fccde5",
            "#d9d9d9",
            "#bc80bd",
            "#ccebc5",
            "#ffed6f"]
    ]
}

export default CirclePackingGraph
