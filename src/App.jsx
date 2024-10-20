import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import SidePanel from "./components/SidePanel";
import Board from "./pages/Board";
import CreateNewForm from "./pages/CreateNewForm";
import ErrorPage from "./pages/ErrorPage";

function App() {
    const [showSide, setShowSide] = useState(false);

    function toggleShowSide() {
        setShowSide(!showSide);
    }

    return (
        <div className="App relative z-20 pt-20 h-full">
            <Navbar click1={toggleShowSide} />
            {showSide && <SidePanel />}
            <Routes>
                <Route path="/" element={<Board />} />
                <Route path="/create/" element={<CreateNewForm />} />
                
                <Route path="/error/:errorId" element={<ErrorPage />} />
                <Route path="*" element={<Navigate to="/error/404" />} />
            </Routes>
        </div>
    );
}

export default App;
