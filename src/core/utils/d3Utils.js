import * as d3 from 'd3'

/**
 * A collection of utility functions for working with D3.js.
 * @namespace Core.Utils.d3Utils
 * @memberof Core.Utils
 */
export default {
    /**
     * Determines whether two nodes are connected in a graph.
     * @memberof Core.Utils.d3Utils
     * @param {Object} a - The first node object.
     * @param {Object} b - The second node object.
     * @param {Object} linkedByIndex - An object representing the links between nodes, indexed by node index pairs.
     * @returns {boolean} - Whether the two nodes are connected.
     */
    isConnected: (a, b, linkedByIndex) => {
        return linkedByIndex[`${a.index},${b.index}`] || linkedByIndex[`${b.index},${a.index}`] || a.index === b.index;
    },

    /**
     * Creates an object representing the links between nodes, indexed by node index pairs.
     * @memberof Core.Utils.d3Utils
     * @param {Object[]} links - An array of link objects.
     * @returns {Object} - An object representing the links between nodes, indexed by node index pairs.
     */
    linksByIndex: (links) => {
        var linkedByIndex = {}
        links.forEach(link => {
            linkedByIndex[`${link.source.index},${link.target.index}`] = 1;
        });

        return linkedByIndex
    },

    /**
     * Sets the bounding box property of each element in a D3 selection to its corresponding node object.
     * @memberof Core.Utils.d3Utils
     * @param {Object} selection - A D3 selection of nodes.
     */
    getBB: (selection) => {
        selection.each(d => d.bbox = selection.node().getBBox())
    },

    /**
     * Computes the midpoint between two coordinates.
     * @memberof Core.Utils.d3Utils
     * @param {number} source - The first coordinate.
     * @param {number} target - The second coordinate.
     * @returns {number} - The midpoint between the two coordinates.
     */
    getMiddle: (source, target) => {
        return (source + target) / 2
    },

    /**
     * Returns a translation string for a given node object.
     * @memberof Core.Utils.d3Utils
     * @param {Object} d - The node object.
     * @returns {string} - The translation string.
     */
    translate: (d) => {
        return `translate(${d.x}, ${d.y})`
    },

    /**
     * Returns a transform string for a given set of coordinates and scale.
     * @memberof Core.Utils.d3Utils
     * @param {number} x - The x-coordinate.
     * @param {number} y - The y-coordinate.
     * @param {number} s - The scale.
     * @returns {string} - The transform string.
     */
    transform: (x, y, s) => {
        return `translate(${x}, ${y}), scale(${s})`
    },

    /**
     * Returns a path string for a curved link between two nodes.
     * @memberof Core.Utils.d3Utils
     * @param {Object} d - The link object, with `source` and `target` properties representing the connected nodes.
     * @returns {string} - The path string.
     */
    linkArc: (d) => {
        var r = Math.hypot(d.target.x - d.source.x, d.target.y - d.source.y)
        return `
        M${d.source.x},${d.source.y}
        A${r},${r} 0 0,1 ${d.target.x},${d.target.y}`
    },

    /**
     * Returns a string representing an SVG path for a straight line between two points.
     * @memberof Core.Utils.d3Utils
     * @param {Object} d - The link data containing `source` and `target` properties.
     * @param {Object} d.source - The source node object.
     * @param {Object} d.target - The target node object.
     * @returns {string} - A string representing an SVG path for a straight line between `source` and `target`.
     */
    linkLine: (d) => {
        return `
      M${d.source.x},${d.source.y}
      A0,0 0 0,1 ${d.target.x},${d.target.y}`
    },

    /**
     * Returns a D3 drag behavior for dragging nodes.
     * @memberof Core.Utils.d3Utils
     * @param {Function} restartDrag - The function to call to restart the simulation when a node is dragged.
     * @param {Function} stopDrag - The function to call when a node is no longer being dragged.
     * @returns {Object} - A D3 drag behavior object with `start`, `drag`, and `end` handlers.
     */
    drag: (restartDrag, stopDrag) => {
        const onDragStart = (event, d) => {
            d.fx = d.x
            d.fy = d.y
        }

        const onDragUpdate = (event, d) => {
            restartDrag(event)
            d.fx = event.x
            d.fy = event.y
        }

        const onDragEnd = (event, d) => {
            stopDrag()
            d.fx = null
            d.fy = null
        }

        return d3
            .drag()
            .on("start", onDragStart)
            .on("drag", onDragUpdate)
            .on("end", onDragEnd)
    },

    /**
     * Filters mouse events based on the `ctrl` key and the button pressed.
     * @memberof Core.Utils.d3Utils
     * @param {Object} event - The event object to filter.
     * @returns {boolean} - `true` if the event should be allowed, `false` otherwise.
     */
    filter: (event) => {
        event.preventDefault();
        return (!event.ctrlKey || event.type === 'wheel') && !event.button;
    }
}