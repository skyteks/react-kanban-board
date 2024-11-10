import { createContext, useContext, useState } from "react";

const UserContext = createContext(null);

function UserContextProvider({ children }) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    return (
        <UserContext.Provider value={{ username, setUsername, email, setEmail, password, setPassword }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;

export const useUserContext = () => useContext(UserContext);

