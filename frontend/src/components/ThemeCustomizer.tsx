import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

export default function ThemeCustomizer() {
  const { theme, toggleTheme, colors, setColor } = useTheme();

  const colorOptions = [
    { label: 'Background', key: 'background' },
    { label: 'Foreground', key: 'foreground' },
    { label: 'Accent', key: 'accent' },
    { label: 'Muted', key: 'muted' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Theme Settings</h2>

      {/* Theme Toggle */}
      <div className="mb-6 flex items-center justify-between p-3 bg-muted rounded-lg">
        <div className="flex items-center gap-2">
          {theme === 'dark' ? (
            <Moon className="w-5 h-5" />
          ) : (
            <Sun className="w-5 h-5" />
          )}
          <span className="font-medium capitalize">{theme} Mode</span>
        </div>
        <button
          onClick={toggleTheme}
          className="px-3 py-1 bg-accent text-accent-foreground rounded text-sm hover:bg-accent/90"
        >
          Toggle
        </button>
      </div>

      {/* Color Customization */}
      <div className="space-y-4">
        <h3 className="font-medium">Customize Colors</h3>
        {colorOptions.map(({ label, key }) => (
          <div key={key} className="flex items-center gap-3">
            <label className="text-sm font-medium w-24">{label}</label>
            <input
              type="color"
              value={colors[key as keyof typeof colors] || '#000000'}
              onChange={(e) => setColor(key as any, e.target.value)}
              className="w-12 h-10 rounded cursor-pointer"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
