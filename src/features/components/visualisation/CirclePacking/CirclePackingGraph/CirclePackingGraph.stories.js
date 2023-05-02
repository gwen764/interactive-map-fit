import * as d3 from "d3"

import { HierarchyGroups, HierarchyLevels } from "@core/utils/acredationUtils";

import { CirclePackingGraph } from "@components/visualisation/CirclePacking";

import Data from "@assets/data/api/acredations/test.json"
import StudyData from "@assets/data/api/acredations/default.json"

const BookHierarchyLevels = {
    0: "book",
    1: "chapters",
    2: "subchapters",
    3: "subsubchapters",
    4: "subsubsubchapters"
}

const BookHierarchyGroups = {
    1: { name: "characters"},
    2: { name: "characters"},
    3: { name: "characters"},
    4: { name: "characters"},
}

export default {
    title: "Visualisation/Circle Packing",
    component: CirclePackingGraph,
    tags: ['autodocs'],
    argTypes: {
        onSelectNode: { action: "onSelectNode" }
    }
}

const Template = (args) => {
    return <CirclePackingGraph
        {...{
            ...args,
            width: 1400,
            height: 1000,
            zoomExtent: 3,
            data: Data,
        }} />
}

const StudyTemplate = (args) => {
    return <CirclePackingGraph
        {...{
            ...args,
            width: 1400,
            height: 1000,
            data: StudyData,
        }} />
}

/**
 * Default template 
 * 
 * @memberof Visualisation.CirclePacking
 */
export const Default = Template.bind({})
Default.args = {

}

/**
 * Packs can be grouped into categories. Specifies the levels enable showing the sublabels of the leaf nodes.
 * Enable pack grouping by setting `groups` object. Keys representing depth of the level (ex. 1, 2, 3..) and values for each level representing the type of group.
 * Example { 1: { name: "languages", groups: {"cz" : "czech", "en" : "english"} }}
 * Enable level sublabels by setting the `levels` object. Keys representing depth of the level (ex. 1, 2, 3..) and values for each level representing the type of level.
 * Example { 0: "book", 1: "chapters", 2: "subchapters" }
 * 
 * @memberof Visualisation.CirclePacking
 */
export const GroupsAndLevels = Template.bind({})
GroupsAndLevels.args = {
    levels: BookHierarchyLevels,
    groups: BookHierarchyGroups,
    parentLabel: true
}

/**
 * The levels can be exposed up to the last level.
 * Enable last level only by setting `lastLevel` to true.
 * 
 * @memberof Visualisation.CirclePacking
 */
export const LastLevel = Template.bind({})
LastLevel.args = {
    levels: BookHierarchyLevels,
    groups: BookHierarchyGroups,
    lastLevel: true
}

/**
 * Customize the sizes, color and labels.
 * Enable parent label in the child node by setting `parentLabel` to true.
 * Change the `minRadius` and `maxRadius` to change the pack sizes.
 * Change the `circlePadding` to change the padding between leaf packs.
 * Colors can be specified for each level by setting the `colorSchemes` to an array of arrays defining the schemes.
 * 
 * @memberof Visualisation.CirclePacking
 */
export const SizesAndColor = StudyTemplate.bind({})
SizesAndColor.args = {
    levels: HierarchyLevels,
    groups: HierarchyGroups,
    parentLabel: true,
    minRadius: 2,
    maxRadius: 12,
    zoomExtent: 3,
    circlePadding: 1,
    colorSchemes: [d3.schemeSet3.slice(4), d3.schemeSet2, d3.schemePaired, d3.schemeSet2],
}   