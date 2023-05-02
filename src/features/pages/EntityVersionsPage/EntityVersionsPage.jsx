import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

import { mapEntityVersionsRoute } from '@core/utils/routesUtils';
import { SemesterContext } from 'core/context/SemesterContext'
import { AppContext } from '@core/context/AppContext'
import { EntityService } from '@core/services'

import { TimelineGraph } from '@components/visualisation/Timeline'
import { GraphContainer, GraphElementContainer } from '@components/containers';
import { Header } from "@components/layout";
import { IconToggleButton } from "@components/buttons";

/**
 * Page component for the entity versions visualization.
 * @memberof Features.Pages
 * @return {JSX.Element} JSX Element to be rendered.
 */
const EntityVersionsPage = () => {
  let { semester, id } = useParams()
  let navigate = useNavigate()

  const [data, setData] = useState(null)
  const [activeGroups, setActiveGroups] = useState(true)

  const semesterContext = useContext(SemesterContext)
  const appContext = useContext(AppContext)

  useEffect(() => {
    appContext.setSelectedNode(Number(id))
    semesterContext.setSemester(semester)

    EntityService.getEntityVersions(semester, id)
      .then(res => {
        setData(res.data)
      })
      .catch(err => { console.log(err) })
  }, [semester, id])

  const onNodeSelectedHandler = (e) => {
    var d = e.target.__data__
    const route = mapEntityVersionsRoute(d.semester, d.id)
    navigate(route)
  }

  return (
    <>
      <Header
        title={`${data ? data.find(d => d.id.toString() === id).name : ""} - Verze`}
        subtitle={`Semestr ${semester.toUpperCase()}`} />
      <GraphContainer data={data}>
        <TimelineGraph
          data={data}
          margin={{ top: 150, right: 20, bottom: 20, left: 20 }}
          groups={activeGroups}
          scaleExtent={[1, 3]}
          onSelectNode={onNodeSelectedHandler}
          selected={appContext.selectedNode} />
        <GraphElementContainer
          position={{ top: 0, right: 0 }}>
            <IconToggleButton
              label={`${!activeGroups ? "Zobrazit" : "Skrýt"} skupiny`}
              icon={<AutoAwesomeIcon />}
              setSelectedFunc={setActiveGroups} />
        </GraphElementContainer>
        <Alert
          severity="info" sx={{ position: "absolute", top: 16, right: 72 }}>
          <AlertTitle><strong>Vizualizace</strong></AlertTitle>
          Verze předmětu zobrazují jeho vývoj v čase a vliv na ostatní předměty.
        </Alert>
      </GraphContainer>
    </>
  )
}

export default EntityVersionsPage