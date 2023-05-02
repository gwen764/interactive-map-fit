import { Legend } from "@components/visualisation/Legend";

export default {
    title: "Visualisation/Legend",
    component: Legend,
    tags: ['autodocs'],
    argTypes: {
        onChange: { action: "onChange" }
    }
}

const Template = (args) => {
    return (
        <svg style={{ display: 'block', height: '100%', width: '100%' }}
            viewBox={[0, 0, 1000, 300]}>
            <Legend
                {...{
                    ...args,
                    x: 40,
                    y: 40
                }} />
        </svg>
    )
}


/**
 * Default template 
 * 
 * @memberof Visualisation.Legend
 */
export const Default = Template.bind({})
Default.args = {

}

/**
 * Enable the title of the legend by setting `title` to a desired value.
 * Count is displayed by setting `count` to true.
 * 
 * @memberof Visualisation.Legend
 */
export const TitleAndCount = Template.bind({})
TitleAndCount.args = {
    title: "Letters",
    count: true
}

/**
 * Interactive mode of the legend enables the legend to be toggled off and on visually.
 * Upon change the `onChange` event is triggered and carries an array of the current active items.
 * Enable interactive legend by setting `interactive` to true.
 * 
 * @memberof Visualisation.Legend
 */
export const Interactive = Template.bind({})
Interactive.args = {
    interactive: true
}

/**
 * Different layout variants.
 * Enable the horizontal variant by setting `variant` to `horizontal`
 * 
 * @memberof Visualisation.Legend
 */
export const Horizontal = Template.bind({})
Horizontal.args = {
    variant: "horizontal",
    anchor: "start",
    padding: 20,
    title: "Letters"
}