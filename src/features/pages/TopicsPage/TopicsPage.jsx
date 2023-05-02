import { useEffect, useState } from "react"
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import PanToolIcon from '@mui/icons-material/PanTool';

import { TopicService } from "@core/services";

import { NetworkClusterGraph } from "@components/visualisation/NetworkCluster"
import { GraphContainer, GraphElementContainer } from '@components/containers';
import { Header, NetworkClusterPanel } from "@components/layout";
import { IconToggleButton } from "@components/buttons";

/**
 * Page component for the topic course visualization.
 * @memberof Features.Pages
 * @return {JSX.Element} JSX Element to be rendered.
 */
const TopicsPage = () => {
    const [data, setData] = useState(null)

    const [activeLabels, setActiveLabels] = useState(false)
    const [activeClusters, setActiveClusters] = useState(true)
    const [activeDrag, setActiveDrag] = useState(true)

    useEffect(() => {
        TopicService.getTopics()
            .then(res => {
                setData(res)
            })
            .catch(err => { console.log(err) })
    }, [])

    return (
        <>
            <Header
                title={"Tématické okruhy"} />
            <GraphContainer data={data}>
                <NetworkClusterGraph
                    data={data}
                    legend
                    drag={activeDrag}
                    linkLabels={activeLabels}
                    clusters={activeClusters} />
                <GraphElementContainer
                    position={{ top: 0, left: 0 }}>
                    {/* <NetworkClusterPanel
                        data={data}
                        width={400}
                        height={600}
                        activeClusters={activeClusters}
                        setActiveClusters={setActiveClusters} /> */}
                </GraphElementContainer>
                <GraphElementContainer
                    direction="column"
                    position={{ top: 0, right: 0 }}>
                    <IconToggleButton
                        label={`${!activeClusters ? "Zobrazit" : "Skrýt"} shluky`}
                        icon={<AutoAwesomeIcon />}
                        setSelectedFunc={setActiveClusters} />
                    <IconToggleButton
                        label={`${!activeLabels ? "Zobrazit" : "Skrýt"} popisky relací`}
                        icon={<TextFieldsIcon />}
                        setSelectedFunc={setActiveLabels} />
                    <IconToggleButton
                        label={`${!activeDrag ? "Zapnout" : "Vypnout"} pohyb vrcholů`}
                        icon={<PanToolIcon />}
                        setSelectedFunc={setActiveDrag} />
                </GraphElementContainer>
                <Alert
                    severity="info" sx={{ position: "absolute", top: 16, right: 80 }}>
                    <AlertTitle><strong>Vizualizace</strong></AlertTitle>
                    Síťový graf zobrazuje souvislosti mezi tématy.<br />
                    Hrana mezi vrcholy znamená, že tyto dvě témata <br />
                    sdílí alespoň jednu společnou hodnotu - předmět.
                </Alert>
            </GraphContainer>
        </>
    )
}

export default TopicsPage