import { createContext, useContext, useState } from "react";

const ThemeContext = createContext(null);

function ThemeContextProvider({ children }) {
    const [theme, setTheme] = useState("light");
    const [isDark, setIsDark] = useState(false);

    function toggleTheme() {
        const newValue = !isDark;
        setIsDark(newValue);
        setTheme(newValue ? "dark" : "light");
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, isDark }}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeContextProvider;

export const useThemeContext = () => useContext(ThemeContext);

