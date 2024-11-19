import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import ThemeContextProvider from "./context/ThemeContextProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <React.StrictMode>
        <ThemeContextProvider>
            <DndProvider backend={HTML5Backend}>
                <Router>
                    <App />
                </Router>
            </DndProvider>
        </ThemeContextProvider>
    </React.StrictMode>
);