import "./App.css";
import Navbar from "./components/Navbar";
import MainMenu from "./pages/MainMenu";

import { Routes, Route } from "react-router-dom";
import { useState } from "react";


function App() {

    return (
        <div className="App relative z-20 pt-20">
            <Navbar />

            <Routes>
                <Route path="/" element={<MainMenu />} />
            </Routes>

        </div>
    );
}

export default App;
