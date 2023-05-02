import { useContext } from "react"

import { AppContext } from '@core/context/AppContext'

import { PanelSidebar, NavSidebar, EntityDetail } from '@components/layout'

/**
 * Page component for default page
 * @memberof Features.Pages
 * @return {JSX.Element} JSX Element to be rendered.
 */
const DefaultPage = ({ children }) => {
    const appContext = useContext(AppContext)

    const navbarWidth = 100;
    const panelWidth = 360;

    const styles = {
        pageContainer: {
            marginRight: (appContext.panelSidebarOpen ? panelWidth : 0),
            marginLeft: navbarWidth,
            transition: 'margin-right 450ms cubic-bezier(0.23, 1, 0.32, 1)'
        },
        pageContent: {
            paddingInline: '48px',
            paddingBlock: '24px',
            margin: '0 auto',
            width: 'auto',
            verticalAlign: 'middle',
            alignItems: 'center'
        }
    }

    const panelTabs = [
        {
            name: "Detail",
            content: appContext.selectedEntity ? <EntityDetail entity={appContext.selectedEntity}/> : <></>
        }
    ]
    return (
        <div 
            className='page-container'
            style={styles.pageContainer}>
            <div
                className='page-content'
                style={styles.pageContent}>
                    <PanelSidebar
                        tabs={panelTabs}
                        width={panelWidth}
                        open={appContext.panelSidebarOpen}/>
                    <NavSidebar
                        width={navbarWidth}/>
                    {children}
            </div>
        </div>
    )
}

export default DefaultPage