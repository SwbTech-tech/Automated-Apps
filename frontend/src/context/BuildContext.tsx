import React, { createContext, useState, ReactNode } from 'react';
import { BuildProgress } from '../../backend/src/types/Build';

interface BuildContextType {
  builds: Map<string, BuildProgress>;
  currentBuildId: string | null;
  startBuild: (buildId: string, progress: BuildProgress) => void;
  updateBuild: (buildId: string, progress: BuildProgress) => void;
  cancelBuild: (buildId: string) => void;
}

const BuildContext = createContext<BuildContextType | undefined>(undefined);

export function BuildProvider({ children }: { children: ReactNode }) {
  const [builds, setBuilds] = useState<Map<string, BuildProgress>>(new Map());
  const [currentBuildId, setCurrentBuildId] = useState<string | null>(null);

  const startBuild = (buildId: string, progress: BuildProgress) => {
    setBuilds((prev) => new Map(prev).set(buildId, progress));
    setCurrentBuildId(buildId);
  };

  const updateBuild = (buildId: string, progress: BuildProgress) => {
    setBuilds((prev) => new Map(prev).set(buildId, progress));
  };

  const cancelBuild = (buildId: string) => {
    setBuilds((prev) => {
      const updated = new Map(prev);
      updated.delete(buildId);
      return updated;
    });
  };

  return (
    <BuildContext.Provider value={{ builds, currentBuildId, startBuild, updateBuild, cancelBuild }}>
      {children}
    </BuildContext.Provider>
  );
}

export function useBuildContext() {
  const context = React.useContext(BuildContext);
  if (!context) {
    throw new Error('useBuildContext must be used within BuildProvider');
  }
  return context;
}
