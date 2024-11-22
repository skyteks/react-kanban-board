import { useThemeContext } from "../context/ThemeContextProvider";
import logoIcon from "./../assets/logo-ironhack-blue.png";
import { Link } from "react-router-dom";
import darkIcon from "../assets/dark.png";
import lightIcon from "../assets/light.png";
import "./Navbar.css";
import burgerIcon from "../assets/burger.png";

function Navbar({ doClick1 }) {
    const { isDark, toggleTheme } = useThemeContext();

    function handleThemeToggle(_e) {
        toggleTheme();
    }

    return (
        <nav>
            <Link className="navbar-logo" to="/" >
                <img src={logoIcon} alt="Logo" />
            </Link>

            <div className="navbar-title">
                <h1>React Kanban-Board</h1>
                <p>(uses Drag & Drop)</p>
            </div>

            <div className="navbar-actions">
                <button className="theme-toggle-btn" onClick={handleThemeToggle} >
                    <img src={isDark ? lightIcon : darkIcon} alt="theme toggle" />
                </button>
                <button className="burger-btn" onClick={doClick1} >
                    <img src={burgerIcon} alt="burger menu" />
                </button>
            </div>
        </nav>
    );
}

export default Navbar;
