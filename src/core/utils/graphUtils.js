const _ = require('lodash');

/**
 * A collection of utility functions for working graph data
 * @namespace Core.Utils.graphUtils
 * @memberof Core.Utils
 */
export default {
  /**
   * Adds degree centrality to nodes in a graph.
   * @function addDegreeCentrality
   * @memberof Core.Utils.graphUtils
   * @param {object} data - The graph data.
   * @returns {object} The updated graph data with degree centrality added to nodes.
   */
  addDegreeCentrality: (data) => {
    var nodes = data.nodes.map((node) => {
      var degreeCentrality = data.links.filter((link) => link.source === node.name || link.target === node.name).length
      return { ...node, degreeCentrality: degreeCentrality }
    })
    return { nodes: nodes, links: data.links }
  },

  /**
   * Counts the number of nodes of each type in a graph.
   * @function countNodeTypes
   * @memberof Core.Utils.graphUtils
   * @param {object} nodes - The nodes in the graph.
   * @param {array} types - An array of node types to count.
   * @returns {object} An object containing the count of nodes of each type.
   */
  countNodeTypes: (nodes, types) => {
    var groupedTypes = _.groupBy(nodes, (node) => node.type)
    var countTypes = types.reduce((filtered, type) => {
        var count = groupedTypes[type] ? groupedTypes[type].length : 0
        filtered[type] = count
        return filtered
    }, {})
    return countTypes
  },

  /**
   * Initializes filtering of edges in a graph.
   * @function initFilterEdges
   * @memberof Core.Utils.graphUtils
   * @param {object} data - The graph data.
   * @param {string} nodeIdAttr - The name of the node ID attribute.
   * @returns {object} The updated graph data with edge filtering initialized.
   */
  initFilterEdges: (data, nodeIdAttr) => {
    var filter = _.map(data.nodes, nodeIdAttr);
    
    const validLink = (link) => {
      return link.source?.id === undefined && link.target?.id === undefined ? filter.includes(link.source) && filter.includes(link.target) : 
      filter.includes(link.source.id) && filter.includes(link.target.id)
    }

    var links = data.links.filter(link => validLink(link))

    return { nodes: data.nodes, links: links }
  },

  /**
   * Initializes filtering of a network graph.
   * @function initFilterNetwork
   * @memberof Core.Utils.graphUtils
   * @param {object} data - The graph data.
   * @returns {object} The updated graph data with network filtering initialized.
   */
  initFilterNetwork :(data) => {
    var links = data.links.reduce((filtered, link) => {
      const reverse = filtered.find((l) => l.source === link.target && l.target === link.source)
      if (reverse) {
        filtered.push({ source: link.target, target: link.source, values: link.values.concat(reverse.values) })
        _.pull(filtered, reverse)
      }
      else {
        filtered.push(link)
      }

      return filtered
    }, [])

    return { nodes: data.nodes, links: links }
  },

  /**
   * Recursively filter an array of objects, keeping only those that satisfy a given condition and their children.
   * @function filterRecurse
   * @memberof Core.Utils.graphUtils
   * @param {Array} array - The array of objects to filter.
   * @param {Function} fn - A function that takes an object and returns a boolean value indicating whether it should be kept or not.
   * @returns {Array} An array of objects that satisfy the given condition and their children.
   */
  filterRecurse : (array, fn) => {
    return array.reduce((r, o) => {
        var children = module.exports.filterRecurse(o.children || [], fn);
        if (fn(o) || children.length) r.push(Object.assign({}, o, children.length && { children }));
        return r;
    }, []);
  }

}