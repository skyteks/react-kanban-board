import { createContext, useContext, useEffect, useState } from "react";
import useAxiosAPI from "../axiosAPI";

const TOKEN_NAME = "authToken";
const UserContext = createContext(null);

function UserContextProvider({ children }) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { getData } = useAxiosAPI();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        authenticateUser();
    }, []);

    function storeToken(token) {
        console.log("TOKEN added");
        localStorage.setItem(TOKEN_NAME, token);
    }

    function getToken() {
        return localStorage.getItem(TOKEN_NAME);
    }

    function removeToken() {
        if (!getToken()) {
            return;
        }
        console.log("TOKEN removed");
        localStorage.removeItem(TOKEN_NAME);
    }

    function logoutUser() {
        removeToken();
        authenticateUser();
    }

    async function authenticateUser() {
        const storedToken = getToken();

        function handleResponseData(data) {
            logTokenPayload(data);

            setUsername(data.username);
            setEmail(data.email);
            setPassword(data.password);
        }

        if (storedToken && await getData("/verify", storedToken, handleResponseData)) {
            setIsLoggedIn(true);
        } else {
            setUsername("");
            setEmail("");
            setPassword("");

            setIsLoggedIn(false);
        }
    }

    const exporting = { username, setUsername, email, setEmail, password, setPassword, isLoggedIn, storeToken, authenticateUser, logoutUser };

    return (
        <UserContext.Provider value={exporting}>
            {children}
        </UserContext.Provider>
    )
}

function logTokenPayload(payload) {
    const issuedAt = new Date(payload.iat * 1000);
    const expiresAt = new Date(payload.exp * 1000);
    const currentTime = Math.floor(Date.now() / 1000);
    const remainingLifetime = payload.exp - currentTime;
    console.log("TOKEN", "remaining lifetime:", formatTime(remainingLifetime), "created:", issuedAt, "expires:", expiresAt);
}

function formatTime(seconds) {
    const hrs = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const mins = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${hrs}:${mins}:${secs}`;
}

export default UserContextProvider;

export const useUserContext = () => useContext(UserContext);

