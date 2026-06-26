import React, { useState } from 'react';
import Dashboard from '../pages/Dashboard';
import Settings from '../pages/Settings';
import { Home, Settings as SettingsIcon, FileText, Zap } from 'lucide-react';

type PageType = 'dashboard' | 'settings' | 'documentation';

export default function MainWindow() {
  const [currentPage, setCurrentPage] = useState<PageType>('dashboard');

  return (
    <div className="h-screen w-screen flex flex-col bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-card p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-6 h-6 text-accent" />
            <h1 className="text-2xl font-bold">Automated Apps</h1>
          </div>
          <p className="text-sm text-muted-foreground">Universal Project Builder</p>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 border-r border-border bg-card overflow-y-auto">
          <nav className="p-4 space-y-2">
            <button
              onClick={() => setCurrentPage('dashboard')}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                currentPage === 'dashboard'
                  ? 'bg-accent text-accent-foreground'
                  : 'hover:bg-muted'
              }`}
            >
              <Home className="w-5 h-5" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => setCurrentPage('documentation')}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                currentPage === 'documentation'
                  ? 'bg-accent text-accent-foreground'
                  : 'hover:bg-muted'
              }`}
            >
              <FileText className="w-5 h-5" />
              <span>Documentation</span>
            </button>

            <button
              onClick={() => setCurrentPage('settings')}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                currentPage === 'settings'
                  ? 'bg-accent text-accent-foreground'
                  : 'hover:bg-muted'
              }`}
            >
              <SettingsIcon className="w-5 h-5" />
              <span>Settings</span>
            </button>
          </nav>
        </aside>

        {/* Content Area */}
        <main className="flex-1 overflow-auto">
          {currentPage === 'dashboard' && <Dashboard />}
          {currentPage === 'settings' && <Settings />}
        </main>
      </div>
    </div>
  );
}
