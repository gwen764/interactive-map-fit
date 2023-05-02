import PropTypes from 'prop-types'
import { useContext } from 'react'
import { Link } from 'react-router-dom';
import { Divider, Button } from '@mui/material'
import HubIcon from '@mui/icons-material/Hub';
import HistoryIcon from '@mui/icons-material/History';

import { EntityTypes, LinkTypes, EntityColors } from '@core/utils/mapUtils';
import { SemesterContext } from '@core/context/SemesterContext';
import { AppContext } from '@core/context/AppContext';
import { mapEntityRoute, mapEntityVersionsRoute } from '@core/utils/routesUtils';

import { AvatarTextButton } from '@components/buttons';
import { ActiveChip, RectangleChip } from '@components/chips'

const uuid = require('react-uuid')

const styles = {
  entityDetail: {
    padding: '16px',
    textAlign: 'center',
    verticalAlign: 'middle',
    alignItems: 'center',
  },
  entityLinks: {
    display: 'flex',
    padding: '16px',
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  entityActionsTitle: {
    paddingTop: '16px',
    paddingBlock: '8px',
    textAlign: 'left',
  },
  entityActions: {
    paddingBlock: '8px',
    textAlign: 'left',
    display: 'flex',
    rowGap: '8px',
    columnGap: '16px',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  entityChips: {
    padding: '8px',
    display: 'flex',
    marginBottom: '8px',
    justifyContent: 'space-between'
  },
  entityTitle: {
    textAlign: 'left',
    display: 'flex',
    padding: '8px',
    justifyContent: 'space-between'
  }
}

/**
 * Component for an entity detail panel
 * 
 * @memberof Features.Components.Layouts
 * @param {Object} props - The props object.
 * @param {Object} [props.entity] - The entity object

 * @returns {JSX.Element}
 */
const EntityDetail = ({ entity }) => {
  const semesterContext = useContext(SemesterContext)
  const appContext = useContext(AppContext)

  const title = "label" in entity ? entity.label : entity.name
  const subtitle = "label" in entity ? entity.name : ""

  const actions = [
    {
      title: "Závislosti",
      link: mapEntityRoute(semesterContext.semester, appContext.selectedNode),
      icon: <HubIcon/>,
    },
    {
      title: "Verze",
      link: mapEntityVersionsRoute(semesterContext.semester, appContext.selectedNode),
      icon: <HistoryIcon/>
    }
  ]
  return (
    <div
      className='entity-detail'
      style={styles.entityDetail}>
      <div
        className='entity-header'>
        <div
          className='entity-title'
          style={styles.entityTitle}>
          <div
            className='entity-name'>
            <h2>{title}</h2>
            <h3>{subtitle}</h3>
          </div>
          <div
            className='entity-semester'>
            <h3>{semesterContext.semester.toUpperCase()}</h3>
          </div>
        </div>
        <div
          className='entity-chips'
          style={styles.entityChips}>
          <RectangleChip
            text={EntityTypes[entity.type]?.toUpperCase()}
            color={EntityColors[entity.type]?.default} />
          <ActiveChip
            active={entity.active} />
        </div>
      </div>
      <div
        className='entity-links'
        style={styles.entityLinks}>
        {entity.links?.map((link) =>
          <AvatarTextButton
            key={`link-${uuid()}`}
            text={LinkTypes[link.name]}
            link={link.ref} />
        )}
      </div>
      <Divider />
      <div
        className='entity-actions-title'
        style={styles.entityActionsTitle}>
        <h5>AKCE ENTITY</h5>
      </div>
      <div
        className='entity-actions'
        style={styles.entityActions}>
        {actions.map((action) =>
          <Button
            key={uuid()}
            component={Link}
            endIcon={action.icon}
            variant='contained'
            fullWidth
            to={action.link}>
            {action.title}
          </Button>
        )}
      </div>
    </div>
  )
}

EntityDetail.propTypes = {
  entity: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    type: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired,
    semester: PropTypes.string.isRequired,
    links: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      ref: PropTypes.string
    })),
    relations: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      type: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    })),
  })
}

export default EntityDetail
