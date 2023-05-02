import { useId } from 'react'
import * as d3 from 'd3'

import { useD3 } from '@core/hooks'

import { LinearGradient } from '@components/visualisation/defs'

import "./TimelineLink.scss"

/**
 * The Timeline Link component
 * 
 * ### Tags
 * @version 0.0.1
 * @component
 * @memberof Visualisation.Timeline
 * @type {React.Component}
 * @param {xScale} xScale Scale function of X axis
 * @param {yScale} yScale Scale function of Y axis
 * @param {Link} link The link object
 * @param {number} strokeWidth Stroke width of the link
 * 
 * @returns {React.ReactSVGElement} Returns the React component
 */
const TimelineLink = ({ link, xScale, yScale, data, strokeWidth }) => {
  // For referencing the gradient
  const id = useId()

  const source = data.find((d) => d.id === link.source)
  const target = data.find((d) => d.id === link.target)

  // Construct the horizontal path curve
  const curve = d3.linkHorizontal()
    .x(d => xScale(data.find((o) => o.id === d).semester))
    .y(d => yScale(data.find((o) => o.id === d).label))

  const ref = useD3((g) => {
    g.datum(link)
  }, [link])

  return (
    <>
      {source.group !== target.group &&
        <defs>
          <LinearGradient
            id={`gradient-${link.source}-${link.target}-${id}`}
            x1={xScale(source.semester)}
            x2={xScale(target.semester)}
            y1={yScale(source.label)}
            y2={yScale(target.label)}
            startColor={source.color}
            endColor={target.color} />
        </defs>}
      <g
        className='timeline-link'>
        <path
          className='timeline-link-background'
          strokeWidth={strokeWidth + strokeWidth/3}
          d={curve(link)}>
        </path>
        <path
          ref={ref}
          id={`timeline-link-${link.source}-${link.target}`}
          className='timeline-link-path'
          d={curve(link)}
          strokeWidth={strokeWidth}
          stroke={(source.group === target.group ? source.color
            : `url(#gradient-${link.source}-${link.target}-${id})`)}>
        </path>
      </g>
    </>
  )
}

export default TimelineLink