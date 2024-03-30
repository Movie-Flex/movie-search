import { createContext, useContext, useState } from "react";
import { UserContext } from "./UserContext";
export const CancelContext = createContext("");

const CancelContextProvider = (props) => {
    const { sideNav, setSideNav } = useContext(UserContext);
    const [cancelSubscriptionButton, setCancelSubscriptionButton] =
    useState(
      sideNav===3?true:false

    );
    


    return (
        <CancelContext.Provider
            value={{
                cancelSubscriptionButton,
                setCancelSubscriptionButton,
                

            }}
        >
            {props.children}
        </CancelContext.Provider>
    );
};

export default CancelContextProvider;