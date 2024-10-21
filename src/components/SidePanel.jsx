import { NavLink } from "react-router-dom";

function SidePanel() {

    return (
        <div className="bg-blue-600 text-white shadow-md fixed top-20 right-0 z-40" style={{ width: "200px", height: "100%" }}>
            <ol style={{ margin: "20px" }}>
                <li><NavLink to={"/"} className="text-white">Board</NavLink></li>
                <li><NavLink to={"/create"} className="text-white">Create New</NavLink></li>
            </ol>
        </div>
    );
}

export default SidePanel;