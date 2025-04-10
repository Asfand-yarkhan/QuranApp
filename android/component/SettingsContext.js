// android/component/SettingsContext.js
import React, { createContext, useState } from 'react';

export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [translationLang, setTranslationLang] = useState('urdu');
  const [showTafseer, setShowTafseer] = useState(true);

  return (
    <SettingsContext.Provider value={{ translationLang, setTranslationLang, showTafseer, setShowTafseer }}>
      {children}
    </SettingsContext.Provider>
  );
};
