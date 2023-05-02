import * as d3 from "d3"

import { NetworkClusterGraph } from "@components/visualisation/NetworkCluster";

import Data from "@assets/data/api/topics/default.json"

export default {
    title: "Visualisation/Network Clusters",
    component: NetworkClusterGraph,
    tags: ['autodocs'],
    argTypes: {
        onSelectNode: { action: "onSelectNode" }
    }
}


const Template = (args) => {
    return <NetworkClusterGraph
          {...{
              ...args,
              width: 1400,
              height: 1000,
              data: Data,
          }} />
}


        
/**
 * Default template 
 * 
 * @memberof Visualisation.NetworkCluster
 */
export const Default = Template.bind({})
Default.args = {

}

/**
 * Network can show the clusters in convex hulls.
 * Enable the cluster visualisation by setting the `clusters` to true.
 * Enable the interactive legend by setting `legend` to true.
 * 
 * @memberof Visualisation.NetworkCluster
 */
export const Clusters = Template.bind({})
Clusters.args = {
    clusters: true,
    legend: true,
}

/**
 * Link labels upon hovering on the edge.
 * Enable link labels by setting the `linkLabels` to true.
 * 
 * @memberof Visualisation.NetworkCluster
 */
export const LinkLabels = Template.bind({})
LinkLabels.args = {
    linkLabels: true,
}

/**
 * Customize the sizes and color of the graph.
 * Change the `minLinkStrokeWidth` and `maxLinkStrokeWidth` to set minimal and maximal values in the scale.
 * Set the `baseCircleRadius` to change the size of the nodes.
 * Set the `baseFontSize` to change the size of the node labels.
 * Set the `clusterFontSize` to change the size of the cluster font.
 * Set the `colorScheme` to change the colors of the clusters.
 * 
 * @memberof Visualisation.NetworkCluster
 */
export const SizeAndColor = Template.bind({})
SizeAndColor.args = {
    clusters: true,
    minLinkStrokeWidth: 0.14,
    maxLinkStrokeWidth: 7,
    baseCircleRadius: 10,
    baseFontSize: 20,
    clusterFontSize: 45,
    clusterPadding: 120,
    clusterOpacity: 0.1,
    colorScheme: d3.schemeTableau10
}

/**
 * Change the force layout paramteres of the network.
 * Set `nodeStrength` to change the attractiveness between nodes.
 * Set the `linkDistance` to change the minimal link distance
 * 
 * @memberof Visualisation.NetworkCluster
 */
export const ForceLayout = Template.bind({})
ForceLayout.args = {
    nodeStrength: -70,
    linkDistance: 20,
    baseCircleRadius: 7,
}