import * as d3 from "d3"
import { useEffect, useState } from "react"
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

import { HierarchyGroups, HierarchyLevels } from '@core/utils/acredationUtils';
import { AcredationService } from "@core/services";

import { GraphContainer } from '@components/containers';
import { Header } from "@components/layout";
import { CirclePackingGraph } from "@components/visualisation/CirclePacking"

/**
 * Page component for the entity acredations visualization.
 * @memberof Features.Pages
 * @return {JSX.Element} JSX Element to be rendered.
 */
const AcredationsPage = () => {
    const [title, setTitle] = useState("Studium")
    const [subtitle, setSubtitle] = useState("")
    const [data, setData] = useState(null)

    useEffect(() => {
        AcredationService.getAcredations()
            .then(res => {
                setData(res)
            })
            .catch(err => { console.log(err) })
    }, [])

    const onNodeSelectedHandler = (e) => {
        var d = e.target.__data__
        setSubtitle(HierarchyLevels[d.depth])
        setTitle(d.data.name)
    }

    return (
        <>
            <Header
                title={title}
                subtitle={subtitle}>
            </Header>
            <GraphContainer data={data}>
                <CirclePackingGraph
                    data={data}
                    levels={HierarchyLevels}
                    groups={HierarchyGroups}
                    parentLabel
                    colorSchemes={[d3.schemeSet3.slice(4), d3.schemeSet2, d3.schemePaired, d3.schemeSet2]}
                    onSelectNode={onNodeSelectedHandler} />
                <Alert
                    severity="info" sx={{ position: "absolute", top: 16, left: 16 }}>
                    <AlertTitle><strong>Vizualizace</strong></AlertTitle>
                    Přehled studia zobrazuje programy, specializace,<br/>
                    studijní plány a předměty specializace v hierarchii.
                </Alert>
            </GraphContainer>
        </>
    )
}

export default AcredationsPage