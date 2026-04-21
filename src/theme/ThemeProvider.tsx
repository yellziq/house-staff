import React, { FC, PropsWithChildren, createContext, useContext } from 'react';

type ThemeMode = 'light';

interface ThemeContextValue {
  theme: ThemeMode;
}

const ThemeContext = createContext<ThemeContextValue>({ theme: 'light' });

export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ThemeContext.Provider value={{ theme: 'light' }}>
      <div data-theme="light">{children}</div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
