import { useRef, useEffect, useId, useState } from "react";
import * as d3 from 'd3'

import d3Utils from "@core/utils/d3Utils"
import { useIsVisible } from "@core/hooks";

import { ArrowMarker } from "@components/visualisation/defs";
import {
    KnowledgeLink,
    KnowledgeLinkLabel,
    KnowledgeNode,
    KnowledgeNodeLabel,
    KnowledgeNodeIcon
} from "@components/visualisation/Knowledge";

const uuid = require('react-uuid')

/**
 * The Knowledge Graph View components render the `<svg>` element
 * 
 * ### Tags
 * @version 0.0.1
 * @component
 * @type {React.Component}
 * @memberof Visualisation.Knowledge
 * @param {number} width Sets the width of the `<svg>` canvas
 * @param {number} height Sets the height of the `<svg>` canvas
 * @param {Node[]} nodes Sets the nodes of the graph
 * @param {Link[]} links Sets the links of the graph
 * @param {Array} types If specified sets the node type options.
 * @param {Object} icons If specified sets the given icons in `<text>` elements. Expects an Object with keys as the `types`.
 * @param {Object} relations If specified sets the given relations in `<text>` elements. Expects an Object with keys as possible relations.
 * @param {Array} initTranslate Sets the initial translate Object for initial position of the graph.
 * @param {Array} scaleExtent Sets the minimal and maximal values for graph zooming.
 * @param {number} expanded Expanded node
 * @param {number} linkStrength Sets the Link strength parameter. Default value recommended.
 * @param {number} linkDistance Sets the link distance parameter. Determines the minimal value of link length.
 * @param {number} nodeStrength Sets the force strength of the nodes.
 * @param {number} circleRadius Sets the node radius.
 * @param {number} collideRadius Sets the collision radius of the nodes.
 * @param {number} radialScale Sets the radial scale for `radial` type of the `layout`.
 * @param {number} selected Sets the specified node to be selected. Expects the `id` of the node.
 * @param {string} layout Sets the layout of the graph. Available `force` or `radial.`.
 * @param {string} edge Sets the link style of the graph. Available `arc` or `line.`
 * @param {boolean} linkLabels Enables or disables the visibility of link labels.
 * @param {boolean} collide Enables or disables the option of nodes to collide between each other.
 * @param {boolean} oriented Enables or disables the option of oriented graph.
 * @param {boolean} arrows Enables or disables arrows for links.
 * @param {boolean} autoZoom Enables or disables automatically zooming on node upon selection.
 * @param {React.MouseEvent} onSelectNode Fires given event on node selection.
 * @returns {React.ReactElement} Returns the React component
 */
const KnowledgeGraphView = ({
    width,
    height,
    nodes,
    links,
    types,
    relations,
    initTranslate,
    scaleExtent,
    collideRadius,
    linkStrength,
    linkDistance,
    nodeStrength,
    circleRadius,
    collide,
    linkLabels,
    selected,
    expanded,
    radialScale,
    icons,
    edge,
    layout,
    oriented,
    arrows,
    autoZoom,
    onSelectNode }) => {

    // The <svg> element reference
    const svg = useRef(null)
    // The <g> upper most child element reference
    const g = useRef(null)
    // Checks the visibility of element
    const isVisible = useIsVisible(svg)

    const id = useId()

    const [indexLinks, setIndexLinks] = useState(d3Utils.linksByIndex(links))

    // Force simulation
    let simulation = undefined;

    // Scale for radial layout
    const typeScale = d3.scalePoint()
        .domain(types)
        .range([nodes.length * radialScale / types.length, nodes.length * radialScale])

    // Zoom object
    const zoomer = d3.zoom()
        .extent([initTranslate, [width, height]])
        .scaleExtent(scaleExtent)
        .on("zoom", ({ transform }) => {
            d3.select(g.current).attr("transform", transform)
        })

    /**
     * Restars the simulation drag
     */
    const restartDrag = () => {
        if (simulation) simulation.alphaTarget(0.3).restart()
    }

    /**
     * Stops the simulation drag
     */
    const stopDrag = () => {
        if (simulation) simulation.alphaTarget(0)
    }

    /**
     * Adds zoom to the <svg> element
     */
    const addZoom = () => {
        d3.select(svg.current).call(zoomer)
    }

    /**
     * Zooms on the selected node
     * 
     * @param {number} selected 
     * @returns 
     */
    const zoomNode = (selected) => {
        var node = nodes.find((node) => node.id === selected)
        if (!node) return;

        d3.select(svg.current)
            .transition()
            .duration(333)
            .call(zoomer.transform,
                d3.zoomIdentity
                    .translate(width / 2, height / 2)
                    .scale(scaleExtent[1] / 2)
                    .translate(-(node.x), -(node.y))
            );
    }

    /**
     * Simulate positions of the force graph elements.
     * Called upon update 
     */
    const simulatePositions = () => {
        // On simulation `tick`
        const tick = () => {
            const node = d3.select(svg.current).selectAll(".knowledge-node")
            const link = d3.select(svg.current).selectAll(".knowledge-link")
            const label = d3.select(svg.current).selectAll(".knowledge-node-label")
            const icon = d3.select(svg.current).selectAll(".knowledge-node-icon")

            node.attr("cx", d => d.x)
            node.attr("cy", d => d.y)

            link.attr("d", d => edge === "arc" ? d3Utils.linkArc(d) : d3Utils.linkLine(d))

            label.attr("x", d => d.x)
            label.attr("y", d => d.y)

            icon.attr("x", d => d.x)
            icon.attr("y", d => d.y)
        }

        const forceCenter = d3
            .forceCenter(width / 2, height / 2)

        simulation = d3.forceSimulation(nodes)
            .force("center", forceCenter)
            .on('tick', () => tick())

        if (collide) {
            const forceCollide = d3
                .forceCollide(circleRadius + collideRadius)
                .radius(collideRadius)

            simulation.force("collide", forceCollide)
        }

        if (expanded === undefined) {
            const forceX = d3
                .forceX()

            const forceY = d3
                .forceY()

            simulation
                .force("x", forceX)
                .force("y", forceY)
        }

        // Enables `radial` layout
        if (layout === "radial") {
            const forceRadial = d3
                .forceRadial((d) => typeScale(d.type), width / 2, height / 2)

            simulation
                .force("r", forceRadial)
                .force("charge", d3.forceCollide().radius(circleRadius + collideRadius))
        }

        // Enables `force` layout
        if (layout === "force") {
            const forceNode = d3
                .forceManyBody()
                .strength(nodeStrength)

            const forceLink = d3
                .forceLink(links)
                .id(d => d.id)
                .distance((d) => {
                    // Determine distance based on the neighbour count
                    var neighbours = links.filter((link) => link.source.id === d.source.id || link.target.id === d.source.id);
                    var set = neighbours.reduce((filtered, link) => {
                        filtered.push(link.target.id)
                        filtered.push(link.source.id)
                        return [...new Set(filtered)]
                    }, [])
                    var length = set.length
                    var expandedDistance = d.target.expanded ? length * 60 : length * 30
                    return expanded !== undefined ? expandedDistance : linkDistance
                })
                .strength(linkStrength)

            simulation
                .force("link", forceLink)
                .force("charge", forceNode)
        }

        simulation.restart().alpha(1)
    }

    /**
     * Called upon node selection
     * 
     * @param {React.MouseEvent} e The click event
     */
    const onSelectNodeHandler = (e) => {
        if (onSelectNode) onSelectNode(e)
    }

    useEffect(() => {
        if (autoZoom) zoomNode(selected)
    }, [isVisible, selected])

    useEffect(() => {
        addZoom()
        simulatePositions()
        setIndexLinks(links)
        return () => simulation.stop()
    }, [isVisible, links, nodes, expanded, linkLabels, edge, types,
        layout, oriented, arrows, collide, circleRadius, autoZoom,
        nodeStrength, linkDistance, radialScale, linkStrength, collideRadius])

    return (
        <svg
            ref={svg}
            viewBox={[0, 0, width, height]}>
            {oriented &&
                <defs>
                    <ArrowMarker
                        id="arrowStart"
                        offsetX={circleRadius} />
                    <ArrowMarker
                        id="arrowEnd"
                        offsetX={circleRadius} />
                </defs>
            }
            {isVisible &&
                <g ref={g}>
                    {layout !== "radial" &&
                        <g className='knowledge-links'>
                            {links?.map((link) =>
                                <KnowledgeLink
                                    id={id}
                                    selected={selected === link.source.id || selected === link.target.id}
                                    link={link}
                                    type={edge}
                                    labels={linkLabels}
                                    oriented={oriented}
                                    arrow={arrows}
                                    key={uuid()} />)}
                        </g>
                    }
                    {layout !== "radial" &&
                        <g className="knowledge-link-labels">
                            {links?.map((link) =>
                                <KnowledgeLinkLabel
                                    id={id}
                                    link={link}
                                    relation={relations[link.value]}
                                    key={uuid()} />)}
                        </g>
                    }
                    <g className="knowledge-nodes">
                        {nodes?.map((node) =>
                            <KnowledgeNode
                                node={node}
                                key={uuid()}
                                r={circleRadius}
                                selected={selected === node.id}
                                onSelectNode={onSelectNodeHandler}
                                restartDrag={restartDrag}
                                stopDrag={stopDrag} />)}
                    </g>
                    <g className="knowledge-node-labels">
                        {nodes?.map((node) =>
                            <KnowledgeNodeLabel
                                node={node}
                                circleRadius={circleRadius}
                                restartDrag={restartDrag}
                                stopDrag={stopDrag}
                                key={uuid()} />)}
                    </g>
                    {icons &&
                        <g className="knowledge-node-icons">
                            {nodes?.map((node) =>
                                <KnowledgeNodeIcon
                                    node={node}
                                    circleRadius={circleRadius}
                                    icon={icons[node.type]}
                                    restartDrag={restartDrag}
                                    stopDrag={stopDrag}
                                    key={uuid()} />)}
                        </g>
                    }
                </g>
            }
        </svg>
    )
}

export default KnowledgeGraphView;