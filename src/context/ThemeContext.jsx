import { createContext, useState, useEffect, useContext } from "react";

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const stored = localStorage.getItem("darkMode");
        return stored ? JSON.parse(stored) : false;
    });

    const toggleDarkMode = () => setIsDarkMode(prev => !prev);

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
        localStorage.setItem("darkMode", JSON.stringify(isDarkMode));
    }, [isDarkMode]);

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
            {children}
        </ThemeContext.Provider>
    );
}

// Hook personalizado para consumir el contexto
export function useTheme() {
    return useContext(ThemeContext);
}
