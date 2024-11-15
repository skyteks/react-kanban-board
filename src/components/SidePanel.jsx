import { NavLink } from "react-router-dom";
import { useUserContext } from "../context/UserContextProvider";

function SidePanel({ doClick, visible }) {
    const style = visible ? null : { display: "none" };
    const { isLoggedIn, logoutUser, username } = useUserContext();

    return (
        <div className="side-panel" style={style} >
            <NavLink onClick={doClick} to={"/"}>Board</NavLink>
            <NavLink onClick={doClick} to={"/create"}>Create New</NavLink>
            <NavLink onClick={doClick} to={"/about"}>About Page</NavLink>
            {
                isLoggedIn ? (
                    <div>
                        <button onClick={logoutUser}>Logout</button>
                        <span>{" " + username}</span>
                    </div>
                ) : (
                    <>
                        <NavLink onClick={doClick} to={"/login"}>Login</NavLink>
                        <NavLink onClick={doClick} to={"/register"}>Register</NavLink>
                    </>
                )
            }
        </div>
    );
}

export default SidePanel;