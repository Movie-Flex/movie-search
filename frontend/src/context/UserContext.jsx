import { createContext, useState } from "react";
export const UserContext = createContext("");

const UserContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(
        localStorage.getItem("userData") ? true : false
    );
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("userData"))?JSON.parse(localStorage.getItem("userData")):{}
    );
    const [token,setToken]=useState(
        JSON.parse(JSON.stringify(localStorage.getItem("token")))?JSON.parse(JSON.stringify(localStorage.getItem("token"))):""
    )

    const [extraUserData,setExtraUserData]=useState(
        JSON.parse(JSON.stringify(localStorage.getItem("extraUserData")))?JSON.parse(JSON.stringify(localStorage.getItem("extraUserData"))):{}
    )

    const [paymentGatewaySendingData,setPaymentGatewaySendingData]=useState({
        dur:"",
        type:"",
    })

    const [paymentGatewayReceivingData,setPaymentGatewayReceivingData]=useState(
        JSON.parse(JSON.stringify(localStorage.getItem("paymentGatewayReceivingData")))
    )


    return (
        <UserContext.Provider
            value={{
                isLoggedIn,
                setIsLoggedIn,
                user,
                setUser,
                extraUserData,
                setExtraUserData,
                token,
                setToken,
                paymentGatewaySendingData,
                setPaymentGatewaySendingData,
                paymentGatewayReceivingData,
                setPaymentGatewayReceivingData

            }}
        >
            {props.children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;