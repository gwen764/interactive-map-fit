import { useD3 } from '@core/hooks'

import "./KnowledgeLinkLabel.scss"

/**
 * The Knowledge Graph link label component
 * 
 * ### Tags
 * @version 0.0.1
 * @component
 * @memberof Visualisation.Knowledge
 * @type {React.Component}
 * @param {Link} link Link object
 * @param {number} id The id of the current svg canvas
 * @param {string} relation The relation text to be rendered on the link
 * @returns {React.ReactSVGElement} Returns the React component
 */
const KnowledgeLinkLabel = ({ link, id, relation }) => {
    const ref = useD3((g) => {
        g.datum(link)
    }, [link])

    return (
        <text
            className="knowledge-link-label"
            dy={-5}
            ref={ref}>
            <textPath
                xlinkHref={`#knowledge-link-${link.source.id}-${link.target.id}-${id}`}
                startOffset={"50%"}>
                {relation}
            </textPath>
        </text>
    )
}

export default KnowledgeLinkLabel