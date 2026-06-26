import React, { createContext, useState, ReactNode } from 'react';
import { Project } from '../../backend/src/types/Project';

interface ProjectContextType {
  project: Project | null;
  setProject: (project: Project) => void;
  clearProject: () => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [project, setProject] = useState<Project | null>(null);

  const clearProject = () => setProject(null);

  return (
    <ProjectContext.Provider value={{ project, setProject, clearProject }}>
      {children}
    </ProjectContext.Provider>
  );
}

export function useProjectContext() {
  const context = React.useContext(ProjectContext);
  if (!context) {
    throw new Error('useProjectContext must be used within ProjectProvider');
  }
  return context;
}
