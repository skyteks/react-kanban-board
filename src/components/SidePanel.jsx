import { NavLink } from "react-router-dom";

function SidePanel({doClick}) {

    return (
        <div className="bg-blue-600 text-white shadow-md fixed top-20 right-0 z-40" style={{ width: "200px", height: "100%" }}>
            <ol style={{ margin: "20px" }}>
                <li><NavLink onClick={doClick} to={"/"} className="text-white">Board</NavLink></li>
                <li><NavLink onClick={doClick} to={"/create"} className="text-white">Create New</NavLink></li>
            </ol>
        </div>
    );
}

export default SidePanel;