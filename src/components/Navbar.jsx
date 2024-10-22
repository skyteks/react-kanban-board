import logo from "./../assets/logo-ironhack-blue.png";
import { Link } from "react-router-dom";

function Navbar({ click1 }) {
    return (
        <nav>
            <Link to="/" style={{ height: "100%", minHeigh: "20px" }}>
                <img src={logo} alt="Logo" style={{ height: "100%" }} />
            </Link>

            <h1>React Kanban-Board</h1>

            <button onClick={click1} style={{ height: "100%", display: "flex", backgroundColor: "transparent", border: "none" }}>
                <img
                    src={"https://banner2.cleanpng.com/20180628/zaz/aayj9bx5v.webp"} alt="burger menu"
                    style={{ height: "100%", minHeigh: "20px", borderRadius: "50%" }}
                />
            </button>
        </nav>
    );
}

export default Navbar;
