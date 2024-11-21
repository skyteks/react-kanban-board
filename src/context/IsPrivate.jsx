import { Navigate } from "react-router-dom";
import { useUserContext } from "./UserContextProvider";

function IsPrivate({ children }) {

    const { isLoggedIn } = useUserContext();

    if (!isLoggedIn) {
        return <Navigate to="/login" />;
    } else {
        return children;
    }
}

export default IsPrivate;