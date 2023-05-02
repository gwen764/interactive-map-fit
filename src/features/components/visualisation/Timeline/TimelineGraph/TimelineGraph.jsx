import PropTypes from 'prop-types'
import { useState } from "react"

import { TimelineGraphView } from "@components/visualisation/Timeline"

import "@assets/stylesheets/graph.scss"

const _ = require("lodash");

/**
 * The Timeline Graph main component.
 * Shows the timeline on the X axis. The Y axis contains different values in the timeline flow.
 * The values are connected based on the parent values. One value can be multiple parent and can be a parent to multiple nodes.
 * 
 * ### Tags
 * @version 0.0.1
 * @component
 * @memberof Visualisation.Timeline
 * @type {React.Component}
 * @param {Object} props Defines the props specified in `propTypes` property of `TimelineGraph` component
 * 
 * @returns {React.ReactElement} Returns the React component
 */
const TimelineGraph = (props) => {
    var { data, selected, ...other } = props
    const [updatedData, setUpdatedData] = useState(data)

    return (
        <div className='graph'>
            <TimelineGraphView {...{
                ...props,
                data: updatedData,
            }} />
        </div>
    )
}

TimelineGraph.propTypes = {
    /** Sets the width of the `<svg>` canvas */
    width: PropTypes.number,
    /** Sets the height of the `<svg>` canvas */
    height: PropTypes.number,
     /** Sets the data Object. Expects a JavaScript Object */
    data: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        semester: PropTypes.string.isRequired,
        group: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        parents: PropTypes.arrayOf(PropTypes.number)
    })),
    /** Sets the margin of the graph */
    margin: PropTypes.shape({
        top: PropTypes.number,
        left: PropTypes.number,
        right: PropTypes.number,
        bottom: PropTypes.number,
    }),
    /** Defines the scaling extent. Keep on default to disable completely. */
    scaleExtent: PropTypes.array,
    /** Sets the animation duration of the link animation */
    animateDuration: PropTypes.number,
    /** Sets the padding on X axis */
    xAxisPadding: PropTypes.number,
    /** Sets the padding on Y axis */
    yAxisPadding: PropTypes.number,
    /** Sets the circle radius of the nodes */
    circleRadius: PropTypes.number,
    /** Sets the tick scale of the X axis */
    xTickScale: PropTypes.number,
    /** Sets the tick scale of the Y axis */
    yTickScale: PropTypes.number,
    /** Sets he opacity of disabled nodes */
    disableOpacity: PropTypes.number,
    /** Sets the link width of link */
    linkWidth: PropTypes.number,
    /** Sets the default color of the graph links and nodes */
    defaultColor: PropTypes.string,
    /** Enables or disables the group colors */
    groups: PropTypes.bool,
    /** Enables or disables the link animation */
    animate: PropTypes.bool,
    /** Sets the colors scheme of the group colors */
    colorScheme: PropTypes.arrayOf(PropTypes.string),
    /** Sets the selected node in graph */
    selected: PropTypes.number,
    /** Called upon node selection */
    onSelectNode: PropTypes.func
}

TimelineGraph.defaultProps = {
    data: { data: [] },
    width: 1300,
    height: 750,
    margin: { top: 120, right: 20, bottom: 20, left: 20 },
    scaleExtent: [1, 1],
    animateDuration: 100,
    xAxisPadding: 0.5,
    yAxisPadding: 1,
    xTickScale: 60,
    yTickScale: 60,
    disableOpacity: 0.25,
    circleRadius: 10,
    linkWidth: 5,
    selected: 0,
    animate: true,
    groups: false,
    defaultColor: "#5491f5",
    colorScheme: [
        "#4e79a7",
        "#f28e2c",
        "#e15759",
        "#76b7b2",
        "#59a14f",
        "#edc949",
        "#af7aa1",
        "#ff9da7",
        "#9c755f",
        "#bab0ab"
    ],
    onSelectNode: () => {}
}

export default TimelineGraph