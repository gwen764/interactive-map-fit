import { useState, useEffect, useContext, createContext } from "react"

import { EntityService } from "@core/services"
import { SemesterContext } from "@core/context/SemesterContext"

// Provides simple context for the app and keeping global state
export const AppContext = createContext(null)

export const AppContextProvider = ({ children }) => {
    const [panelSidebarOpen, setPanelSidebarOpen] = useState(false)
    const [selectedEntity, setSelectedEntity] = useState(null)
    const [selectedNode, setSelectedNode] = useState(null)

    const semesterContext = useContext(SemesterContext)

    useEffect(() => {
        if(!panelSidebarOpen && selectedEntity) {
            setPanelSidebarOpen(true)
        }
    }, [selectedEntity])

    useEffect(() => {
        if(selectedNode != null) {
            getEntity(semesterContext.semester, selectedNode)
        }
    }, [selectedNode])

    const getEntity = (semester, id) => {
        EntityService.getEntity(semester, id)
        .then(res => { 
            setSelectedEntity(res)  
        })
        .catch(err => { console.log(err) })
    }

    const value = {
        selectedEntity,
        setSelectedEntity,
        selectedNode,
        setSelectedNode,
        panelSidebarOpen
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}