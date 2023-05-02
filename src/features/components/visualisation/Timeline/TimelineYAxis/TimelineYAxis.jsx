import { ClipPath } from '@components/visualisation/defs';

import "./TimelineYAxis.scss"

const uuid = require('react-uuid')

/**
 * The Timeline Y Axis component
 * 
 * ### Tags
 * @version 0.0.1
 * @component
 * @memberof Visualisation.Timeline
 * @type {React.Component}
 * @param {function} yScale Scale function of Y axis
 * @param {number} y The starting Y position
 * @param {number} width The width of the axis
 * @param {number} height The height of the axis
 * 
 * @returns {React.ReactSVGElement} Returns the React component
 */
const TimelineYAxis = ({ yScale, y, height, width }) => {
    return (
        <g className='y-axis'
            transform={`translate(${width}, 0)`}>
            <defs>
                <ClipPath
                    id={"yaxis"}
                    x={-width}
                    y={y}
                    width={width}
                    height={height}/>
            </defs>   
            <g clipPath='url(#yaxis)'>
                {yScale.domain().map((d) => (
                    <text
                        key={uuid()}
                        className="y-axis-text"
                        transform={`translate(-8 ,${yScale(d)})`}>
                        {d.toUpperCase()}
                    </text>
                ))}
            </g>
        </g>

    )
}

export default TimelineYAxis