import { useThemeContext } from "../context/ThemeContextProvider";
import logo from "./../assets/logo-ironhack-blue.png";
import { Link } from "react-router-dom";
import darkIcon from "../assets/dark.png";
import lightIcon from "../assets/light.png";

function Navbar({ click1 }) {

    const { toggleTheme, isDark } = useThemeContext();

    function handleThemeToggle(e) {
        toggleTheme();
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
                <button onClick={handleThemeToggle} style={{ aspectRatio: "1/1", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "white", borderRadius: "50%" }}>
                    <img
                        src={isDark ? lightIcon : darkIcon} alt="theme toggle"
                        style={{ height: "100%", borderRadius: "50%" }}
                    />
                </button>
                <button onClick={click1} style={{ aspectRatio: "1/1", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "transparent", borderRadius: "50%" }}>
                    <img
                        src={"https://banner2.cleanpng.com/20180628/zaz/aayj9bx5v.webp"} alt="burger menu"
                        style={{ height: "105%", borderRadius: "50%" }}
                    />
                </button>
            </div>
        </nav>
    );
}

export default Navbar;
