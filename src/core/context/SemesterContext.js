import { useState, useEffect, createContext } from "react"

import { SemesterService } from "@core/services"

// Provides simple context for the app and keeping global state
export const SemesterContext = createContext(null)

export const SemesterContextProvider = ({ children }) => {
    const [semester, setSemester] = useState(null)
    const [allSemesters, setAllSemesters] = useState([])

    useEffect(() => {
        getSemesters()
    }, [])

    const getSemesters = () => {
        SemesterService.getSemesters()
        .then(res => { 
            let current = res.data ? res.data[0] : null
            if(!semester) {
                setSemester(current)
            }
            setAllSemesters(res.data)
         })
        .catch(err => { console.log(err) })
    }

    const value = {
        semester,
        setSemester,
        allSemesters,
        setAllSemesters
    }
    return (
        <SemesterContext.Provider value={value}>
            {children}
        </SemesterContext.Provider>
    )
}