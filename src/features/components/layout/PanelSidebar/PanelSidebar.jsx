import { useState } from "react"
import PropTypes from 'prop-types'
import Drawer from '@mui/material/Drawer';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Divider } from "@mui/material";

import { TabContainer } from '@components/containers';

const uuid = require('react-uuid')

/**
 * Sidebar component for entities
 * 
 * @memberof Features.Components.Layouts
 * @param {Object} props - The props object for the component.
 * @param {Array} [props.tabs] - Array of tabs on panel
 * @param {number} [props.width] - The width of the panel in pixels.
 * @param {boolean} [props.open] - Whether the panel is open
 * 
 * @returns {JSX.Element} - The JSX element representing the navigation sidebar.
 */
const PanelSidebar = ({ tabs, open, width }) => {
  const [value, setValue] = useState(0);

  const styles = {
    drawer: {
      width: width,
      flexShrink: 0,
      '& .MuiDrawer-paper': {
        width: width,
      },
    }
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function allyProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  return (
    <div
      className='panel-sidebar'>
      <Drawer
        sx={styles.drawer}
        variant="persistent"
        anchor="right"
        open={open}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="fullWidth">
          {tabs?.map((tab, index) =>
            <Tab
              key={uuid()}
              label={tab?.name}
              {...allyProps(index)}
            />
          )}
        </Tabs>
        <Divider/>
        {tabs?.map((tab, index) =>
          <TabContainer
            key={uuid()}
            value={value}
            index={index}>
              {tab?.content}
          </TabContainer>
        )}
      </Drawer>
    </div>
  )
}

PanelSidebar.propTypes = {
  tabs: PropTypes.array,
  open: PropTypes.bool,
  width: PropTypes.number
}

PanelSidebar.defaultProps = {
  tabs: [],
  open: false,
  width: 400
}

export default PanelSidebar
