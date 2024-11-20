import { createContext, useContext, useEffect, useState } from "react";
import useAxiosAPI from "../axiosAPI";
import { formatTime } from "../HelperFunctions";

const TOKEN_NAME = "authToken";
const UserContext = createContext(null);

function UserContextProvider({ children }) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [_id, set_id] = useState(null);
    const { getUser } = useAxiosAPI();
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
        const token = getToken();
        const { data, success } = token ? await getUser("/verify", token) : { success: false };
        if (token && success) {
            logToken(data);

            setUsername(data.username);
            setEmail(data.email);
            setPassword(data.password);
            set_id(data._id);

            setIsLoggedIn(true);
            console.log("AUTH", "logged in:", data.username);
        } else {
            removeToken();

            setUsername("");
            setEmail("");
            setPassword("");
            set_id(null);

            setIsLoggedIn(false);
            console.log("AUTH", "not logged in!");
        }
    }

    function logToken(data) {
        const issuedAt = new Date(data.iat * 1000);
        const expiresAt = new Date(data.exp * 1000);
        const currentTime = Math.floor(Date.now() / 1000);
        const remainingLifetime = data.exp - currentTime;
        console.log("TOKEN", "remaining lifetime:", formatTime(remainingLifetime), "created:", issuedAt, "expires:", expiresAt);
    }

    const exporting = { username, setUsername, email, setEmail, password, setPassword, _id, isLoggedIn, storeToken, getToken, authenticateUser, logoutUser };

    return (
        <UserContext.Provider value={exporting}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;

export const useUserContext = () => useContext(UserContext);

