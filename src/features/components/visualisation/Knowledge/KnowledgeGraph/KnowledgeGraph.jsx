import { useState, useEffect } from "react";
import PropTypes from 'prop-types'

import graphUtils from "@core/utils/graphUtils";

import { KnowledgeGraphView } from '@components/visualisation/Knowledge';

import "@assets/stylesheets/graph.scss"

/**
 * @typedef {Object} Node
 * @memberof Visualisation.Knowledge
 * @property {number|string} id The identification of the node
 * @property {number|string} label The label of the node in the graph
 * @property {number|string} name The full name of the node
 * @property {number|string} type The type of the node in the knowledge graph
 */

/**
 * @typedef {Object} Link
 * @memberof Visualisation.Knowledge
 * @property {number|string} source The `id` of the source node
 * @property {number|string} target The `id` of the target node
 * @property {number|string} value The value representing the link in the graph
 */

/**
 * The Knowledge Graph main component.
 * Shows the graph with different types of entities and relations.
 * Types are predefined and form a schema of the graph. 
 * Can be either oriented or not oriented. 
 * 
 * ### Tags
 * @version 0.0.1
 * @component
 * @memberof Visualisation.Knowledge
 * @type {React.Component}
 * @param {Object} props Defines the props specified in `propTypes` property of `KnowledgeGraph` component
 * 
 * @returns {React.ReactElement} Returns the React component
 */
const KnowledgeGraph = (props) => {
    var { data, expanded, types, expand, onSelectNode, setData, ...other } = props

    const [defLinks, setDefLinks] = useState(null)
    const [defNodes, setDefNodes] = useState(null)
    const [links, setLinks] = useState(null)
    const [nodes, setNodes] = useState(null)

    const [expandFilter, setExpandFilter] = useState([Number(expanded)])

    /**
     * Apply the expand filter on given nodes and links
     * 
     * @memberof KnowledgeGraph
     * @param {Node[]} nodes 
     * @param {Link[]} links 
     * @returns {Object} Updated data
     */
    const applyExpandFilter = (nodes, links) => {
        var fNodes = []
        var fLinks = []

        if (expandFilter.length <= 0) {
            var selected = defNodes.find((node) => node.id === expanded)
            return { nodes: [selected], links: [] }
        }

        expandFilter.forEach((e) => {
            var l = links.filter((link) => (link.source.id === e || link.target.id === e) && !fLinks.includes(link))
            var nodeFilter = l.reduce((filtered, link) => {
                filtered.push(link.target.id)
                filtered.push(link.source.id)
                return [...new Set(filtered)]
            }, [])

            if (!nodeFilter.includes(e)) {
                nodeFilter.push(e)
            }

            var n = nodes.filter((node) => nodeFilter.includes(node.id) && !fNodes.includes(node))
            fNodes.push(...n)
            fLinks.push(...l)
        })
        return { nodes: fNodes, links: fLinks }
    }
    /**
     * Applies the type filter of given nodes and links
     * 
     * @memberof KnowledgeGraph
     * @param {Node[]} nodes 
     * @param {Link[]} links 
     * @returns {Object} Updated data
     */
    const applyTypeFilter = (nodes, links) => {
        var fNodes = nodes.filter(node => types.includes(node.type));
        var fLinks = links.filter(link => fNodes.includes(link.source) && fNodes.includes(link.target))

        return { nodes: fNodes, links: fLinks }
    }

    /**
     * Updates nodes and links data with given filters
     * 
     * @memberof KnowledgeGraph
     * @param {Node[]} nodes 
     * @param {Link[]} links 
     */
    const updateData = (nodes, links) => {
        var data = applyTypeFilter(nodes, links)
        if (expanded !== undefined) {
            data = applyExpandFilter(data.nodes, data.links)
        }

        if (setData) {
            setData(data)
        }
        setNodes(data.nodes)
        setLinks(data.links)
    }

    /**
     * Initial filter for data called upon component mounting
     * 
     * @memberof KnowledgeGraph
     * @param {Object} res 
     */
    const initData = (res) => {
        var data = graphUtils.initFilterEdges(res, "id")

        data.nodes.forEach((node) => {
            node.expanded = false;

            if (node.id === expanded) {
                node.expanded = true
            }
        })

        setDefLinks(data.links)
        setDefNodes(data.nodes)
        setLinks(data.links)
        setNodes(data.nodes)
    }

    /**
     * Adds all collapsed nodes when collapsing `d` node to the `collapsed`
     *          
     * @param {Node} d 
     * @param {Array} collapsed 
     */
    const collapseNodes = (d, collapsed) => {
        d.expanded = false;
        var neighbours = links.filter((link) => link.source.id === d.id || (!("oriented" in link) && link.target.id === d.id))

        neighbours.forEach((n) => {
            var neighbourNode = nodes.find((node) => (d.id === n.source.id && node.id === n.target.id) || (d.id === n.target.id && node.id === n.source.id))
            if (!neighbourNode.expanded) return;
            collapseNodes(neighbourNode, collapsed)
        })
        collapsed.push(d.id)
    }

    /**
     * Sets a new expand filter for expanding `d` node
     * 
     * @param {Node} d 
     */
    const expandNodes = (d) => {
        var newExpanded = []

        if (expandFilter.includes(d.id)) {
            var collapsed = []
            collapseNodes(d, collapsed)

            newExpanded = expandFilter.filter((e) => !collapsed.includes(e));
        }
        else {
            d.expanded = true;
            newExpanded = [...expandFilter, d.id];
        }
        if (newExpanded.length <= 0)
            newExpanded.push(expanded)

        setExpandFilter([...new Set(newExpanded)])
    }

    /**
     * Fires upon node selection in the graph
     * 
     * @param {React.MouseEvent} e 
     */
    const onSelectNodeHandler = (e) => {
        if (onSelectNode) {
            onSelectNode(e)
        }

        if (expand) {
            var d = e.target.__data__
            expandNodes(d)
        }
    }

    useEffect(() => {
        if (nodes && links) {
            updateData(defNodes, defLinks)
        }
    }, [types, expandFilter, data, expanded])

    useEffect(() => {
        initData(data)
    }, [])

    useEffect(() => {
        setExpandFilter([Number(expanded)])
    }, [expanded])

    return (
        <div className='graph'>
            {(nodes && links) &&
                <KnowledgeGraphView
                    {...{
                        ...props,
                        nodes: nodes,
                        links: links,
                        onSelectNode: onSelectNodeHandler
                    }} />
            }
        </div>
    )
}

KnowledgeGraph.propTypes = {
    /** Sets the width of the `<svg>` canvas */
    width: PropTypes.number,
    /** Sets the height of the `<svg>` canvas */
    height: PropTypes.number,
    /** Sets the data Object. Expects a JavaScript Object */
    data: PropTypes.shape({
        nodes: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.any.isRequired,
            type: PropTypes.any.isRequired,
            name: PropTypes.any.isRequired,
            label: PropTypes.any
        })),
        links: PropTypes.arrayOf(PropTypes.shape({
            source: PropTypes.any.isRequired,
            target: PropTypes.any.isRequired,
            value: PropTypes.any.isRequired,
            oriented: PropTypes.bool
        }))
    }).isRequired,
    /** If specified sets the node type options. */
    types: PropTypes.array,
    /** If specified sets the given icons in `<text>` elements. Expects an Object with keys as the `types`. */
    icons: PropTypes.object,
    /** If specified sets the given relations in `<text>` elements. Expects an Object with keys as possible relations. */
    relations: PropTypes.object,
    /** Sets the initial translate Object for initial position of the graph. */
    initTranslate: PropTypes.arrayOf(PropTypes.number),
    /** Sets the minimal and maximal values for graph zooming. */
    scaleExtent: PropTypes.arrayOf(PropTypes.number),
    /** Sets the Link strength parameter. Default value recommended. */
    linkStrength: PropTypes.number,
    /** Sets the link distance parameter. Determines the minimal value of link length. */
    linkDistance: PropTypes.number,
    /** Sets the force strength of the nodes. */
    nodeStrength: PropTypes.number,
    /** Sets the node radius. */
    circleRadius: PropTypes.number,
    /** Sets the collision radius of the nodes. */
    collideRadius: PropTypes.number,
    /** Sets the radial scale for `radial` type of the `layout`. */
    radialScale: PropTypes.number,
    /** Sets the specified node to be selected. Expects the `id` of the node. */
    selected: PropTypes.number,
    /** Sets the layout of the graph. Available `force` or `radial.`. */
    layout: PropTypes.oneOf(["force", "radial"]),
    /** Sets the link style of the graph. Available `arc` or `line.` */
    edge: PropTypes.oneOf(["arc", "line"]),
    /** Sets the expanded array. Expects array of `id` of nodes to be expanded. */
    expanded: PropTypes.array,
    /** Enables or disables the visibility of link labels. */
    linkLabels: PropTypes.bool,
    /** Enables or disables the option to expand the nodes. The `expanded` must be specified. */
    expand: PropTypes.bool,
    /** Enables or disables the option of nodes to collide between each other. */
    collide: PropTypes.bool,
    /** Enables or disables the option of oriented graph. */
    oriented: PropTypes.bool,
    /** Enables or disables arrows for links. If `oriented` is true and `arrows` is true draws arrows everywhere. If `oriented` id true and `arrows` is false draws only to links marked `oriented` as true*/
    arrows: PropTypes.bool,
    /** Enables or disables automatically zooming on node upon selection. */
    autoZoom: PropTypes.bool,
    /** Fires given event on node selection. */
    onSelectNode: PropTypes.func
}

KnowledgeGraph.defaultProps = {
    width: 1000,
    height: 1000,
    data: { nodes: [], links: [] },
    initTranslate: [0, 0],
    scaleExtent: [1 / 3, 3],
    linkStrength: 1,
    linkDistance: 300,
    nodeStrength: -200,
    circleRadius: 30,
    collideRadius: 100,
    radialScale: 10,
    selected: undefined,
    expanded: undefined,
    collide: false,
    expand: false,
    linkLabels: false,
    edge: "line",
    layout: "force",
    icons: undefined,
    oriented: false,
    arrows: false,
    autoZoom: false,
    types: [],
    relations: {},
}

export default KnowledgeGraph