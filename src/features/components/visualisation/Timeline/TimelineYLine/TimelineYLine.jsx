import { useD3 } from '@core/hooks';

import "./TimelineYLine.scss"

/**
 * The Timeline Y Line component
 * 
 * ### Tags
 * @version 0.0.1
 * @component
 * @memberof Visualisation.Timeline
 * @type {React.Component}
 * @param {function} xScale Scale function of X axis
 * @param {number} y1 The starting Y position
 * @param {number} y1 The ending Y position
 * @param {number} value The value of the X domain
 * @param {boolean} selected Whether is the line selected
 * 
 * @returns {React.ReactSVGElement} Returns the React component
 */
const TimelineYLine = ({ xScale, y1, y2, value, selected }) => {
  const ref = useD3((g) => {
    g.classed('selected-y', selected)
  }, [])

  return (
    <line
      ref={ref}
      className={`timeline-y-line`}
      y1={y1}
      y2={y2}
      transform={`translate(${xScale(value)}, 0)`}>
    </line>
  )
}

export default TimelineYLine