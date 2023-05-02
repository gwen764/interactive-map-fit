import { ClipPath } from '@components/visualisation/defs';

import "./TimelineXAxis.scss"

/**
 * The Timeline X Axis component
 * 
 * ### Tags
 * @version 0.0.1
 * @component
 * @memberof Visualisation.Timeline
 * @type {React.Component}
 * @param {function} xScale Scale function of X axis
 * @param {number} x The starting X position
 * @param {number} width The width of the axis
 * @param {number} height The height of the axis
 * @param {number} selected The selected item of the X domain
 * @param {number} scalePadding Padding of the ticks between
 * 
 * @returns {React.ReactSVGElement} Returns the React component
 */
const TimelineXAxis = ({ xScale, x, width, height, selected, scalePadding }) => {
    return (
        <g className='x-axis'
            transform={`translate(0, ${height})`}>
            <defs>
                <ClipPath
                    id={"xaxis"}
                    x={x}
                    y={-40}
                    width={width}
                    height={10}/>
            </defs>   
            <line
                className="x-axis-line"
                x1={x + xScale.step()*scalePadding}
                x2={width}/>
            <g clipPath='url(#xaxis)'>
                {xScale.domain().map((d) => (
                    <g key={`x-axis-${d}`}>
                        <text
                            key={`x-axis-text-${d}`}
                            className="x-axis-text"
                            transform={`translate(${xScale(d)}, -20)`}
                            style=
                            {{
                                fill : (d === selected && "black"),
                                fontWeight : (d === selected && "bold")
                            }}>
                                {d.toUpperCase()}
                        </text>
                        <circle
                            className='x-axis-circle'
                            key={`x-axis-circle-${d}`}
                            r={3}
                            transform={`translate(${xScale(d)}, 0)`}
                            style=
                            {{
                                fill : (d === selected && "black")
                            }}>
                        </circle>
                    </g>
                ))}
            </g>
        </g>

    )
}

export default TimelineXAxis