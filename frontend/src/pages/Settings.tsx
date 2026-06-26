import React, { useState } from 'react';
import { Settings as SettingsIcon } from 'lucide-react';
import ThemeCustomizer from '../components/ThemeCustomizer';

export default function Settings() {
  const [settings, setSettings] = useState({
    autoInstall: true,
    parallelBuild: false,
    verboseLogging: true,
    clockFormat: 'digital' as 'digital' | 'analog',
    buildTimeout: 3600
  });

  const handleSettingChange = (key: keyof typeof settings, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <SettingsIcon className="w-6 h-6" />
        <h1 className="text-3xl font-bold">Settings</h1>
      </div>

      <ThemeCustomizer />

      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Build Settings</h2>

        <div className="space-y-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={settings.autoInstall}
              onChange={(e) => handleSettingChange('autoInstall', e.target.checked)}
              className="w-4 h-4 rounded"
            />
            <span className="font-medium">Auto-install dependencies</span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={settings.parallelBuild}
              onChange={(e) => handleSettingChange('parallelBuild', e.target.checked)}
              className="w-4 h-4 rounded"
            />
            <span className="font-medium">Parallel build</span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={settings.verboseLogging}
              onChange={(e) => handleSettingChange('verboseLogging', e.target.checked)}
              className="w-4 h-4 rounded"
            />
            <span className="font-medium">Verbose logging</span>
          </label>

          <div>
            <label className="block text-sm font-medium mb-2">Clock Format</label>
            <select
              value={settings.clockFormat}
              onChange={(e) => handleSettingChange('clockFormat', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background"
            >
              <option value="digital">Digital</option>
              <option value="analog">Analog</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Build Timeout (seconds)
            </label>
            <input
              type="number"
              value={settings.buildTimeout}
              onChange={(e) => handleSettingChange('buildTimeout', parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
