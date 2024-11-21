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
import IsAnon from "./context/IsAnon";
import IsPrivate from "./context/IsPrivate";
import HelloPage from "./pages/HelloPage";

function App() {
    const [showSide, setShowSide] = useState(false);

    function toggleShowSide() {
        setShowSide(!showSide);
    }

    return (
        <div className="app">
            <Navbar doClick1={toggleShowSide} />
            <SidePanel doClick={toggleShowSide} hide={!showSide} />
            <Routes>
                <Route path="/" element={<Board />} />
                <Route path="/create" element={<IsPrivate><CreateNewForm /></IsPrivate>} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/hello" element={<HelloPage />} />
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
