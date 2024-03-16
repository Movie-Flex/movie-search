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
        localStorage.getItem("token")?localStorage.getItem("token"):""
    )
    return (
        <UserContext.Provider
            value={{
                isLoggedIn,
                setIsLoggedIn,
                user,
                setUser,
                token,
                setToken
            }}
        >
            {props.children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;