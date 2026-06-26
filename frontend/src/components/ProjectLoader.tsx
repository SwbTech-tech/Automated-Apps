import React, { useState } from 'react';
import { Upload, Loader2, AlertCircle } from 'lucide-react';
import { useProjectContext } from '../hooks/useProjectAnalysis';

export default function ProjectLoader() {
  const [projectPath, setProjectPath] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setProject } = useProjectContext();

  const handleLoadProject = async () => {
    if (!projectPath.trim()) {
      setError('Please enter a project path');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/analysis/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectPath })
      });

      if (!response.ok) throw new Error('Failed to analyze project');

      const data = await response.json();
      setProject(data.data.project);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Upload className="w-5 h-5" />
        Load Project
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Project Path
          </label>
          <input
            type="text"
            value={projectPath}
            onChange={(e) => setProjectPath(e.target.value)}
            placeholder="Enter project directory path..."
            className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-accent"
            disabled={loading}
          />
        </div>

        {error && (
          <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-700">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <button
          onClick={handleLoadProject}
          disabled={loading}
          className="w-full px-4 py-2 bg-accent text-accent-foreground rounded-lg font-medium hover:bg-accent/90 disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>Load Project</>
          )}
        </button>
      </div>
    </div>
  );
}
