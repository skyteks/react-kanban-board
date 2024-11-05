import { createContext, useContext, useState } from "react";

const ThemeContext = createContext(null);

function ThemeContextProvider({ children }) {
    const [theme, setTheme] = useState(false);
    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeContextProvider;

export const useThemeContext = () => useContext(ThemeContext);

