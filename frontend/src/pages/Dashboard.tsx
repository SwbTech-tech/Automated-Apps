import React from 'react';
import ProjectLoader from '../components/ProjectLoader';
import ProgressTracker from '../components/ProgressTracker';
import LogViewer from '../components/LogViewer';

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProjectLoader />
        <ProgressTracker />
      </div>

      <LogViewer />
    </div>
  );
}
