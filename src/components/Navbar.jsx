import { useThemeContext } from "../context/ThemeContextProvider";
import logo from "./../assets/logo-ironhack-blue.png";
import { Link } from "react-router-dom";
import dark from "../assets/dark.png";
import light from "../assets/light.png";

function Navbar({ click1 }) {

    const { theme, setTheme } = useThemeContext();

    function handleThemeToggle(e) {
        setTheme(!theme);
    }

    return (
        <nav>
            <Link to="/" style={{ height: "100%", minHeigh: "20px" }}>
                <img src={logo} alt="Logo" style={{ height: "100%" }} />
            </Link>

            <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                <h1>React Kanban-Board</h1>
                <p style={{ fontSize: "11px" }}>(uses Drag & Drop)</p>
            </div>

            <div style={{ height: "100%", display: "flex" }}>
                <button onClick={handleThemeToggle} style={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "white", border: "none", borderRadius: "50%" }}>
                    <img
                        src={theme ? light : dark} alt="theme toggle"
                        style={{ height: "90%", minHeigh: "20px", borderRadius: "50%" }}
                    />
                </button>
                <button onClick={click1} style={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "transparent", border: "none", borderRadius: "50%" }}>
                    <img
                        src={"https://banner2.cleanpng.com/20180628/zaz/aayj9bx5v.webp"} alt="burger menu"
                        style={{ height: "90%", minHeigh: "20px", borderRadius: "50%" }}
                    />
                </button>
            </div>
        </nav>
    );
}

export default Navbar;
