import { Navigate } from "react-router-dom";
import { useUserContext } from "./UserContextProvider";

function IsAnon({ children }) {

    const { isLoggedIn } = useUserContext();

    if (isLoggedIn) {
        return <Navigate to="/" />;
    } else {
        return children;
    }
}

export default IsAnon;