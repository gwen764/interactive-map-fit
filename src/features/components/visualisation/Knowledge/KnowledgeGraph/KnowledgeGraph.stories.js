import { useArgs } from '@storybook/client-api';

import { EntityTypes, EntityIcons, RelationTypes } from "@core/utils/mapUtils";

import { KnowledgeGraph } from "@components/visualisation/Knowledge";

import Data from "@assets/data/api/map/default.json"
import RadialData from "@assets/data/api/map/test.json"
import ForceData from "@assets/data/api/map/map.json"


export default {
    title: "Visualisation/Knowledge Graph",
    component: KnowledgeGraph,
    tags: ['autodocs'],
    argTypes: {
        onSelectNode: { action: "onSelectNode" }
    }
}

const Template = (args) => {
    const [_, updateArgs] = useArgs();

    const handle = (e) => {
        updateArgs({ ...args, selected: e.target.__data__.id });
    }
    return <KnowledgeGraph
    {...{
        ...args, width: 1500,
        height: 1200,
        types: Object.keys(EntityTypes),
        relations: RelationTypes,
        icons: EntityIcons,
        data: Data,
        onSelectNode: handle
    }} />
}

const RadialTemplate = (args) => {
    return <KnowledgeGraph
    {...{
        ...args, width: 1500, height: 1200, types: Object.keys(EntityTypes),
        relations: RelationTypes,
        icons: EntityIcons,
        data: RadialData
    }} />
}

const ForceTemplate = (args) => {
    const [_, updateArgs] = useArgs();

    const handle = (e) => {
        updateArgs({ ...args, selected: e.target.__data__.id });
    }
    return <KnowledgeGraph
    {...{
        ...args, width: 1500,
        height: 1200,
        types: Object.keys(EntityTypes),
        relations: RelationTypes,
        icons: EntityIcons,
        data: ForceData,
        onSelectNode: handle
    }} />
}

/**
 * Default template
 * 
 * @memberof Visualisation.Knowledge
 */
export const Default = Template.bind({})
Default.args = {

}

/**
 * Expandable variant of the graph. Can be used if `expanded` array is specified (ex. `[0]`).
 * The graph expands the neighbour nodes (if has any) upon clicking on the node.
 * Enable expanding by setting `expand` to true and specifying `expanded` array.
 * 
 * @memberof Visualisation.Knowledge
 */
export const Expandable = Template.bind({})
Expandable.args = { 
    expanded: [0],
    expand: true,
    selected: 5,
    collide: true
}

/**
 * Automatic zoomable variant of the graph. Select node by clicking and the node gets zoomed onto.
 * This feature zooms automatically when the `selected` is changed (either by clicking the node or can be other).
 * Enable the zooming by setting `autoZoom` to true.
 * 
 * @memberof Visualisation.Knowledge
 */
export const Zoomable = Template.bind({})
Zoomable.args = {  
    selected: 0,
    autoZoom: true,
    collide: true,
    scaleExtent: [0.4, 4]
}

/**
 * Various link variants for the graph.
 * Enable arrows on links by setting `arrows` to true.
 * Enable an oriented graph by setting the `oriented` to true.
 * Choose an edge style by setting `edge` to `arc` or `line`.
 * Enable link labels by setting `linkLabels` to true.
 * 
 * @memberof Visualisation.Knowledge
 */
export const Links = Template.bind({})
Links.args = {
    arrows: true,
    oriented: true,
    edge: "arc",
    collide: true,
    linkLabels: true,  
}

/**
 * Choose different parameters for the force layout.
 * Choose the force layout by setting the `layout` to `force`.
 * Node force is set by the `nodeStrength`.
 * Link distance between nodes is set by `linkDistance`
 * Enable collision by setting `collide` to true.
 * Change the collide radius by setting `collideRadius` to true.
 * 
 * @memberof Visualisation.Knowledge
 */
export const ForceLayout = ForceTemplate.bind({})
ForceLayout.args = {
    nodeStrength: -2000,
    linkDistance: 250,
    layout: "force",
    collideRadius: 40,
    collide: true
}

/**
 * Grouped layout into the layers by the `type` property of nodes.
 * Enable the radial layout by setting `layout` to `radial`.
 * 
 * @memberof Visualisation.Knowledge
 */
export const RadialLayout = RadialTemplate.bind({})
RadialLayout.args = {
    layout: "radial",
    radialScale: 20,
    scaleExtent: [0.15, 2]
}


