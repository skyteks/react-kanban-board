import { NavLink } from "react-router-dom";

function SidePanel({ doClick, display }) {

    const style = display ? null : { display: "none" };
    return (
        <div className="side-panel" style={style} >
            <NavLink onClick={doClick} to={"/"} className="text-white">Board</NavLink>
            <NavLink onClick={doClick} to={"/create"} className="text-white">Create New</NavLink>
        </div>
    );
}

export default SidePanel;