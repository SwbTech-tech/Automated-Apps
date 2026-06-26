import React, { useState } from 'react';
import { AlertCircle, ChevronDown, Lightbulb } from 'lucide-react';

interface ErrorLog {
  id: string;
  timestamp: Date;
  level: 'error' | 'warning' | 'info';
  message: string;
  solution?: string;
}

const mockErrors: ErrorLog[] = [
  {
    id: '1',
    timestamp: new Date(),
    level: 'error',
    message: 'Module not found: express',
    solution: 'Run "npm install express" to install the missing dependency'
  },
  {
    id: '2',
    timestamp: new Date(Date.now() - 5000),
    level: 'warning',
    message: 'Missing configuration file',
    solution: 'Create a package.json file in the project root'
  }
];

export default function LogViewer() {
  const [expandedError, setExpandedError] = useState<string | null>(null);

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Build Logs</h2>

      <div className="space-y-2 max-h-96 overflow-y-auto">
        {mockErrors.map((error) => (
          <div
            key={error.id}
            className="border border-border rounded-lg overflow-hidden"
          >
            <button
              onClick={() => setExpandedError(expandedError === error.id ? null : error.id)}
              className="w-full flex items-center gap-3 p-3 hover:bg-muted transition-colors text-left"
            >
              <AlertCircle
                className={`w-5 h-5 flex-shrink-0 ${
                  error.level === 'error'
                    ? 'text-red-500'
                    : error.level === 'warning'
                    ? 'text-yellow-500'
                    : 'text-blue-500'
                }`}
              />
              <div className="flex-1">
                <p className="font-medium text-sm">{error.message}</p>
                <p className="text-xs text-muted-foreground">
                  {error.timestamp.toLocaleTimeString()}
                </p>
              </div>
              <ChevronDown
                className={`w-5 h-5 transition-transform ${
                  expandedError === error.id ? 'rotate-180' : ''
                }`}
              />
            </button>

            {expandedError === error.id && error.solution && (
              <div className="p-3 bg-muted border-t border-border flex gap-3">
                <Lightbulb className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                <div>
                  <p className="text-xs font-semibold mb-1">Solution</p>
                  <p className="text-sm">{error.solution}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
