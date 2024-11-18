import { createContext, useContext, useEffect, useState } from "react";
import useAxiosAPI from "../axiosAPI";
import { formatTime } from "../HelperFunctions";
import { data } from "autoprefixer";

const TOKEN_NAME = "authToken";
const UserContext = createContext(null);

function UserContextProvider({ children }) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { getAccount } = useAxiosAPI();
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
        function logTokenPayload(payload) {
            const issuedAt = new Date(payload.iat * 1000);
            const expiresAt = new Date(payload.exp * 1000);
            const currentTime = Math.floor(Date.now() / 1000);
            const remainingLifetime = payload.exp - currentTime;
            console.log("TOKEN", "remaining lifetime:", formatTime(remainingLifetime), "created:", issuedAt, "expires:", expiresAt);
        }

        function handleResponseData(data) {
            logTokenPayload(data);

            console.log("AUTH", "logged in:", data.username);

            setUsername(data.username);
            setEmail(data.email);
            setPassword(data.password);
        }

        const token = getToken();

        if (token && await getAccount("/verify", token, handleResponseData)) {
            setIsLoggedIn(true);
        } else {
            console.log("AUTH", "not logged in!");

            setUsername("");
            setEmail("");
            setPassword("");

            setIsLoggedIn(false);
        }
    }

    const exporting = { username, setUsername, email, setEmail, password, setPassword, isLoggedIn, storeToken, getToken, authenticateUser, logoutUser };

    return (
        <UserContext.Provider value={exporting}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;

export const useUserContext = () => useContext(UserContext);

