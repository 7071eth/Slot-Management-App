import { createContext } from "react";
import { useState } from "react";
export const SelectContext = createContext(null);

function Context ({children}) {

    const [modal,setModal] = useState(false);
    
    return (
        <SelectContext.Provider value={{modal,setModal}}>
            {children}
        </SelectContext.Provider>
    )
} 

export default Context;