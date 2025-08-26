

import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext({
    themeMode: "light",
    lightTheme: () => {},
    darkTheme: () => {},
});

export const ThemeProvider = ({ children }) => {
    const [themeMode, setThemeMode] = useState(() => {
        return localStorage.getItem("theme") || "light";
    });

    const lightTheme = () => {
        setThemeMode("light");
    };

    const darkTheme = () => {
        setThemeMode("dark");
    };

    useEffect(() => {
        const htmlElement = document.querySelector('html');
        htmlElement.classList.remove("light", "dark");
        htmlElement.classList.add(themeMode);
        
        localStorage.setItem("theme", themeMode);
    }, [themeMode]);

    return (
        <ThemeContext.Provider value={{ themeMode, lightTheme, darkTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export default function useTheme() {
    return useContext(ThemeContext);
}