import { NavLink } from "react-router-dom";

function SidePanel({ doClick, visible }) {

    const style = visible ? null : { display: "none" };
    return (
        <div className="side-panel" style={style} >
            <NavLink onClick={doClick} to={"/"}>Board</NavLink>
            <NavLink onClick={doClick} to={"/create"}>Create New</NavLink>
            <NavLink onClick={doClick} to={"/about"}>About Page</NavLink>
            <NavLink onClick={doClick} to={"/register"}>Register</NavLink>
            <NavLink onClick={doClick} to={"/login"}>Login</NavLink>
        </div>
    );
}

export default SidePanel;