import React, { createContext, useState, ReactNode } from 'react';

interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  colors: Record<string, string>;
  setColor: (key: string, value: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [colors, setColors] = useState({
    background: '#0a0a0a',
    foreground: '#ffffff',
    accent: '#3b82f6',
    muted: '#1f1f1f'
  });

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const setColor = (key: string, value: string) => {
    setColors((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors, setColor }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within ThemeProvider');
  }
  return context;
}
