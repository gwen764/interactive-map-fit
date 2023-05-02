import { useContext } from "react";
import PropTypes from 'prop-types'
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import SchoolIcon from '@mui/icons-material/School';
import HubIcon from '@mui/icons-material/Hub';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import HomeIcon from '@mui/icons-material/Home';

import { acredationsRoute, mapRoute, topicsRoute } from "@core/utils/routesUtils"
import { SemesterContext } from "@core/context/SemesterContext"

import { IconTextButton } from '@components/buttons'

const uuid = require('react-uuid')


/**
 * A navigation sidebar component that displays a list of links with icons.
 * 
 * @memberof Features.Components.Layouts
 * @param {Object} props - The props object for the component.
 * @param {number} [props.width=200] - The width of the sidebar (in pixels).
 * 
 * @returns {JSX.Element} - The JSX element representing the navigation sidebar.
 */
const NavSidebar = ({ width }) => {
    const semesterContext = useContext(SemesterContext)

    const styles = {
        drawer: {
            width: width,
            flexShrink: 0,
            display: "flex",
            '& .MuiDrawer-paper': {
                width: width,
                boxSizing: 'border-box',
                backgroundColor: "#01204e",
            },
        },
        list: {
            paddingTop: 6
        }
    }

    const drawerItems = [
        {
            icon: <HomeIcon/>,
            title: "Domů",
            link: "/"
        },
        {
            icon: <SchoolIcon/>,
            title: "Studium",
            link: acredationsRoute()
        },
        {
            icon: <BookmarksIcon/>,
            title: "Témata",
            link: topicsRoute()
        },
        {
            icon: <HubIcon/>,
            title: "Entity",
            link: mapRoute(semesterContext.semester)
        },
    ]
    return (
        <Drawer
            variant="permanent"
            anchor="left"
            sx={styles.drawer}>
                <List sx={styles.list}>
                {drawerItems.map((item) => 
                    <IconTextButton
                        key={uuid()}
                        text={item.title}
                        link={item.link}
                        icon={item.icon}/>)}
                </List>
        </Drawer>
  )
}

NavSidebar.propTypes = {
    width: PropTypes.number
}

NavSidebar.defaultProps = {
    width: 200
}

export default NavSidebar
