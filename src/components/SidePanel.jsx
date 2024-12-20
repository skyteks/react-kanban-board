import { NavLink } from "react-router-dom";
import { useUserContext } from "../context/UserContextProvider";
import "./SidePanel.css"

function SidePanel({ doClick, hide }) {
    const style = hide ? null : { display: "none" };
    const { isLoggedIn, logoutUser, username } = useUserContext();

    return (
        <div className="side-panel" style={style} >
            <NavLink onClick={doClick} to={"/"}>Board</NavLink>
            <NavLink onClick={doClick} to={"/create"}>Create new Note</NavLink>
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