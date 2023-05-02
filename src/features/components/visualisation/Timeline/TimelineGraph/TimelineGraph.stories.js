import { useArgs } from '@storybook/client-api';
import * as d3 from "d3"

import { TimelineGraph } from "@components/visualisation/Timeline";

import Data from "@assets/data/api/versions/test.json"
import CourseData from "@assets/data/api/versions/default.json"

export default {
    title: "Visualisation/Timeline Graph",
    component: TimelineGraph,
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
    return <TimelineGraph
        {...{
            ...args,
            width: 1000,
            height: 500,
            data: Data.data,
            onSelectNode: handle
        }} />
}

const CourseTemplate = (args) => {
    const [_, updateArgs] = useArgs();

    const handle = (e) => {
        updateArgs({ ...args, selected: e.target.__data__.id });
    }
    return <TimelineGraph
        {...{
            ...args,
            width: 1000,
            height: 500,
            data: CourseData.data,
            onSelectNode: handle
        }} />
}

/**
 * Default template 
 * 
 * @memberof Visualisation.Timeline
 */
export const Default = Template.bind({})
Default.args = {

}

/**
 * Enables grouping the nodes into groups and distinguish them by color, different neighbours have a gradient between them.
 * Enable groups by setting `groups` to true. 
 * 
 * @memberof Visualisation.Timeline
 */
export const Groups = CourseTemplate.bind({})
Groups.args = {
    groups: true,
    selected: 319
}

/**
 * Shows different settings for sizes and colors in the graph.
 * Scale the ticks of axis using `xTickScale` and `yTickScale`
 * Change the node radius using `circleRadius`
 * Change the link width using `linkWidth`
 * Change the groups color scheme using `colorScheme`
 * 
 * @memberof Visualisation.Timeline
 */
export const SizeAndColor = Template.bind({})
SizeAndColor.args = {
    xAxisPadding: 0.2,
    yAxisPadding: 1,
    xTickScale: 200,
    yTickScale: 60,
    circleRadius: 10,
    linkWidth: 10,
    groups: true,
    colorScheme: d3.schemeSet2
}

/**
 * Animation can be turned on and off. You can also set the duration.
 * Enable the animation with `animate` set to true
 * Set the animation duration with `animateDuration` 
 * 
 * @memberof Visualisation.Timeline
 */
export const Animation = Template.bind({})
Animation.args = {
    animateDuration: 600,
}

/**
 * Timeline can be scaled with both axis and position of the nodes and links
 * Enable scaling by setting the `scaleExtent`. Setting it to `[1, 1]` makes it a default behaviour and disables the scaling.
 * 
 * @memberof Visualisation.Timeline
 */
export const Scale = Template.bind({})
Scale.args = {
    scaleExtent: [0.9, 3]
}

