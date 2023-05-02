import { useContext, useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import ImageIcon from '@mui/icons-material/Image';

import { AppContext } from "@core/context/AppContext";
import { SemesterContext } from '@core/context/SemesterContext';
import { EntityTypes, EntityIcons, RelationTypes } from "@core/utils/mapUtils";
import { mapRoute } from "@core/utils/routesUtils"
import { MapService } from '@core/services'

import { KnowledgeGraph } from "@components/visualisation/Knowledge";
import { IconToggleButton } from "@components/buttons";
import { EntityGroupSearch, BasicSelect } from '@components/forms';
import { GraphContainer } from '@components/containers';
import { Header, EntityFilterBar } from "@components/layout";
import { GraphElementContainer } from "features/components/containers";

const styles = {
    header: {
        columnGap: "8px",
        justifyContent: "space-between",
        textAlign: "right",
        display: "flex"
    }
}

/**
 * Page component for the map visualization.
 * @memberof Features.Pages
 * @return {JSX.Element} JSX Element to be rendered.
 */
const MapPage = () => {
    let { semester, id } = useParams()
    let navigate = useNavigate()

    const [data, setData] = useState(null)
    const [updatedData, setUpdatedData] = useState(null)

    const [types, setTypes] = useState(Object.keys(EntityTypes))
    const [activeIcons, setActiveIcons] = useState(true)
    const [activeLabels, setActiveLabels] = useState(false)

    const semesterContext = useContext(SemesterContext)
    const appContext = useContext(AppContext)

    const selectedNodePanel = appContext.selectedNode

    const onSelectChangeHandler = (e) => {
        const route = mapRoute(e.target.value);
        navigate(route)
    }

    const onSearchChangeHandler = (e, item) => {
        if (item) appContext.setSelectedNode(item.id)
    }

    const onSelectNodeHandler = (e) => {
        var d = e.target.__data__
        appContext.setSelectedNode(d.id)
    }

    useEffect(() => {
        semesterContext.setSemester(semester)

        MapService.getMapSemester(semester)
            .then(res => {
                setData(res)
            })
            .catch(err => { console.log(err) })
    }, [semester, id])

    return (
        <>
            <Header
                title={`Znalostní mapa`}
                subtitle={`Semestr ${semester.toUpperCase()}`}>
                <div style={styles.header}>
                    <BasicSelect
                        label={'Semestr'}
                        selected={semester}
                        onChange={onSelectChangeHandler}
                        values={semesterContext.allSemesters} />
                    {updatedData &&
                        <EntityGroupSearch
                            width={400}
                            label={"Hledat entitu"}
                            selected={updatedData.nodes.find(d => d.id.toString() === id)}
                            onChange={onSearchChangeHandler}
                            values={updatedData.nodes} />}
                </div>
            </Header>
            <GraphContainer data={data}>
                <KnowledgeGraph
                    data={data}
                    types={types}
                    relations={RelationTypes}
                    icons={activeIcons ? EntityIcons : undefined}
                    nodeStrength={-2000}
                    collideRadius={40}
                    linkDistance={250}
                    linkLabels={activeLabels}
                    autoZoom
                    oriented
                    setData={setUpdatedData}
                    onSelectNode={onSelectNodeHandler}
                    selected={selectedNodePanel} />
                <GraphElementContainer
                    position={{ top: 0, right: 0 }}>
                    <IconToggleButton
                        label={`${!activeLabels ? "Zobrazit" : "Skrýt"} popisky relací`}
                        icon={<TextFieldsIcon />}
                        selected={activeLabels}
                        setSelectedFunc={setActiveLabels} />
                    <IconToggleButton
                        label={`${!activeIcons ? "Zobrazit" : "Skrýt"} ikony`}
                        icon={<ImageIcon />}
                        selected={activeIcons}
                        setSelectedFunc={setActiveIcons} />
                </GraphElementContainer>
                <GraphElementContainer
                    position={{ top: 0, left: 0 }}>
                    <EntityFilterBar
                        types={Object.keys(EntityTypes)}
                        data={updatedData}
                        setTypes={setTypes} />
                </GraphElementContainer>
                <Alert
                    severity="info" sx={{ position: "absolute", top: 64, left: 16 }}>
                    <AlertTitle><strong>Vizualizace</strong></AlertTitle>
                    Znalostní graf zobrazuje entity v semestru.
                    <br />
                    Relace a entity jsou rozděleny podle jejich typu.
                </Alert>
            </GraphContainer>
        </>
    )
}

export default MapPage