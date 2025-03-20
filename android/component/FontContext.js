import React, { createContext, useState } from 'react';


// Create a Context
export const FontContext = createContext();

// Create a Provider Component
export const FontProvider = ({ children }) => {
    const [fontSize, setFontSize] = useState(16); // Default font size

    return (
        <FontContext.Provider value={{ fontSize, setFontSize }}>
            {children}
        </FontContext.Provider>
    );
};