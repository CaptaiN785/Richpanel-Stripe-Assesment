import { useState } from "react";
import { createContext } from "react";



export const AppContext = createContext()

export const AppContextProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [plans, setPlans] = useState([]);
    const [activePlan, setActivePlan] = useState(null);
    const [token, setToken] = useState(null);

    const value = {
        user,
        setUser,
        plans,
        setPlans,
        activePlan,
        setActivePlan,
        token,
        setToken
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>    
    )

}