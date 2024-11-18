import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import SidePanel from "./components/SidePanel";
import Board from "./pages/Board";
import CreateNewForm from "./pages/CreateNewForm";
import ErrorPage from "./pages/ErrorPage";
import AboutPage from "./pages/AboutPage";
import RegistrationForm from "./pages/RegistrationForm";
import LoginForm from "./pages/LoginForm";
import IsAnon from "./context/IsAnon"
import IsPrivate from "./context/IsPrivate"

function App() {
    const [showSide, setShowSide] = useState(false);

    function toggleShowSide() {
        setShowSide(!showSide);
    }

    return (
        <div className="app">
            <Navbar click1={toggleShowSide} />
            <SidePanel doClick={toggleShowSide} visible={showSide} />
            <Routes>
                <Route path="/" element={<Board />} />
                <Route path="/create" element={<IsPrivate><CreateNewForm /></IsPrivate>} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/register" element={<IsAnon> <RegistrationForm /></IsAnon>} />
                <Route path="/login" element={<IsAnon><LoginForm /></IsAnon>} />
                <Route path="/login/:username" element={<IsAnon><LoginForm /></IsAnon>} />

                <Route path="/error/:errorId" element={<ErrorPage />} />
                <Route path="*" element={<Navigate to="/error/404" />} />
            </Routes>
        </div>
    );
}

export default App;
