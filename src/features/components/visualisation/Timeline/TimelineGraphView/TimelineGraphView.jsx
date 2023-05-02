import { useRef, useEffect, useState } from 'react'
import * as d3 from 'd3'

import d3Utils from '@core/utils/d3Utils';

import { Legend } from '@components/visualisation/Legend';
import { ClipPath } from '@components/visualisation/defs';
import {
    TimelineNode,
    TimelineLink,
    TimelineXAxis,
    TimelineYAxis,
    TimelineYLine
} from '@components/visualisation/Timeline'

var _ = require('lodash');
const uuid = require('react-uuid')

/**
 * @typedef {Object} Node
 * @memberof module:Timeline
 * @property {number|string} id The identification of the node
 * @property {number|string} label The label of the node in the graph
 * @property {number|string} name The full name of the node
 * @property {number|string} semester The semester the node belongs to
 * @property {number|string} group The groups of the node
 * @property {Array} parents The parent nodes of the node
 */

/**
 * @typedef {Object} Link
 * @memberof module:Timeline
 * @property {number|string} source The source `id` of the node
 * @property {number|string} target The target `id` of the node
 */

/**
 * The Timeline Graph View component renders the `<svg>` of the visualisation 
 * 
 * ### Tags
 * @version 0.0.1
 * @component
 * @memberof Visualisation.Timeline
 * @type {React.Component}
 * @param {number} width Sets the width of the `<svg>` canvas
 * @param {number} height height Sets the height of the `<svg>` canvas
 * @param {Array} data Sets the data of the graph
 * @param {number} animateDuration Sets the animation duration of the link animation
 * @param {number} xAxisPadding Sets the padding on X axis
 * @param {number} yAxisPadding Sets the padding on Y axis
 * @param {number} xTickScale Sets the tick scale of the X axis
 * @param {number} yTickScale Sets the tick scale of the Y axis
 * @param {number} margin Sets the margin of the graph
 * @param {number} disableOpacity Sets he opacity of disabled nodes
 * @param {number} circleRadius ets the circle radius of the nodes
 * @param {number} linkWidth Sets the link width of link
 * @param {number} selected Sets the selected node in graph
 * @param {boolean} animate Enables or disables the link animation
 * @param {boolean} groups Enables or disables the group colors 
 * @param {string} defaultColor Sets the default color of the graph links and nodes
 * @param {Array} colorScheme Sets the colors scheme of the group colors
 * @param {function} onSelectNode Called upon node selection
 * 
 * @returns {React.ReactSVGElement} Returns the React component
 */
const TimelineGraphView = ({
    width,
    height,
    data,
    scaleExtent,
    animateDuration,
    xAxisPadding,
    yAxisPadding,
    xTickScale,
    yTickScale,
    margin,
    animate,
    defaultColor,
    groups,
    disableOpacity,
    circleRadius,
    linkWidth,
    selected,
    colorScheme,
    onSelectNode }) => {

    const [currentZoom, setCurrentZoom] = useState(null)
    // The <svg> element reference
    const svg = useRef(null)
    // The <rect> reference of the clipped view
    const view = useRef(null)

    // Data preparation
    const semesterGroups = _.groupBy(data, d => d.semester)
    const colorScale = d3.scaleOrdinal(colorScheme).domain( [...new Set(data.map(item => item.group))])

    data.forEach(d => d.color = groups ? d3.color(colorScale(d.group)) : defaultColor);

    var links = [];
    data.forEach(d => {
        d.parents.forEach(p =>
            links.push({ source: p, target: d.id })
        );
    });

    // Define the infinity extent of scrolling the timeline
    const extent = [[0, 0], [Infinity, Infinity]]

    // Define the axis domains
    const xDomain = [...new Set(data.map(item => item.semester))].sort()
    const yDomain = [...new Set(data.map(item => item.label))]

    // Max x length
    const xLength = _.maxBy(yDomain, (d) => d.length).length + 8;
    
    // Margin ranges
    const newMargin = { top: margin.top, bottom: margin.bottom, left: margin.left + xLength * 5, right: margin.right }
    const xRange = [newMargin.left, newMargin.left + xTickScale * xDomain.length]
    const yRange = [newMargin.top, newMargin.top + yTickScale * yDomain.length]
    
    // Scale the domain to range through scale point
    const xScale = d3.scalePoint()
        .domain(xDomain)
        .range(xRange)
        .padding(xAxisPadding)

    const yScale = d3.scalePoint()
        .domain(yDomain)
        .range(yRange)
        .padding(yAxisPadding)

    // Remap the scale range to a new one defined by new zoom 
    if (currentZoom) {
        xScale.range(xRange.map(d => currentZoom.applyX(d)))
        yScale.range(yRange.map(d => currentZoom.applyY(d)))
    }

    // The zoom object
    const zoomer = d3.zoom()
        .scaleExtent(scaleExtent)
        .translateExtent(extent)
        .filter(d3Utils.filter)
        .on("zoom", ({ transform }) => setCurrentZoom(transform))

    /**
     * Adds the zoom to graph
     */
    const addZoom = () => {
        d3.select(svg.current).call(zoomer)
    }

    /**
     * Shows the graphs with given opacity
     * 
     * @param {number} opacity The opacity to show the nodes and links
     */
    const showGraph = (opacity) => {
        d3.select(svg.current).selectAll(".timeline-node")
            .style("opacity", opacity)

        d3.select(svg.current).selectAll(".timeline-link-path")
            .style("opacity", opacity);
    }

    /**
     * Show the ancestor elements
     * 
     * @param {Node} node The given graph node 
     * @param {number} opacity Opacity to show the ancestors elements 
     */
    const showAncestors = (node, opacity) => {
        showGraph(opacity)
        dfs(node.id, node.parents)
    }

    /**
     * Simple DFS through the graph
     * 
     * @param {Node} node The given node
     * @param {Array} parents Array of parents id
     */
    const dfs = (node, parents) => {
        d3.select(svg.current)
            .selectAll("#timeline-node-" + node)
            .style("opacity", 1)

        parents.forEach(parent => {
            d3.select(svg.current)
                .selectAll("#timeline-link-" + parent + "-" + node)
                .style("opacity", 1)
            
                dfs(parent, data.find((d) => d.id === parent).parents)
        })
    }

    /**
     * Animates the links from beginning to the end of the timeline
     * 
     * @param {number} duration The animation duration
     */
    const animateGraph = (duration) => {
        d3.select(svg.current)
            .selectAll("timeline-link-path")
            .style("stroke-dasharray", "0 0")
            .style("stroke-dashoffset", "0")

        xDomain.forEach((semester, i) => {
            semesterGroups[semester].forEach((node) => {
                node.parents.forEach((parent) => {
                    var g = d3.select(svg.current).select(`#timeline-link-${parent}-${node.id}`)
                    var length = g.node().getTotalLength();
                    
                    g.attr("stroke-dasharray", length + " " + length)
                        .attr("stroke-dashoffset", length)
                        .transition()
                        .duration(duration)
                        .delay(i * duration)
                        .ease(d3.easeLinear)
                        .attr("stroke-dashoffset", 0)
                })
            })
        })
    }

    /**
     * Called upon node over
     * 
     * @param {React.MouseEvent} e The event
     */
    const onNodeOverHandler = (e) => {
        var d = e.target.__data__
        showAncestors(d, disableOpacity)
    }

    /**
     * Called upon node out
     * 
     * @param {React.MouseEvent} e The event
     */
    const onNodeOutHandler = (e) => {
        showAncestors(data.find((d) => d.id === selected), disableOpacity)
    }

    /**
     * Called upon node selection
     * 
     * @param {React.MouseEvent} e The event
     */
    const onSelectNodeHandler = (e) => {
        if(onSelectNode) onSelectNode(e)
    }

    useEffect(() => {
        addZoom()
        showAncestors(data.find((d) => d.id === selected), disableOpacity)
    }, [data, width, height, xTickScale, yTickScale, groups, circleRadius,
        linkWidth, selected, colorScheme, scaleExtent, yScale, xScale, currentZoom])

    useEffect(() => {
        if (animate) animateGraph(animateDuration)
    }, [selected])

    return (
        <svg
            ref={svg}
            viewBox={[0, 0, width, height]}>
            <rect
                ref={view}
                x={0.5}
                y={0.5}
                width={width - 1}
                height={height - 1}
                style={{ fill: 'transparent', pointerEvents: "all" }} />
            <g className='vis'>
                <defs>
                    <ClipPath
                        id={"clip"}
                        x={newMargin.left}
                        y={newMargin.top}
                        width={width - newMargin.right}
                        height={height - newMargin.bottom} />
                </defs>
                {groups &&
                    <Legend
                        count
                        scale={colorScale}
                        size={10}
                        padding={20}
                        title={'Akreditace'}
                        variant='horizontal'
                        x={newMargin.right + 30}
                        y={30} />}
                <TimelineXAxis
                    xScale={xScale}
                    x={newMargin.left}
                    width={width - newMargin.right}
                    height={newMargin.top}
                    selected={data.find((d) => d.id === selected)?.semester}
                    scalePadding={xAxisPadding} />
                <TimelineYAxis
                    yScale={yScale}
                    y={newMargin.top}
                    width={newMargin.left}
                    height={height - newMargin.bottom}
                    scalePadding={yAxisPadding} />
                <g clipPath='url(#clip)'>
                    <g className='timeline-y-lines'>
                        {xDomain.map((semester) =>
                            <TimelineYLine
                                key={uuid()}
                                xScale={xScale}
                                y1={newMargin.top}
                                y2={height - newMargin.bottom}
                                selected={semester === data.find((d) => d.id === selected)?.semester}
                                value={semester} />)}
                    </g>
                    <g className='timeline-links'>
                        {links.map((link) =>
                            <TimelineLink
                                key={`link-${uuid()}`}
                                data={data}
                                link={link}
                                strokeWidth={linkWidth}
                                xScale={xScale}
                                yScale={yScale} />)}
                    </g>
                    <g className='timeline-nodes'>
                        {data.map((d) =>
                            <TimelineNode
                                key={`node-${uuid()}`}
                                node={d}
                                xScale={xScale}
                                yScale={yScale}
                                r={circleRadius}
                                selected={selected === d.id} 
                                onSelectNode={onSelectNodeHandler}
                                onMouseOver={onNodeOverHandler}
                                onMouseOut={onNodeOutHandler}/>)}
                    </g>
                </g>
            </g>
        </svg>
    )
}

export default TimelineGraphView