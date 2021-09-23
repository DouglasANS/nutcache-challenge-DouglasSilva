import React, { createContext, useState } from "react"

export const DataContext = createContext();

export default function DataProvider({ children }) {
    
    const [ attPage, setAttPage ] = useState(0)



    return (
            <DataContext.Provider value={{attPage, setAttPage }}>
                {children}
            </DataContext.Provider>
    )
}