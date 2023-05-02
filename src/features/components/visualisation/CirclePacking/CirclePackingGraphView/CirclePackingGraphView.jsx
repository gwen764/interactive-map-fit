import { useRef, useEffect, useState, useId } from 'react'
import * as d3 from 'd3'

import Legend from '@components/visualisation/Legend/Legend';
import {
    CirclePackingNode,
    CirclePackingNodeLabel,
    CirclePackingLeafLabel,
    CirclePackingLeafSublabel
} from "@components/visualisation/CirclePacking"

const uuid = require('react-uuid')
const _ = require('lodash');

/**
 * @typedef {Object} Pack
 * @memberof Visualisation.CirclePacking
 * @property {number} depth The depth of the pack
 * @property {number} height The height of the pack
 * @property {number} r The cicle radius of the pack
 * @property {Object} data The data of the pack
 * @property {Object} parent The parent of the pack
 * @property {Array} children The childen of the pack
 */

/**
 * The Circle Packing Graph View component renders the `<svg>` element
 * 
 * ### Tags
 * @version 0.0.1
 * @component
 * @type {React.Component}
 * @memberof Visualisation.CirclePacking
 * @param {number} width Sets the width of the `<svg>` canvas
 * @param {number} height Sets the height of the `<svg>` canvas
 * @param {Level} data Sets the data Object. Expects a JavaScript Object
 * @param {Object} levels Object defining levels of the hierarchy
 * @param {Object} groups Object definng the grorups of the hierarchy levels
 * @param {number} circlePadding Circle padding between circles
 * @param {number} minRadius Minimal radius of the circle
 * @param {number} maxRadius Maximal radius of the circle
 * @param {number} zoomExtent Initial zoom extent
 * @param {number} zoomSpeed Zoom speed of the animation when zooming on circle
 * @param {boolean} lastLevel Enables or disables the last level mode
 * @param {boolean} parentLabel Enables of disables to see the parent label in the child node label
 * @param {string} defaultColor Default color of the circles
 * @param {Array} colorSchemes Array of color schemes to be applies to the levels
 * @param {function} onSelectNode Fires given event on node selection
 * 
 * @returns {React.ReactElement} Returns the React component
 */
const CirclePackingGraphView = ({
    width,
    height,
    data,
    minRadius,
    maxRadius,
    circlePadding,
    zoomExtent,
    zoomSpeed,
    levels,
    groups,
    parentLabel,
    lastLevel,
    defaultColor,
    colorSchemes,
    onSelectNode }) => {

    // Defines the pack state 
    const PackState = {
        Node: 0,
        Leaf: 1
    }

    // The <svg> element reference
    const svg = useRef(null)
    // The <g> upper most child element reference
    const g = useRef(null)

    const id = useId()

    const radiusScale = d3.scaleSqrt()
        .range([minRadius, maxRadius]);

    // Circle packing initialization
    const pack = d3.pack()
        .size([width, height])
        .padding(circlePadding)
        .radius(d => radiusScale(d.value))

    // Properteis of the circle to be drawn
    const circle = d3.arc()
        .innerRadius(0)
        .outerRadius(d => d)
        .startAngle(-Math.PI)
        .endAngle(Math.PI)

    // Construct the hierarchy
    let root = pack(d3.hierarchy(data).sum(() => 1))
    let packs = root.descendants()

    const [focus, setFocus] = useState(root)
    const [view, setView] = useState([root.x, root.y, root.r * 15])

    const level = lastLevel ? _.maxBy(packs, (d) => d.depth).depth : focus.depth + 1

    // Get the group information and construct color scales
    const groupLevels = _.groupBy(packs, (pack) => pack.depth)
    const groupScales = Object.keys(groupLevels).reduce((filtered, depth) => {
        const group = (pack) => {
            if (lastLevel && !("children" in pack)) {
                return true
            }
            return false
        }
        var filter = packs.filter((pack) => group(pack))

        var set = new Set(filter.map((level) => level.data.group))
        var undef = set.delete(undefined) || set.delete(null)
        if (undef) set.add("none")

        const scale = d3.scaleOrdinal()
            .range(colorSchemes[depth % colorSchemes.length])
            .domain(set)

        filtered[depth] = { depth: depth, scale: scale }

        return filtered;
    }, {});

    /**
     * Updates the `view` of the circles upon zooming out or in
     * 
     * @param {Array} view View object of coordinates x, y and r (for circle radius)
     */
    const updateView = (view) => {
        const k = width / view[2];

        const sublabel = d3.select(svg.current).selectAll(".circle-packing-leaf-sublabel")
        const label = d3.select(svg.current).selectAll(".circle-packing-leaf-label")
        const node = d3.select(svg.current).selectAll(".circle-packing-node")

        sublabel.attr("transform", d => `translate(${(d.x - view[0]) * k},${(d.y - view[1]) * k})`);
        label.attr("transform", d => `translate(${(d.x - view[0]) * k},${(d.y - view[1]) * k})`);
        node.attr("transform", d => `translate(${(d.x - view[0]) * k},${(d.y - view[1]) * k})`);
        node.attr("d", d => circle(d.r * k));
    }

    /**
     * Updates the zoom level and `view` of the elements
     * 
     * @param {Array} view View object of coordinates x, y and r (for circle radius)
     * @returns 
     */
    const updateZoomLevel = (view) => {
        if (!view || !focus) {
            return;
        }
        let newView = [focus.x, focus.y, focus.r * zoomExtent];

        d3.select(svg.current)
            .transition()
            .duration(zoomSpeed)
            .tween("zoom", () => {
                const i = d3.interpolateZoom(view, newView);
                return t => updateView(i(t));
            })
            .on("end", () => setView(newView))
    }

    /**
     * Decides the `pack` state based on parameter conditions
     * 
     * @param {Pack} pack The pack object constructed from `d3.pack()`
     * @returns 
     */
    const packState = (pack) => {
        if (lastLevel) return pack.children ? PackState.Node : PackState.Leaf

        if (focus.depth === (pack.depth - 1))
            return PackState.Leaf;
        if (focus.depth >= (pack.depth - 1))
            return PackState.Node;
        else
            return null;
    }

    /**
     * Decides on the visuals of the `pack` based on its `state` (node or leaf)
     * 
     * @param {Pack} pack The pack object constructed from `d3.pack()`
     * @returns 
     */
    const packStyle = (pack, state) => {
        var group = pack.data.group

        switch (state) {
            case PackState.Node:
                return {
                    fill: "none",
                    strokeWidth: 1,
                    stroke: "#bbb"
                }
            case PackState.Leaf:
                return {
                    fill: groups === undefined ? defaultColor : (group ? groupScales[pack.depth].scale(pack.data.group) : groupScales[pack.depth].scale("none")),
                    strokeWidth: 0,
                    stroke: "none"
                }
            default:
                return { fill: "none", strokeWidth: 0, stroke: "none" }
        }
    }

    /**
     * Reset the visuals of all groups on leaf circles 
     */
    const resetGroups = () => {
        d3.select(svg.current)
            .selectAll(".leaf")
            .style("opacity", 1)
    }

    /**
     * Highlights the groups of the given `group`
     * 
     * @param {string|number} group
     */
    const showGroups = (group) => {
        d3.select(svg.current)
            .selectAll(".leaf")
            .style("opacity", 0.15)

        d3.select(svg.current)
            .selectAll(`.group-${group}`)
            .style("opacity", 1)
    }

    /**
     * Called upon node selection
     * 
     * @param {React.MouseEvent} e The click event
     * @returns 
     */
    const onSelectNodeHandler = (e) => {
        var d = e.target.__data__

        if (focus === d) return;

        e.stopPropagation()

        if (onSelectNode)
            onSelectNode(e)
        setFocus(d)
    }

    /**
     * Called upon hovering over the legend item
     * 
     * @param {React.MouseEvent} e The mouse over event
     */
    const onLegendMouseOverHandler = (e) => {
        var d = e.target.__data__
        showGroups(d.item)
    }

    /**
     * Called upon hovering out of the legend item
     * 
     * @param {React.MouseEvent} e The mouse out event
     */
    const onLegendMouseOutHandler = (e) => {
        resetGroups()
    }

    useEffect(() => {
        updateZoomLevel(view)
    }, [data, focus, zoomExtent, zoomSpeed])

    useEffect(() => {
        updateView(view)
    }, [data, view, parentLabel, defaultColor, minRadius, maxRadius,
        circlePadding, zoomExtent, zoomSpeed, colorSchemes, groups, levels])

    return (
        <svg
            ref={svg}
            viewBox={[-width / 2, -height / 2, width, height]}>
            <g
                ref={g}
                className='vis'>
                <g className='circle-packing-nodes'>
                    {packs.map((pack) => {
                        const state = packState(pack);
                        const style = packStyle(pack, state);
                        return (
                            <CirclePackingNode
                                key={uuid()}
                                id={id}
                                node={pack}
                                selected={focus.data === pack.data && focus.depth === pack.depth}
                                leaf={state === PackState.Leaf}
                                d={circle(pack.r)}
                                style={style}
                                onSelectNode={onSelectNodeHandler} />)
                    })}
                </g>
                <g className='circle-packing-labels'>
                    {packs.map((pack) => (packState(pack) === PackState.Node) &&
                        <CirclePackingNodeLabel
                            key={uuid()}
                            id={id}
                            parentLabel={parentLabel}
                            node={pack} />)}
                    {packs.map((pack) => (packState(pack) === PackState.Leaf) &&
                        <CirclePackingLeafLabel
                            key={uuid()}
                            label={pack.data.label ? pack.data.label : pack.data.name}
                            node={pack} />)}
                    {packs.map((pack) => (packState(pack) === PackState.Leaf && pack.children) &&
                        <CirclePackingLeafSublabel
                            key={uuid()}
                            label={levels[focus.depth + 2]}
                            node={pack} />)}
                </g>
                {
                    (groups !== undefined && groupScales && groups[level]) &&
                    <Legend
                        scale={groupScales[level].scale}
                        variant='vertical'
                        anchor='start'
                        count
                        x={width / 2 - width / 4}
                        y={-height / 2 + 60}
                        size={13}
                        title={groups[level].name}
                        data={groups[level].groups}
                        onMouseOver={onLegendMouseOverHandler}
                        onMouseOut={onLegendMouseOutHandler} />}
            </g>
        </svg>
    )
}

export default CirclePackingGraphView